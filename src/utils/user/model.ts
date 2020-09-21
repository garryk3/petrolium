import { route } from 'preact-router';

import { getService } from 'utils/service-locator';
import { Urls } from 'components/router/urls-enum';

import { deleteToken, saveToken } from './token-handler';
import { User, UserLoginData } from './types';

const initialState: User = {
    auth                 : false,
    name                 : null,
    email                : null,
    error                : null,
    registerSuccess      : false,
    passwdRecoverySuccess: false,
    calcLeft             : 0
};

export default {
    state   : initialState,
    reducers: {
        setUserInfo(state: User, payload: User) {
            return {
                ...state,
                ...payload
            };
        },
        setError(state: User, error: Error) {
            state.error = error;
        },
        logout() {
            return initialState;
        },
        setRegisterSuccess(state: User) {
            state.registerSuccess = true;
        },
        setPasswdRecoverySuccess(state: User) {
            state.passwdRecoverySuccess = true;
        }
    },
    effects: (dispatch: any) => ({
        async register(payload: { email: string; }) {
            const { error } = await getService('transport').fetchRegister({
                login: payload.email
            });

            if(error) {
                getService('errorHandler').process(error);
                return;
            }
            dispatch.user.setRegisterSuccess();
        },
        async registerComplete(payload: { email: string; name: string; password: string; }) {
            const { error } = await getService('transport').fetchRegisterComplete({
                login   : payload.email,
                password: payload.password,
                userName: payload.name
            });

            if(error) {
                getService('errorHandler').process(error);
                return;
            }

            route(Urls.LOGIN, true);
        },
        async forgotPass(payload: { email: string; }) {
            const { error } = await getService('transport').fetchForgotPass({
                login: payload.email
            });

            if(error) {
                getService('errorHandler').process(error);
                return;
            }

            dispatch.user.setPasswdRecoverySuccess();
        },
        async recoveryPass(payload: { email: string; password: string; }) {
            const { error } = await getService('transport').fetchRecoveryPass({
                login   : payload.email,
                password: payload.password
            });

            if(error) {
                getService('errorHandler').process(error);
                return;
            }

            route(Urls.LOGIN, true);
        },
        loginWithPassword(payload: UserLoginData) {
            return getService('transport').fetchLogin(payload);
        },
        // async loginWithToken(token: string) {
        //     getService('transport').setAuthHeader(token);
        //     const { result, error } = await getService('transport').fetch({
        //         method: 'GET',
        //         url   : 'v1/self-user'
        //     });

        //     return {
        //         result: result ? {
        //             user: result.user,
        //             token
        //         } : null,
        //         error
        //     };
        // },
        async login(payload: UserLoginData | string) {
            // const loginMethod = typeof payload === 'string' ? dispatch.user.loginWithToken : dispatch.user.loginWithPassword;
            const { error, result } = await dispatch.user.loginWithPassword(payload);

            if(result) {
                const { token, user } = result;

                if(!user) {
                    getService('errorHandler').process(new Error('User not found'));
                    return;
                }
                getService('transport').setAuthHeader(token);
                saveToken(token);
                dispatch.user.setUserInfo({
                    name    : user.userName, email   : user.email, auth    : true, calcLeft: user.calcAvailable
                });
            }
            if(error) {
                getService('errorHandler').process(error);
            }
        },
        logout() {
            getService('transport').fetchLogout();
            deleteToken();
            route(Urls.LOGIN);
        },
        async setUserInfo(payload: any, rootState: AppTypes.Store) {
            if(rootState.router.current?.path === Urls.LOGIN) { // возврат на предыдущий урл при логине
                // const prevRoute = rootState.router.previous ? rootState.router.previous : Urls.HOME;

                route(Urls.HOME, true);
            }
        }
    })
};
