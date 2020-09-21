import { route } from 'preact-router';

import { MiddlewarsParams, Middleware } from './types';
import Urls from './urls-enum';

const BREAK_HANDLE_CODE = -1;

const excludedFromAuthUrls = [Urls.FORGOT_PASS, Urls.LOGIN, Urls.REGISTER, Urls.REGISTER_COMPLETE, Urls.RECOVERY_PASS] as string[];

const saveRouterDataToStore = ({ event, dispatch }: MiddlewarsParams) => {
    dispatch.router.transition({
        current : event.current?.props,
        previous: event.previous ?? null
    });
};

const checkAccessByAuthStatus = ({ event, user: { auth } }: MiddlewarsParams) => {
    const path = event.current?.props?.path;

    if(!excludedFromAuthUrls.includes(path) && !auth) {
        route(Urls.LOGIN);
        return BREAK_HANDLE_CODE;
    }
};

const middlewares = [
    saveRouterDataToStore,
    checkAccessByAuthStatus
] as Middleware[];

export default function handleMiddlewares(params: MiddlewarsParams) {
    // eslint-disable-next-line no-restricted-syntax
    for(const middleware of middlewares) {
        const exitCode = middleware(params);

        if(exitCode === BREAK_HANDLE_CODE) {
            break;
        }
    }
}
