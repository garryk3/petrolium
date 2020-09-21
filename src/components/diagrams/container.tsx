import { h } from 'preact';
import { memo, useState } from 'preact/compat';
import clsx from 'clsx';

import IconInfo from 'ui/icons/info';
import Tooltip from 'ui/form/tooltip';
import { Directions } from 'ui/form/types';
import useClickListener from 'utils/helpers/use-click-listener';

import classes from './style.pcss';

const DiagramContainer = ({
    children, name, categoryName, categoryInfo, description
}) => {
    const [isInfoOpen, setInfoOpen] = useState(false);

    const onClickOpenInfo = () => {
        setInfoOpen(!isInfoOpen);
    };

    useClickListener(`.${classes.diagramsContainer__tooltipWrapper}`, () => {
        setInfoOpen(false);
    });

    return (
        <div className={clsx(classes.diagramsContainer)}>
            <header className={classes.diagramsContainer__header}>
                <h4>{categoryName}</h4>
                <div className={classes.diagramsContainer__tooltipWrapper}>
                    <span data-name={categoryName}>
                        <IconInfo onClick={onClickOpenInfo} width={15} height={15} />
                    </span>
                    <div className={classes.diagramsContainer__tooltip} data-open={isInfoOpen}>
                        {isInfoOpen && <Tooltip direction={Directions.Bottom} message={categoryInfo} />}
                    </div>
                </div>
            </header>
            <div className={classes.diagramsContainer__content}>
                {name && (
                    <div className={classes.diagramsContainer__diagramHeader}>
                        {name}
                    </div>
                )}
                {children}
                {description && (
                    <div className={classes.diagramsContainer__diagramHeader}>
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(DiagramContainer);
