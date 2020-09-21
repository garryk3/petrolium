import { h } from 'preact';
import { memo, Fragment } from 'preact/compat';
import { useDispatch } from 'react-redux';

import Button from 'ui/button';

import Popup from 'ui/popup';
import { PopupProps } from './types';
import classes from './style.pcss';

const LogoutPopup = ({
    isVisible, onClose, tr
}: PopupProps) => {
    const dispatch: AppTypes.Dispatch = useDispatch();

    if(!isVisible) {
        return null;
    }
    const { logoutBtn, cancelBtn, cancelInfo } = tr;

    const onClickSubmit = () => {
        dispatch.user.logout();
        onClose();
    };

    return (
        <Popup onClose={onClose} className={classes.popup_logout}>
            <Fragment>
                <p>{cancelInfo}</p>
                <div className={classes.popup__btnWrapper}>
                    <Button variant="secondary" onClick={onClose}>{cancelBtn}</Button>
                    <Button onClick={onClickSubmit}>{logoutBtn}</Button>
                </div>
            </Fragment>
        </Popup>
    );
};

export default memo(LogoutPopup);
