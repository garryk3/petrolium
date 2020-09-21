import { h } from 'preact';
import { memo, Fragment, useCallback } from 'preact/compat';
import { useDispatch, useSelector } from 'react-redux';

import PersonalArea from 'components/personal-area';
import Form from 'components/form';
import Button from 'ui/button';
import withLclz from 'utils/localization/with-lclz';
import regexps from 'components/form/regexps';
import loginClasses from 'routes/login/style.pcss';

const RecoveryPass = ({ tr }: {[index: string]: any;}) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const email = useSelector((state: AppTypes.Store) => state.router.current?.user);
    const config = [{
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
        dispatch.user.recoveryPass({
            email   : email as string,
            password: data.password
        });
    }, [dispatch, email]);

    return (
        <PersonalArea tr={tr}>
            <Form onSubmitAction={onSubmit} inputConfigs={config}>
                <Fragment>
                    <div className={loginClasses.login__buttonsWrapper}>
                        <Button className={loginClasses.login__btnLogin} type="submit">{tr.changeBtn}</Button>
                    </div>
                </Fragment>
            </Form>
        </PersonalArea>
    );
};

const RecoveryPassWithLclz = withLclz(RecoveryPass);

export default memo(RecoveryPassWithLclz);
