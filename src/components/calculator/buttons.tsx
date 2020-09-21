import { h } from 'preact';
import { memo, useState } from 'preact/compat';
import { useSelector, useDispatch } from 'react-redux';
import { route } from 'preact-router';
import { useFormContext } from 'react-hook-form';

import Urls from 'components/router/urls-enum';
import CancelPopup from 'components/popups/cancel-calc';
import CalcNamePopup from 'components/popups/calc-name';
import Button from 'ui/button';

import classes from './style.pcss';

const Buttons = ({ tr }) => {
    const { getValues, formState } = useFormContext();
    const dispatch: AppTypes.Dispatch = useDispatch();
    const [isCancelPopupOpen, setCancelPopupOpen] = useState(false);
    const [isCalcPopupOpen, setCalcPopupOpen] = useState(false);
    const { config, activeStep } = useSelector((state: AppTypes.Store) => state.calculator);
    const {
        cancelBtn, nextStepBtn, prevStepBtn, calculateBtn
    } = tr ?? {};
    const stepsCount = Array.isArray(config) ? config?.length : 0;

    const onClickPrev = () => {
        const prevStep = activeStep - 1;

        if(prevStep < 0) {
            return;
        }
        dispatch.calculator.setActiveStep(prevStep);
    };

    const onClickOpenCalcPopup = () => {
        if(!formState.isValid) {
            return;
        }
        dispatch.calculator.saveStepData(getValues());
        setCalcPopupOpen(true);
    };

    const onCloseCalcNamePopup = () => {
        setCalcPopupOpen(false);
    };

    const onShowPopup = (event) => {
        event.preventDefault();
        setCancelPopupOpen(true);
    };

    const onCloseCancelPopup = () => {
        setCancelPopupOpen(false);
    };

    const onLeavePage = () => {
        route(Urls.HOME);
    };

    return (
        <div className={classes.buttons}>
            <CancelPopup onClose={onCloseCancelPopup} onSubmit={onLeavePage} tr={tr} isVisible={isCancelPopupOpen} />
            <CalcNamePopup onClose={onCloseCalcNamePopup} tr={tr} isVisible={isCalcPopupOpen} />
            <Button type="button" onClick={onShowPopup} variant="secondary">{cancelBtn}</Button>
            {activeStep !== 1 && <Button onClick={onClickPrev} variant="secondary" arrowDirection="left">{prevStepBtn}</Button>}
            {activeStep !== stepsCount
                ? <Button type="submit" arrowDirection="right">{nextStepBtn}</Button>
                : <Button type="submit" onClick={onClickOpenCalcPopup}>{calculateBtn}</Button>}
        </div>
    );
};

export default memo(Buttons);
