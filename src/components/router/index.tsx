import { h } from 'preact';
import {
    memo, useCallback, lazy, Suspense, useEffect
} from 'preact/compat';
import { Router as PreactRouter, RouterOnChangeArgs, Route } from 'preact-router';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'components/loader';

import handleMiddlewares from './middlewars';
import Urls from './urls-enum';
import { RouterOnChangeParams } from './types';


const Login = lazy(() => import('routes/login'));
const ForgotPass = lazy(() => import('routes/forgot-pass'));
const RecoveryPass = lazy(() => import('routes/recovery-pass'));
const Register = lazy(() => import('routes/register'));
const RegisterComplete = lazy(() => import('routes/register-complete'));
const Home = lazy(() => import('routes/home'));
const MyCalc = lazy(() => import('routes/my-calc'));
const Content = lazy(() => import('routes/content'));
const Error = lazy(() => import('routes/error'));
const Calculate = lazy(() => import('routes/calculate'));

const Router = () => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const user = useSelector((state: AppTypes.Store) => state.user);

    const onChangeRoute = useCallback((event: RouterOnChangeArgs) => {
        handleMiddlewares({ dispatch, event: event as RouterOnChangeParams, user });
    }, [dispatch, user]);

    useEffect(() => {
        dispatch.localization.loadInitialLocalizationData();
    }, [dispatch]);

    return (
        <Suspense fallback={<Loader />}>
            <PreactRouter onChange={onChangeRoute}>
                <Route path={Urls.REGISTER} component={Register} />
                <Route path={Urls.REGISTER_COMPLETE} component={RegisterComplete} />
                <Route path={Urls.LOGIN} component={Login} />
                <Route path={Urls.FORGOT_PASS} component={ForgotPass} />
                <Route path={Urls.RECOVERY_PASS} component={RecoveryPass} />
                <Route path={Urls.HOME} component={Home} />
                <Route path={Urls.MY_CALCULATIONS} component={MyCalc} />
                <Route path={`${Urls.CONTENT}:name`} component={Content} />
                <Route path={`${Urls.CALCULATE}:name`} component={Calculate} />
                <Route path={Urls.NOT_FOUND} component={Error} />
            </PreactRouter>
        </Suspense>
    );
};

export default memo(Router);
