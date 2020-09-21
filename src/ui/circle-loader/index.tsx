import { h } from 'preact';

import classes from './style.pcss';

export default function CircleLoader({ show }: { show: boolean; }) {
    if(!show) {
        return null;
    }
    return (
        <div className={classes.circleLoader__wrapper}>
            <span className={classes.circleLoader}>
                <svg height="60" width="60">
                    <circle cx="30" cy="30" r="20" strokeWidth="10" fill="none" />
                </svg>
            </span>
        </div>
    );
}
