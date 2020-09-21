import { h } from 'preact';

import classes from '../style.pcss';

const BgRect = ({ innerWidth, innerHeight }) => (
    <rect className={classes.diagram__bgRect} width={innerWidth} height={innerHeight} />
);

export default BgRect;
