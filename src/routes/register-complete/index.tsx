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

const RegisterComplete = ({ tr }: {[index: string]: any;}) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const email = useSelector((state: AppTypes.Store) => state.router.current?.user);
    const config = [{
        inputProps: { name: 'name', required: true },
        labelName : tr.nameInputLabel,
        errorText : tr.errorTextCommon,
        pattern   : regexps.name
    }, {
        inputProps: { name: 'password', type: 'password', required: true },
        labelName : tr.passwordInputLabel,
        errorText : tr.errorPassword,
        pattern   : regexps.password
    }, {
        inputProps: { name: 'passwordConfirm', type: 'password', required: true },
        labelName : tr.confirmPasswordInputLabel,
        errorText : tr.errorPassword,
        pattern   : regexps.password
    }];

    const onSubmit = useCallback((data) => {
        dispatch.user.registerComplete({
            email   : email as string,
            password: data.password,
            name    : data.name
        });
    }, [dispatch, email]);

    return (
        <PersonalArea tr={tr}>
            <Form onSubmitAction={onSubmit} inputConfigs={config}>
                <Fragment>
                    <Link className={classes.login__button} href={Urls.FORGOT_PASS}>{tr.passwordInfo}</Link>
                    <div className={loginClasses.login__buttonsWrapper}>
                        <Button className={loginClasses.login__btnLogin} type="submit">{tr.registerBtn}</Button>
                        <span>{tr.or}</span>
                        <Button className={loginClasses.login__btnRegister} variant="link" href={Urls.LOGIN}>{tr.loginBtn}</Button>
                    </div>
                </Fragment>
            </Form>
        </PersonalArea>
    );
};

const RegisterCompleteWithLclz = withLclz(RegisterComplete);

export default memo(RegisterCompleteWithLclz);
