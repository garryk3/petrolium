import { h } from 'preact';
import { memo, useMemo } from 'preact/compat';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import IconCheck from 'ui/icons/check';
import IconFinish from 'ui/icons/finishing';
import IconFinishColor from 'ui/icons/finishing-color';

import classes from './style.pcss';

const Steps = ({ tr }) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const {
        config, data, activeStep, result
    } = useSelector((state: AppTypes.Store) => state.calculator);
    const stepsNames = useMemo(() => Array.isArray(config) && config?.map((step) => step.name), [config]);
    const stepsCount = Array.isArray(stepsNames) ? stepsNames.length : 0;
    const { calcResultInfo } = tr ?? {};

    const onClickStep = (event: AppTypes.Event) => {
        const step = Number(event.currentTarget.dataset.step);

        dispatch.calculator.setActiveStep(step);
    };

    if(!stepsNames) {
        return null;
    }
    const stepsNamesWithResult = [...stepsNames, calcResultInfo];

    return (
        <div className={classes.steps}>
            {stepsNamesWithResult.map((name, index) => {
                const stepNum = index + 1;
                const resultStep = stepsCount + 1;
                const isResult = stepNum === resultStep;
                const hasEmptyValue = !data[stepNum - 1] ? true : Object.values(data?.[stepNum - 1] ?? {}).find((item) => !item);
                const isDone = stepNum === resultStep ? Boolean(result) : hasEmptyValue === undefined;
                const isCurrentStep = stepNum === activeStep;
                const isStepWasPassed = activeStep >= stepNum || data[stepNum];
                const props = {
                    className  : clsx(classes.steps__item, (stepNum < activeStep) && classes.steps__item_mobHidden),
                    'data-step': stepNum,
                    ...(isStepWasPassed || Boolean(result)) && { onClick: onClickStep }
                };
                const content = isDone ? <IconCheck width={22} height={19} /> : stepNum;
                const stepClasses = clsx(
                    classes.steps__num,
                    isDone && classes.steps__num_done,
                    !isDone && isCurrentStep && classes.steps__num_current,
                    isStepWasPassed && classes.steps__num_passed,
                    isResult && classes.steps__num_result
                );
                const FinishResultIcon = (activeStep === resultStep && !isDone) ? IconFinishColor : IconFinish;

                return (
                    <span {...props} key={index.toString()}>
                        <span className={stepClasses}>
                            <span className={classes.steps__numInner}>{isResult ? <FinishResultIcon width={13} height={14} /> : content}</span>
                        </span>
                        {' '}
                        {name}
                        {!isResult && <span className={classes.steps__line} />}
                    </span>
                );
            })}
        </div>
    );
};

export default memo(Steps);
