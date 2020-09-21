import { h } from 'preact';
import {
    memo, useMemo, useState, useCallback
} from 'preact/compat';
import clsx from 'clsx';

import IconInfo from 'ui/icons/info';
import IconWarning from 'ui/icons/warning';
import IconSuccess from 'ui/icons/success';
import IconEye from 'ui/icons/eye';
import IconEyeNo from 'ui/icons/eye-no';

import Select from './select';
import { InputProps, Info, Directions } from './types';
import Tooltip from './tooltip';
import classes from './style.pcss';

const Input = ({
    className,
    labelName,
    inputProps,
    labelSubName,
    info,
    errorMessage,
    valid,
    isShowEmpty,
    select
}: InputProps) => {
    const hasError = Boolean(errorMessage);
    const { type, ...otherInputProps } = inputProps;
    const isPassword = type === 'password';
    const [isTooltipOpen, setTooltipStatus] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const inputType = (isPassword && isPasswordVisible) ? 'text' : type;
    const inputClasses = clsx(
        classes.input,
        className,
        hasError && classes.input_error,
        (valid && !hasError) && classes.input_valid,
        inputProps?.disabled && classes.input_disabled,
        isShowEmpty && classes.input_empty
    );

    const onOpenTooltip = useCallback(() => {
        setTooltipStatus(true);
    }, []);

    const onCloseTooltip = useCallback(() => {
        setTooltipStatus(false);
    }, []);

    const onShowPassword = useCallback(() => {
        setPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const getIcon = useMemo(() => {
        const props = {
            width : 15,
            height: 15
        };

        if(hasError) {
            return <IconWarning {...props} className={clsx(classes.input__icon_warning, classes.input__icon)} />;
        }
        if(valid) {
            return <IconSuccess {...props} className={clsx(classes.input__icon_success, classes.input__icon)} />;
        }
        if(isPassword) {
            const Tag = isPasswordVisible ? IconEyeNo : IconEye;

            return <Tag {...props} onClick={onShowPassword} className={clsx(classes.input__icon_eye, classes.input__icon)} />;
        }
        if(info) {
            if(!info.direction) {
                info.direction = Directions.Right;
            }
            return <IconInfo {...props} onMouseLeave={onCloseTooltip} onMouseEnter={onOpenTooltip} className={clsx(classes.input__icon_info, classes.input__icon)} />;
        }
        return null;
    }, [hasError, valid, info, onCloseTooltip, onOpenTooltip, isPassword, isPasswordVisible, onShowPassword]);

    const getSubMessage = useMemo(() => {
        if(!labelSubName && !hasError) {
            return null;
        }
        return (
            <span className={clsx(
                classes.input__subname,
                hasError && classes.input__subname_error
            )}
            >
                {hasError ? errorMessage : labelSubName}
            </span>
        );
    }, [hasError, labelSubName, errorMessage]);

    return (
        <label htmlFor={inputProps?.name} className={classes.input__label}>
            {Boolean(labelName) && <span className={classes.input__name} title={labelName}>{labelName}</span>}
            <span className={inputClasses}>
                {Array.isArray(select)
                    ? <Select name={inputProps.name} options={select} />
                    : <input className={classes.input__inner} type={inputType} {...otherInputProps} />}
                {getIcon}
                {isTooltipOpen && Boolean(info) && <Tooltip {...info as Info} />}
            </span>
            {getSubMessage}
        </label>
    );
};

export default memo(Input);
