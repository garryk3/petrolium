import { h } from 'preact';
import { createPortal } from 'preact/compat';
import clsx from 'clsx';

import classes from './style.pcss';

const Popup = ({ children, className, onClose }: { children: JSX.Element, className?: string; onClose: Function; }) => {
    const onClick = (event: AppTypes.Event) => {
        if(event.target.closest(`.${classes.popup}`)) {
            return;
        }
        onClose();
    };

    return (
        createPortal((
            <div className={clsx(classes.popup__wrapper)} onClick={onClick}>
                <div className={clsx(classes.popup, className)}>
                    {children}
                </div>
            </div>), document.getElementById('content')!)
    );
};

export default Popup;
