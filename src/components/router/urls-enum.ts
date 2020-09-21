export enum Urls {
    HOME = '/',
    LOGIN = '/login',
    LOGOUT = '/logout',
    REGISTER = '/register',
    REGISTER_COMPLETE = '/register/complete',
    FORGOT_PASS = '/forgotpass',
    RECOVERY_PASS = '/forgotpass/recovery',
    CONTENT = '/content/',
    GREEN_FIELD = '/green-field',
    GREEN_FIELD_PLUS = '/green-field+',
    BROWN_FIELD = '/brown-field',
    NON_FIELD = '/non-classified-field',
    MY_CALCULATIONS = '/my-calculations',
    CALCULATE = '/calculate/',

    NOT_FOUND = '/:path',
    COMMON = '/common' // несуществующий роут, ключ для загрузки общих трансляций
}

export default Urls;
