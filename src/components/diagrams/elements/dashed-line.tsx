import { h } from 'preact';

const DashedLine = ({ x, y }) => ({ xScale, yScale }) => (
    <line x1={xScale(x)} y1={yScale(0)} x2={xScale(x)} y2={yScale(y)} stroke="#242424" strokeWidth="2" strokeDasharray="5 5" />
);

export default DashedLine;
