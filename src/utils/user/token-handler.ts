const storageKey: string = 'token';

export const deleteToken = () => {
    sessionStorage.removeItem(storageKey);
};

export const saveToken = (token: string) => {
    sessionStorage.setItem(storageKey, token);
};

export const getToken = () => {
    return sessionStorage.getItem(storageKey);
};
