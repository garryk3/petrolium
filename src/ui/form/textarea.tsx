import { h } from 'preact';
import { memo } from 'preact/compat';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import classes from './style.pcss';
import { InputProps } from './types';

const Textarea = ({
    className, labelName, name, errorMessage
}: Partial<InputProps> & { name: string; }) => {
    const { register } = useFormContext();

    return (
        <label htmlFor="textarea" className={classes.textarea__label}>
            {labelName}
            <textarea name={name} ref={register({ required: true })} className={clsx(classes.textarea, className, errorMessage && classes.textarea_error)} />
        </label>
    );
};

export default memo(Textarea);
