import { h, Fragment } from 'preact';
import { memo, useMemo } from 'preact/compat';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

import getAxisValues from '../get-axis-values';
import CustomNode from './custom-node';

const renderCustomArea = (data, index, length) => ({ xScale, yScale }) => {
    const [firstCoord, ...otherCoord] = data;
    const path = otherCoord.map((coord) => `${xScale(coord.x)} ${yScale(coord.y)}`).join(' ');
    const opacity = 1 - ((10 / length) * index * 0.08);

    return (
        <path
            d={`M${xScale(firstCoord.x)} ${yScale(firstCoord.y)} ${path} Z`}
            fill="url(#radial)"
            fillOpacity={opacity}
        />
    );
};

const DiagramScatterPlot = ({ data, curves }) => {
    const getNodeSize = useMemo(
        () => (node) => {
            if(node.serieId === 'training') {
                return 7;
            }
            return 3;
        },
        []
    );
    const axisValues = useMemo(() => getAxisValues([...data.map((coords) => coords.data), ...Object.values(curves)]), [data, curves]);

    return (
        <Fragment>
            <svg width={0} height={0}>
                <defs>
                    <radialGradient id="radial" cx="50%" cy="50%" r="100%">
                        <stop offset="0%" stopColor="#7A79BF" />
                        <stop offset="50%" stopColor="#42B0E3" />
                    </radialGradient>
                </defs>
            </svg>
            <ResponsiveScatterPlot
                data={data}
                margin={{
                    top   : 0, right : 0, bottom: 0, left  : 0
                }}
                xScale={{ type: 'linear', min: axisValues.minX as number, max: axisValues.maxX as number }}
                yScale={{ type: 'linear', min: axisValues.minY as number, max: axisValues.maxY as number }}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                motionStiffness={175}
                theme={{
                    background: '#EAEAF2',
                    grid      : {
                        line: {
                            stroke     : '#fff',
                            strokeWidth: 1
                        }
                    }
                }}
                colors="#fff"
                blendMode="normal"
                nodeSize={getNodeSize}
                renderNode={CustomNode}
                isInteractive={false}
                layers={['grid', 'axes', ...curves.reverse().map((coord, index) => renderCustomArea(coord, index, curves.length)), 'nodes', 'markers', 'mesh', 'legends']}
            />
        </Fragment>
    );
};

export default memo(DiagramScatterPlot);
