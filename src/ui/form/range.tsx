import { h } from 'preact';
import { memo } from 'preact/compat';
import clsx from 'clsx';

import classes from './style.pcss';
import { InputProps } from './types';

const InputRange = ({
    className, label, ...props
}: Partial<InputProps['inputProps']>) => (
    <div className={clsx(classes.inputRange, className)}>
        {label && <div className={classes.inputRange__label}>{label}</div>}
        <input type="range" {...props} />
    </div>
);

export default memo(InputRange);
