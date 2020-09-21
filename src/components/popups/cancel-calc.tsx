import { h } from 'preact';
import { memo, Fragment } from 'preact/compat';

import Button from 'ui/button';

import Popup from 'ui/popup';
import { PopupProps } from './types';
import classes from './style.pcss';

const CancelCalcPopup = ({
    isVisible, onClose, tr, onSubmit
}: PopupProps) => {
    if(!isVisible) {
        return null;
    }
    const {
        popCancelHeader, popCancelYesBtn, popCancelCalcText, cancelBtn
    } = tr;

    return (
        <Popup onClose={onClose} className={classes.popup_cancelCalc}>
            <Fragment>
                <h3>{popCancelHeader}</h3>
                <p>{popCancelCalcText}</p>
                <div className={classes.popup__btnWrapper}>
                    <Button variant="secondary" onClick={onClose}>{cancelBtn}</Button>
                    <Button onClick={onSubmit}>{popCancelYesBtn}</Button>
                </div>
            </Fragment>
        </Popup>
    );
};

export default memo(CancelCalcPopup);
