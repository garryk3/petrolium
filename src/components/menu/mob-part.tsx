import { h } from 'preact';
import { memo } from 'preact/compat';
import { useDispatch, useSelector } from 'react-redux';

import Fade from 'ui/animations/fade';
import Button from 'ui/button';
import Urls from 'components/router/urls-enum';

import CommonButtons from './common-buttons';
import classes from './style.pcss';

const MobPart = ({ isVisible }) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const {
        userName, tr = {}, calcLeft
    } = useSelector((state: AppTypes.Store) => ({
        tr         : state.localization.translations[state.localization.lang]?.[Urls.COMMON],
        userName   : state.user.name,
        calcLeft   : state.user.calcLeft,
        langs      : state.localization.availableLangs,
        currentLang: state.localization.lang
    }));
    const { calculationsLeft, logoutBtn } = tr;

    return (
        <Fade isVisible={isVisible}>
            <div className={classes.mobMenu}>
                <CommonButtons className={classes.menu__mobVisisblePart} />
                <div className={classes.mobMenu__footer}>
                    <span>{userName ?? '---'}</span>
                    <span>
                        {calcLeft}
                        {' '}
                        {calculationsLeft}
                    </span>
                    <Button variant="secondary" onClick={dispatch.user.logout}>{logoutBtn}</Button>
                </div>
            </div>
        </Fade>
    );
};

export default memo(MobPart);
