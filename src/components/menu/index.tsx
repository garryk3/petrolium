import { h } from 'preact';
import {
    memo, useState, useCallback, useEffect
} from 'preact/compat';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'preact-router/match';
import clsx from 'clsx';

import ChevronBottom from 'ui/icons/chevron-bottom';
import Urls from 'components/router/urls-enum';
import Button from 'ui/button';
import LogoutPopup from 'components/popups/logout';
import IconClose from 'ui/icons/close';
import IconMenu from 'ui/icons/menu';
import Fade from 'ui/animations/fade';
import useClickListener from 'utils/helpers/use-click-listener';

import CommonButtons from './common-buttons';
import MobPart from './mob-part';
import classes from './style.pcss';

const Menu = () => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const [isMobMenuOpen, setMobMenuOpen] = useState(false);
    const {
        userName, tr = {}, langs, currentLang, calcLeft
    } = useSelector((state: AppTypes.Store) => ({
        tr         : state.localization.translations[state.localization.lang]?.[Urls.COMMON],
        userName   : state.user.name,
        calcLeft   : state.user.calcLeft,
        langs      : state.localization.availableLangs,
        currentLang: state.localization.lang
    }));
    const [activeLang, setActiveLang] = useState(currentLang);
    const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
    const [isLangBtnOpen, setIsLangBtnOpen] = useState(false);
    const [isUserBtnOpen, setIsUserBtnOpen] = useState(false);
    const { calculationsLeft, logoutBtn } = tr;

    const onChangeLang = (event: AppTypes.Event) => {
        const nextLang = event?.currentTarget.dataset.lang;

        if(nextLang === activeLang) {
            return;
        }
        setActiveLang(nextLang);
        dispatch.localization.setCurrentLang(nextLang);
    };

    const onCallLogoutPopup = () => {
        setIsLogoutPopupOpen(true);
    };

    const onCloseLogoutPopup = useCallback(() => {
        setIsLogoutPopupOpen(false);
    }, []);

    const onClickMobMenu = () => {
        setMobMenuOpen(!isMobMenuOpen);
    };

    const onClickLangs = () => {
        setIsLangBtnOpen(!isLangBtnOpen);
    };

    const onClickUser = () => {
        setIsUserBtnOpen(!isUserBtnOpen);
    };

    useClickListener(`.${classes.menu__user}`, () => setIsUserBtnOpen(false));
    useClickListener(`.${classes.menu__lang}`, () => setIsLangBtnOpen(false));

    useEffect(() => {
        dispatch.calculator.loadCalcGroups();
    }, [dispatch]);

    return (
        <div className={classes.menu}>
            <div className={classes.menu__content}>
                <Link href={Urls.HOME}><span className={classes.menu__logo} /></Link>
                <CommonButtons className={classes.menu__mobHiddenPart} />
                <div className={clsx(classes.menu__button, classes.menu__select, classes.menu__lang, isLangBtnOpen && classes.menu__select_open)} onClick={onClickLangs}>
                    {activeLang.toUpperCase()}
                    {' '}
                    <ChevronBottom width={12} height={7} />
                    <Fade isVisible={isLangBtnOpen}>
                        <ul className={classes.menu__buttonSubmenu}>
                            {langs.map((lang) => (
                                <li className={clsx(classes.menu__button)} onClick={onChangeLang} data-lang={lang?.shortName?.toLowerCase()}>
                                    {lang.shortName}
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                <div className={clsx(classes.menu__user, classes.menu__select, classes.menu__button, isUserBtnOpen && classes.menu__select_open)} onClick={onClickUser}>
                    <span className={classes.menu__userName}>
                        {userName || '---'}
                        {' '}
                        <ChevronBottom width={12} height={7} />
                    </span>
                    <span className={classes.menu__userCalc}>
                        {calcLeft}
                        {' '}
                        {calculationsLeft}
                    </span>
                    <Fade isVisible={isUserBtnOpen}>
                        <ul className={classes.menu__buttonSubmenu}>
                            <li className={clsx(classes.menu__button)} onClick={onCallLogoutPopup}>
                                <Button variant="secondary">{logoutBtn}</Button>
                            </li>
                        </ul>
                    </Fade>
                </div>
                <div className={classes.menu__mobIcon} onClick={onClickMobMenu}>
                    {isMobMenuOpen
                        ? <IconClose width={24} height={24} />
                        : <IconMenu width={32} height={32} />}
                </div>
            </div>
            <LogoutPopup onClose={onCloseLogoutPopup} tr={tr} isVisible={isLogoutPopupOpen} />
            <MobPart isVisible={isMobMenuOpen} />
        </div>
    );
};

export default memo(Menu);
