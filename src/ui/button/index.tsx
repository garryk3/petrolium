import { h } from 'preact';
import { memo } from 'preact/compat';
import clsx from 'clsx';
import { Link } from 'preact-router/match';

import IconArrowLeft from 'ui/icons/arrow-left';
import IconArrowRight from 'ui/icons/arrow-right';

import classes from './style.pcss';
import { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
    const {
        variant = 'primary', className, type, children, arrowDirection, ...buttonProps
    } = props;
    const classnames = clsx(
        classes.button,
        className,
        variant === 'primary' && classes.button_primary,
        variant === 'secondary' && classes.button_secondary,
        variant === 'link' && classes.button_link,
        variant === 'link-primary' && classes.button_primaryLink,
    );
    const Tag = variant.includes('link') ? Link : 'button';

    return (
        <Tag className={classnames} type={type} {...buttonProps}>
            {arrowDirection === 'left' && <IconArrowLeft className={classes.button__arrowLeft} width={15} height={15} />}
            {children}
            {arrowDirection === 'right' && <IconArrowRight className={classes.button__arrowRight} width={15} height={15} />}
        </Tag>
    );
};

export default memo(Button);
