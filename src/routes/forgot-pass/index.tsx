import { h } from 'preact';
import { memo, Fragment, useCallback } from 'preact/compat';
import { Link } from 'preact-router/match';
import { useDispatch, useSelector } from 'react-redux';

import PersonalArea from 'components/personal-area';
import Form from 'components/form';
import Button from 'ui/button';
import withLclz from 'utils/localization/with-lclz';
import Urls from 'components/router/urls-enum';
import regexps from 'components/form/regexps';
import loginClasses from 'routes/login/style.pcss';

import classes from './style.pcss';

const ForgotPass = ({ tr }: {[index: string]: any;}) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const passwdRecoverySuccess = useSelector((state: AppTypes.Store) => state.user.passwdRecoverySuccess);

    const config = [{
        inputProps: { name: 'email', required: true },
        labelName : tr.emailInputLabel,
        errorText : tr.errorTextCommon,
        pattern   : regexps.email,
        className : classes.login
    }];

    const onSubmit = useCallback((data) => {
        dispatch.user.forgotPass(data);
    }, [dispatch]);

    return (
        <PersonalArea tr={tr} canShowSuccessInfo={passwdRecoverySuccess}>
            <Form onSubmitAction={onSubmit} inputConfigs={config}>
                <Fragment>
                    <Link className={classes.login__button} href={Urls.FORGOT_PASS}>{tr.passwordInfo}</Link>
                    <div className={loginClasses.login__buttonsWrapper}>
                        <Button className={loginClasses.login__btnLogin} type="submit">{tr.recoveryrBtn}</Button>
                        <span>{tr.or}</span>
                        <Button className={loginClasses.login__btnRegister} variant="link" href={Urls.LOGIN}>{tr.loginBtn}</Button>
                    </div>
                </Fragment>
            </Form>
        </PersonalArea>
    );
};

const ForgotPassWithLclz = withLclz(ForgotPass);

export default memo(ForgotPassWithLclz);
