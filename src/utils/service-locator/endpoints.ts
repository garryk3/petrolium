enum Endpoints {
    ForgotPass = 'forgotpass',
    RecoveryPass = 'recoverypass',
    Login = 'login',
    Logout = 'logout',
    Register = 'register',
    RegisterComplete = 'register/confirm',
    Localization = 'localization/common',
    LocalizationLangs = 'localization/languages',
    LocalizationIcon = 'localization/ico/',
    MoreCalc ='v1/calc/get-more-calculation',
    MyCalcs = 'v1/calc/my-calculations',
    UserCalc = 'v1/calc/get-calculation',
    Content = 'content',
    CalcGroups = 'v1/calc/groups',
    CalcParams = 'v1/calc/params',
    Calculate = 'v1/calc/calculate'
}

export default Endpoints;
