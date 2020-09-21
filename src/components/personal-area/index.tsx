import { h } from 'preact';
import { memo } from 'preact/compat';

import Button from 'ui/button';
import IconSuccess from 'ui/icons/success';
import Urls from 'components/router/urls-enum';
import Copyright from 'ui/copyright';

import classes from './style.pcss';

const PersonalArea = ({ children, tr, canShowSuccessInfo = false }) => {
    const { info, title, successInfo } = tr || {};
    const infoMessage = !canShowSuccessInfo ? info : successInfo;

    return (
        <div className={classes.personalArea}>
            <div className={classes.personalArea__left}>
                <div className={classes.personalArea__logo} />
                <div>
                    <h2>{title}</h2>
                    <p className={classes.personalArea__info}>
                        {canShowSuccessInfo && <IconSuccess width={33} height={30} />            }
                        {infoMessage}
                    </p>
                    {!canShowSuccessInfo && <div className={classes.personalArea__content}>{children}</div>}
                    {canShowSuccessInfo && (
                        <Button arrowDirection="left" variant="link" href={Urls.LOGIN} className={classes.personalArea__backBtn}>
                            {tr.backBtn}
                        </Button>
                    )}
                </div>
                <Copyright />
            </div>
            <div className={classes.personalArea__right} />
        </div>
    );
};

export default memo(PersonalArea);
