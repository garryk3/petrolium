export interface User {
    auth: boolean;
    name: string | null;
    email: string | null;
    error: AppTypes.RequestError | null;
    registerSuccess: boolean;
    passwdRecoverySuccess: boolean;
    calcLeft: number | null;
}

export interface UserLoginData {
    login: string;
    password: string
}
