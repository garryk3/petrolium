import { h } from 'preact';
import {
    memo, useState, useCallback
} from 'preact/compat';
import { useSelector } from 'react-redux';
import { Link } from 'preact-router/match';
import clsx from 'clsx';

import IconCircleQuestion from 'ui/icons/question-circle';
import ChevronBottom from 'ui/icons/chevron-bottom';
import Urls from 'components/router/urls-enum';
import GetCalcPopup from 'components/popups/get-calc';
import Fade from 'ui/animations/fade';
import useClickListener from 'utils/helpers/use-click-listener';

import classes from './style.pcss';

const CommonButtons = ({ className }: { className?: string; }) => {
    const {
        tr = {}, path, groups
    } = useSelector((state: AppTypes.Store) => ({
        tr    : state.localization.translations[state.localization.lang]?.[Urls.COMMON],
        path  : state.router.current?.url,
        groups: state.calculator.groups
    }));
    const [isMoreCalcPopupOpen, setIsMoreCalcPopupOpen] = useState(false);
    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const {
        menuItem1, menuItem2, menuItem3, menuItem4
    } = tr;

    const onOpenMoreCalcPopup = () => {
        setIsMoreCalcPopupOpen(true);
    };

    const onCloseMoreCalcPopup = useCallback(() => {
        setIsMoreCalcPopupOpen(false);
    }, []);

    const onClickOpenCalc = () => {
        setIsCalcOpen(!isCalcOpen);
    };

    useClickListener(`.${classes.menu__list}`, () => setIsCalcOpen(false));

    return (
        <div className={className}>
            <span className={clsx(classes.menu__button, classes.menu__list, classes.menu__select, isCalcOpen && classes.menu__select_open)} onClick={onClickOpenCalc}>
                <div>
                    {menuItem1}
                    {' '}
                    <ChevronBottom width={16} height={9} />
                </div>
                <Fade isVisible={isCalcOpen}>
                    <ul className={classes.menu__buttonSubmenu}>
                        {Array.isArray(groups) && groups.map((group, index) => (
                            <li>
                                <Link key={index.toString()} className={clsx(classes.menu__button)} href={`${Urls.CALCULATE}${group.id}`}>{group.name}</Link>
                            </li>
                        ))}
                    </ul>
                </Fade>
            </span>
            <Link className={clsx(classes.menu__button, path === Urls.MY_CALCULATIONS && classes.menu__button_active)} href={Urls.MY_CALCULATIONS}>{menuItem2}</Link>
            <div onClick={onOpenMoreCalcPopup} className={clsx(classes.menu__button)}>{menuItem3}</div>
            <Link className={clsx(classes.menu__button, classes.menu__button_help, path === `${Urls.CONTENT}help` && classes.menu__button_active)} href={`${Urls.CONTENT}help`}>
                <IconCircleQuestion width={16} height={16} />
                {menuItem4}
            </Link>
            <GetCalcPopup onClose={onCloseMoreCalcPopup} tr={tr} isVisible={isMoreCalcPopupOpen} />
        </div>
    );
};

export default memo(CommonButtons);
