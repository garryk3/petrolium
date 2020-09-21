import { h } from 'preact';
import { memo } from 'preact/compat';

const CustomNode = ({
    node,
    x,
    y,
    size,
    color
}) => {
    if(node.data.serieId === 'training') {
        return (
            <g transform={`translate(${x},${y})`}>
                <circle
                    r={size / 2}
                    fill={color}
                    style={{ strokeWidth: 0.5, stroke: '#242424' }}
                />
            </g>
        );
    }
    if(node.data.serieId === 'user') {
        return (
            <g transform={`translate(${x},${y})`} width="22" height="22" viewBox="0 0 22 22">
                <rect x="0.495281" y="0.493633" width="20.5355" height="20.5355" rx="50%" fill="white" stroke="#242424" strokeWidth="1" />
                <path d="M16.0629 5.46191L5.46387 16.0609M16.0629 16.0609L5.46387 5.46191" stroke="#242424" strokeWidth="3.31218" />
            </g>
        );
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <rect
                x={size * -0.5}
                y={size * -0.5}
                width={size}
                height={size}
                fill={color}
                style={{ strokeWidth: 0.5, stroke: '#242424' }}
            />
        </g>
    );
};

export default memo(CustomNode);
