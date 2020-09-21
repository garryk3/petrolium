import { h } from 'preact';
import { memo, useState, useEffect } from 'preact/compat';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import ChevronBottom from 'ui/icons/chevron-bottom';
import useClickListener from 'utils/helpers/use-click-listener';

import classes from './style.pcss';

const Select = ({ options, name }: { name: string; options: string[] }) => {
    const { register, setValue, formState } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);

    const onClickSelect = (event: AppTypes.Event) => {
        const selectValue = event.target.dataset?.value;

        if(!selectValue) {
            return;
        }
        setValue(name, selectValue);
        setIsOpen(false);
    };

    const onClickOpen = () => {
        setIsOpen(!isOpen);
    };

    useClickListener(`.${classes.select__wrapper}`, () => setIsOpen(false));

    return (
        <div key={name} className={clsx(classes.select__wrapper, isOpen && classes.select__wrapper_open)} data-name={name}>
            <div className={classes.select__inputWrapper} onClick={onClickOpen}>
                <input value={formState.touched[name]} ref={register} disabled className={clsx(classes.input__inner, classes.select)} name={name} />
                <ChevronBottom width={16} height={11} />
            </div>
            <ul className={clsx(classes.select__options, isOpen && classes.select__options_open)}>
                {options.map((option) => (
                    <li onClick={onClickSelect} data-value={option}>{option}</li>
                ))}
            </ul>
        </div>
    );
};

export default memo(Select);
