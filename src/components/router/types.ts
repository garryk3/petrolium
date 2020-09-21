import { RouterOnChangeArgs } from 'preact-router';

export type Matches = {
    [index: string]: string;
};

export interface Route {
    matches: Matches;
    path: string;
    url: string;
    [index: string]: string | Matches;
}

export interface RouterReducer {
    current: Route | null;
    previous: string | null;
}

export interface RouterOnChangeParams extends RouterOnChangeArgs {
    current: {
        props: {
            path: string;
        } & RouterOnChangeArgs['current']['props'];
    } & RouterOnChangeArgs['current'];
}
export interface TransitionPayload {
    current : RouterOnChangeParams['current']['props'];
    previous: RouterOnChangeParams['previous'] | null;
}

export interface MiddlewarsParams {
    event: RouterOnChangeParams;
    dispatch: AppTypes.Dispatch;
    user: any; // @TODO
}

export type Middleware = (params: MiddlewarsParams) => void | number;
