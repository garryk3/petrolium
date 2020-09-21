import { h } from 'preact';
import { memo, Fragment, useCallback } from 'preact/compat';
import { Link } from 'preact-router/match';
import { useDispatch } from 'react-redux';

import PersonalArea from 'components/personal-area';
import Form from 'components/form';
import Button from 'ui/button';
import withLclz from 'utils/localization/with-lclz';
import Urls from 'components/router/urls-enum';
import regexps from 'components/form/regexps';

import classes from './style.pcss';

const Login = ({ tr }: {[index: string]: any;}) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const config = [{
        inputProps: { name: 'email', required: true },
        labelName : tr.emailInputLabel,
        errorText : tr.errorTextCommon,
        pattern   : regexps.email,
        className : classes.login
    }, {
        inputProps: { name: 'password', type: 'password', required: true },
        labelName : tr.passwordInputLabel,
        errorText : tr.errorTextCommon,
        // pattern   : regexps.password,
        className : classes.login
    }];

    const onSubmit = useCallback((data: { email: string; password: string; }) => {
        dispatch.user.login({
            login   : data.email,
            password: data.password
        });
    }, [dispatch]);

    return (
        <PersonalArea tr={tr}>
            <Form onSubmitAction={onSubmit} inputConfigs={config}>
                <Fragment>
                    <Link className={classes.login__button} href={Urls.FORGOT_PASS}>{tr.passwordInfo}</Link>
                    <div className={classes.login__buttonsWrapper}>
                        <Button className={classes.login__btnLogin} type="submit">{tr.loginBtn}</Button>
                        <span>{tr.or}</span>
                        <Button className={classes.login__btnRegister} variant="link" href={Urls.REGISTER}>{tr.registerBtn}</Button>
                    </div>
                </Fragment>
            </Form>
        </PersonalArea>
    );
};

const LoginWithLclz = withLclz(Login);

export default memo(LoginWithLclz);
