import { h } from 'preact';
import {
    memo, Fragment, useState, useRef, useEffect
} from 'preact/compat';

import { getService } from 'utils/service-locator';
import Button from 'ui/button';
import Popup from 'ui/popup';
import Form from 'components/form';
import IconSuccess from 'ui/icons/success';

import clsx from 'clsx';
import { PopupProps } from './types';
import classes from './style.pcss';

const CLOSE_TIME = 3;

const GetCalcPopup = ({
    isVisible, onClose, tr
}: PopupProps) => {
    const [isSuccess, setSuccess] = useState(false);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);
    const closeTime = useRef(CLOSE_TIME);
    const [time, setTime] = useState(closeTime.current);

    useEffect(() => () => {
        if(interval.current) {
            clearInterval(interval.current);
        }
    }, []);

    if(!isVisible) {
        return null;
    }
    const {
        cancelBtn, sendMessageBtn, closeBtn, popLogoutHeader,
        popLogoutInfo, popLogoutSuccessInfo, popLogoutLabel, popLogoutCloseMessage
    } = tr;
    const config = [{
        inputProps: { name: 'message' },
        labelName : popLogoutLabel,
        variant   : 'textarea'
    }];

    const onClickSubmit = async (data) => {
        const { error } = await getService('transport').fetchMoreCalc({
            message: data.message
        });

        if(error) {
            getService('errorHandler')!.process(error);
            return;
        }
        interval.current = setInterval(() => {
            closeTime.current -= 1;
            if((closeTime.current === 0) && interval.current) {
                clearInterval(interval.current);
                onClose();
                setSuccess(false);
                closeTime.current = CLOSE_TIME;
            }

            setTime(closeTime.current);
        }, 1000);
        setSuccess(true);
    };

    return (
        <Popup onClose={onClose} className={classes.popup_getCalc}>
            <Fragment>
                <h3>{popLogoutHeader}</h3>
                {!isSuccess ? (
                    <Fragment>
                        <p>{popLogoutInfo}</p>
                        <Form inputConfigs={config} onSubmitAction={onClickSubmit}>
                            <div className={clsx(classes.popup__btnWrapper, classes.popup__btnWrapper_calc)}>
                                <Button type="reset" variant="secondary" onClick={onClose}>{cancelBtn}</Button>
                                <Button type="submit">{sendMessageBtn}</Button>
                            </div>
                        </Form>
                    </Fragment>
                ) : (
                    <div className={classes.popup__calcSuccess}>
                        <p>
                            <IconSuccess width={22} height={22} />
                            {popLogoutSuccessInfo}
                        </p>
                        <span className={classes.popup__closeText}>
                            {popLogoutCloseMessage}
                            {' '}
                            {time}
                        </span>
                        <Button onClick={onClose}>{closeBtn}</Button>
                    </div>
                )}
            </Fragment>
        </Popup>
    );
};

export default memo(GetCalcPopup);
