import Urls from 'components/router/urls-enum';

export default {
    [Urls.COMMON]: {
        exportBtn            : 'Export to PDF',
        errorTextCommon      : 'Check entered data',
        menuItem1            : 'New calculations',
        menuItem2            : 'My calculations',
        menuItem3            : 'Get more calculations',
        menuItem4            : 'Help',
        menuSubItem1         : 'Green Field',
        menuSubItem2         : 'Green Field +',
        menuSubItem3         : 'Brown Field',
        menuSubItem4         : 'Non-classified Field',
        calculationsLeft     : 'calculations left',
        logoutBtn            : 'Logout',
        cancelBtn            : 'Cancel',
        cancelInfo           : 'Do you really want to log out?',
        closeBtn             : 'Close',
        sendMessageBtn       : 'Send message',
        nextStepBtn          : 'Next step',
        prevStepBtn          : 'Previous step',
        calculateBtn         : 'Calculate',
        calculationBtn       : 'Calculations',
        popLogoutHeader      : 'Get more calculations',
        popLogoutInfo        : 'Leave your contact information so that our staff will contact you to discuss purchasing the full version',
        popLogoutSuccessInfo : 'Your message has been sent',
        popLogoutLabel       : 'Your message: ',
        popLogoutCloseMessage: 'This window will close automatically after some seconds...  ',
        calcResultInfo       : 'Result',
        getConfigError       : 'Error: config not found!',
        popCancelCalcText    : 'Do you want to abort the calculation? The entered data will not be saved :(',
        popCancelYesBtn      : 'Yes',
        popCancelHeader      : 'Cancel calculate',
        rangeTitle           : 'Confidence, %',
        popCalculateBtn      : 'Calculate',
        popCalculateHeader   : 'Enter calculate name',
        popCalculateLabel    : 'Calculate name:',
        popCalculateInfo     : 'The name can consist of Latin letters, numbers, and symbols, such as, _, -, (,), $ and some others.',
        reserviorMarkerInfo1 : 'Real reservoirs',
        reserviorMarkerInfo2 : 'Artifically generated reservoirs',
        reserviorMarkerInfo3 : 'Your reservoir',
        errorPassword        : 'Incorrent password value'
    },
    [Urls.FORGOT_PASS]: {
        title          : 'Password recovery',
        info           : 'Enter your email address and we will send you a link to restore your password',
        emailInputLabel: 'Your email:',
        loginBtn       : 'Sign in',
        recoveryrBtn   : 'Recovery password',
        or             : 'or',
        backBtn        : 'Back to Log In page',
        successInfo    : 'Please check your email. A link to recovery password is sent to the email address you entered'
    },
    [Urls.RECOVERY_PASS]: {
        title                    : 'Password recovery',
        info                     : 'Fill in the fields below to restore your password',
        changeBtn                : 'Change password',
        passwordInputLabel       : 'Your password:',
        confirmPasswordInputLabel: 'Confirm password:'
    },
    [Urls.REGISTER]: {
        title          : 'Register',
        info           : 'Enter your email address to register in the system. You will receive a link to register in the email',
        emailInputLabel: 'Your email:',
        loginBtn       : 'Sign in',
        registerBtn    : 'Sign up',
        or             : 'or',
        backBtn        : 'Back to Sign In page',
        successInfo    : 'Please check your email.'
    },
    [Urls.LOGIN]: {
        title             : 'Sign In',
        info              : 'Enter your email address and password to sign in',
        emailInputLabel   : 'Your email:',
        passwordInputLabel: 'Your password:',
        passwordInfo      : 'Forgot password?',
        loginBtn          : 'Sign in',
        registerBtn       : 'Sign up',
        or                : 'or'
    },
    [Urls.REGISTER_COMPLETE]: {
        title                    : 'Register',
        info                     : 'Fill in the fields below to complete registration',
        nameInputLabel           : 'Your name:',
        passwordInputLabel       : 'Your password:',
        confirmPasswordInputLabel: 'Confirm password:',
        registerBtn              : 'Registration'
    },
    [Urls.HOME]: {
        title1      : 'Green Field',
        title2      : 'Green Field +',
        title3      : 'Brown Field',
        title4      : 'Non-classified Field',
        description1: 'Oil recovery factor predictor for reservoirs without any development and production data',
        description2: 'Oil recovery factor predictor for reservoirs with development and production data',
        description3: 'Oil recovery factor predictor for reservoirs with development and production data with plateau characteristics',
        description4: 'Oil recovery factor predictor by arbitrary data about reservoir',
        btnName1    : 'Calculations',
        btnName2    : 'Calculations',
        btnName3    : 'Calculations',
        btnName4    : 'Calculations'
    },
    [Urls.MY_CALCULATIONS]: {
        header      : 'My calculations',
        info        : 'Here you can see all that you have made the calculations ',
        updateBtn   : 'use for a new calculation ',
        loadMoreBtn : 'Load more',
        loadMoreFrom: 'Showing',
        loadMoreOf  : 'of',
        headerDate  : 'Date',
        headerName  : 'Calculations name',
        headerType  : 'Calculation type',
        notFound    : 'Not found'
    }
};