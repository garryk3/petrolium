import { h } from 'preact';
import {
    memo, Fragment
} from 'preact/compat';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'ui/button';
import Popup from 'ui/popup';
import Form from 'components/form';
import regexps from 'components/form/regexps';

import clsx from 'clsx';
import { PopupProps } from './types';
import classes from './style.pcss';

const CalcNamePopup = ({
    isVisible, onClose, tr
}: PopupProps) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const { result, activeStep } = useSelector((state: AppTypes.Store) => state.calculator);

    if(!isVisible) {
        return null;
    }
    const {
        cancelBtn, popCalculateBtn, popCalculateHeader, popCalculateInfo, popCalculateLabel, commonError
    } = tr;
    const config = [{
        inputProps  : { name: 'calculate' },
        labelName   : popCalculateLabel,
        labelSubName: popCalculateInfo,
        errorText   : commonError,
        pattern     : regexps.calculateName
    }];

    const onClickSubmit = async (formData) => {
        dispatch.calculator.setCalculateName(formData.calculate);
        await dispatch.calculator.calculate();
        onClose();
    };

    return (
        <Popup onClose={onClose} className={classes.popup_calcName}>
            <Fragment>
                <h3>{popCalculateHeader}</h3>
                <Fragment>
                    <Form inputConfigs={config} onSubmitAction={onClickSubmit}>
                        <div className={clsx(classes.popup__btnWrapper, classes.popup__btnWrapper_calcName)}>
                            <Button type="reset" variant="secondary" onClick={onClose}>{cancelBtn}</Button>
                            <Button type="submit">{popCalculateBtn}</Button>
                        </div>
                    </Form>
                </Fragment>
            </Fragment>
        </Popup>
    );
};

export default memo(CalcNamePopup);
