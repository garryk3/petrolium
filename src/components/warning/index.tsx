import { h } from 'preact';
import { memo } from 'preact/compat';
import { useSelector } from 'react-redux';

import IconWarning from 'ui/icons/warning';

import classes from './style.pcss';

const Warning = () => {
    const errors = useSelector(((state: AppTypes.Store) => state.errors.messages));

    if(!(Array.isArray(errors) && errors.length)) {
        return null;
    }

    return (
        <div className={classes.warning}>
            <IconWarning className={classes.warning__icon} />
            <div className={classes.warning__list}>
                {errors.map((error, index) => (
                    <span key={index.toString()}>{error}</span>
                ))}
            </div>
        </div>
    );
};

export default memo(Warning);
