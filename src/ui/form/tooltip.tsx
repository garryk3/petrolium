import { h } from 'preact';
import { memo } from 'preact/compat';
import clsx from 'clsx';

import { Info } from './types';
import classes from './style.pcss';

const Tooltip = ({ message, direction }: Info) => (
    <div className={clsx(classes.tooltip, classes[`tooltip_${direction}`])}>{message}</div>
);

export default memo(Tooltip);
