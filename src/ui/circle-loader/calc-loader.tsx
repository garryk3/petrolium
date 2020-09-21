import { h } from 'preact';
import { createPortal } from 'preact/compat';

import classes from './style.pcss';

export default function CalcLoader({ show }: { show: boolean; }) {
    if(!show) {
        return null;
    }
    return createPortal((
        <div className={classes.circleLoader__wrapper}>
            <div className={classes.calcLoader} />
        </div>
    ), document.getElementById('app')!);
}
