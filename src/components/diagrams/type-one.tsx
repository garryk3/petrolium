import { h } from 'preact';
import {
    memo, useCallback, useState, useMemo
} from 'preact/compat';
import clsx from 'clsx';

import InputRange from 'ui/form/range';
import { Result, Coord } from 'components/calculator/types';

import DiagramContainer from './container';
import DiaramLine from './elements/line';
import lineParams from './elements/line-params';
import dashedLine from './elements/dashed-line';
import text, { textWithStar } from './elements/text';

import classes from './style.pcss';

const sortCoords = (a, b) => a.x - b.x;

const DiagramTypeOne = ({ config, tr }: { config: Result['dataType1']; tr: AppTypes.AnyProps }) => {
    const { rangeTitle } = tr ?? {};
    const {
        data, confidenceStep, yAxisValues, confidence, resultCoord, legendX, legendY, name, categoryInfo, categoryName, minValue, maxValue
    } = config ?? {};
    const [rangeValue, setRangeValue] = useState(maxValue);
    const { start, finish } = confidence[rangeValue] ?? {};

    const linesData = useMemo(() => {
        if(!Array.isArray(data)) {
            return [];
        }
        const resultList = { firstLine: [] as Coord[], middleLine: [] as Coord[], finishLine: [] as Coord[] };

        data.forEach((coord) => {
            if(coord.x < start.x) {
                resultList.firstLine.push(coord);
            } else if(coord.x > finish.x) {
                resultList.finishLine.push(coord);
            } else {
                resultList.middleLine.push(coord);
            }
        });
        return [
            { id: '1', data: [...resultList.firstLine, start].sort(sortCoords) },
            { id: '2', data: [start, resultCoord, ...resultList.middleLine, finish].sort(sortCoords) },
            { id: '3', data: [finish, ...resultList.finishLine].sort(sortCoords) }
        ];
    }, [data, start, finish, resultCoord]);

    const settings = useMemo(() => ({
        data  : linesData,
        colors: ['rgba(66, 177, 229, 0.2)', 'url(#grad)', 'rgba(66, 177, 229, 0.2)'],
        margin: {
            top   : 10, right : 20, bottom: 40, left  : 90
        },
        layers: [
            ...lineParams.layers,
            dashedLine({ x: start.x, y: start.y }),
            dashedLine(resultCoord),
            dashedLine({ x: finish.x, y: finish.y }),
            text({ x: start.x, text: start.x?.toFixed(2) }),
            textWithStar({ x: resultCoord.x, text: resultCoord.x?.toFixed(2) }),
            text({ x: finish.x, text: finish.x?.toFixed(2) })
        ],
        axisBottom: {
            ...lineParams.axisBottom,
            legend        : legendX,
            legendPosition: 'middle',
            legendOffset  : 30
        },
        axisLeft: {
            ...lineParams.axisLeft,
            legend      : legendY,
            tickValues  : yAxisValues,
            legendOffset: -70
        },
        isInteractive: false
    }), [finish, start, linesData, legendX, legendY, resultCoord, yAxisValues]);

    const gradientOffset = useMemo(() => {
        const fullLen = finish.x - start.x;
        const resultXOffset = resultCoord.x - start.x;

        return (100 * resultXOffset) / fullLen;
    }, [start, finish, resultCoord]);

    const onChange = useCallback((event: AppTypes.Event) => {
        setRangeValue(event.target.value);
    }, []);

    return (
        <div className={clsx(classes.diagram__wrapperOne)}>
            <div className={classes.diagram__range}>
                <InputRange step={Math.abs(confidenceStep) ?? 1} min={minValue} max={maxValue} defaultValue={rangeValue} onChange={onChange} label={rangeTitle ?? 'Confidence, %'} />
                <div className={classes.diagram__rangeInfo}>
                    {rangeValue}
                    %
                </div>
            </div>
            <DiagramContainer name={`${name}`} categoryName={categoryName} categoryInfo={categoryInfo}>
                <div className={clsx(classes.diagram_one, classes.diagram)}>
                    <DiaramLine gradientOffset={gradientOffset} config={settings} />
                </div>
            </DiagramContainer>
        </div>
    );
};

export default memo(DiagramTypeOne);
