import { h } from 'preact';
import classes from '../style.pcss';

const Text = ({ x, text }) => ({ xScale, yScale }) => (
    <text x={xScale(x)} y={yScale(0)} className={classes.diagram__textSvg}>{text}</text>
);

export const textWithStar = ({ x, text }) => ({ xScale }) => (
    <g transform={`translate(${xScale(x)}, 30)`} width="22" height="22" viewBox="0 0 22 22" className={classes.diagram__textStarWrapper}>
        <text x={15} y={0} className={classes.diagram__textStar}>{text}</text>
        <g transform="translate(4, -20)">
            {/* eslint-disable-next-line max-len */}
            <path fillRule="evenodd" clipRule="evenodd" d="M5.99968 10.0649L2.39669 11.9591L3.0848 7.94712L0.169922 5.10581L4.19819 4.52047L5.99968 0.870239L7.80118 4.52047L11.8294 5.10581L8.91457 7.94712L9.60268 11.9591L5.99968 10.0649Z" fill="#242424" />
        </g>
    </g>
);

export default Text;
