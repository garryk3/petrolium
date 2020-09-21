import { h } from 'preact';
import {
    memo, useEffect, Fragment, useCallback
} from 'preact/compat';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'ui/circle-loader/calc-loader';
import Layout from 'ui/layout';
import Form from 'components/form';
import { InputConfig } from 'components/form/types';
import Urls from 'components/router/urls-enum';

import Result from './result';
import Steps from './steps';
import Buttons from './buttons';
import classes from './style.pcss';

const Calculator = () => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const {
        routeId, config, activeStep, isConfigLoaded, data, lang, groups, tr, result, isResultLoaded
    } = useSelector((state: AppTypes.Store) => ({
        ...state.calculator,
        lang          : state.localization.lang,
        tr            : state.localization.translations[state.localization.lang]?.[Urls.COMMON] ?? {},
        routeId       : state.router.current?.name,
        isResultLoaded: state.loading.effects.calculator.calculate
    }));
    const { getConfigError } = tr;
    const { id, name, description } = groups?.find((group) => group.id === routeId) ?? {};
    const stepsCount = Object.keys(config ?? {}).length;
    const hasConfig = isConfigLoaded && stepsCount && config?.[activeStep - 1]?.data;
    const resultStep = stepsCount + 1;
    const isResult = activeStep === resultStep;

    const onSubmit = useCallback((inputData) => {
        dispatch.calculator.saveStepData(inputData);
        if(activeStep !== stepsCount) {
            dispatch.calculator.setActiveStep(activeStep + 1);
        }
    }, [activeStep, dispatch, stepsCount]);

    useEffect(() => () => {
        dispatch.calculator.clear();
    }, [dispatch]);

    useEffect(() => {
        dispatch.calculator.loadConfig(id);
    }, [dispatch, id, lang]);

    return (
        <Layout>
            <div className={classes.calc}>
                <Loader show={!config || isResultLoaded} />
                <h2>{name}</h2>
                <p>{description}</p>
                <div className={classes.calc__content}>
                    <Fragment>
                        <Steps tr={tr} />
                        {hasConfig && !isResult && (
                            <Form
                                key={activeStep}
                                showEmptyOnSubmit
                                defaultValues={data?.[activeStep - 1]}
                                className={classes.calc__form}
                                onSubmitAction={onSubmit}
                                inputConfigs={config?.[activeStep - 1].data as InputConfig[]}
                            >
                                <Buttons tr={tr} />
                            </Form>
                        )}
                        {isResult && result && <Result tr={tr} />}
                    </Fragment>
                    {!hasConfig && !isResult && <div>{getConfigError}</div>}
                </div>
            </div>
        </Layout>
    );
};

export default memo(Calculator);
