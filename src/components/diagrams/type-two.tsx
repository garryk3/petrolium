import { h } from 'preact';
import { memo } from 'preact/compat';
import clsx from 'clsx';

import Slider from 'components/slider';
import { Group } from 'components/calculator/types';

import DiagramContainer from './container';
import classes from './style.pcss';
import DiagramLine from './elements/line';
import lineParams, { axisValuesFormatter } from './elements/line-params';
import text from './elements/text';
import getAxisValues from './get-axis-values';

const findHiegerPoint = (data: Group['data'][0]['data']) => data.reduce((acc, coord) => {
    if(!acc || acc.y < coord.y) {
        acc = coord;
    }
    return acc;
}, null as null | Group['data'][0]['data'][0]);

const DiagramTypeTwo = ({ groups }: { groups: Group[] }) => {
    if(!Array.isArray(groups)) {
        return null;
    }

    const getConfig = (config, gradName) => {
        const data = [config.data];

        if(config.resultCoord) {
            data.push([{ x: config.resultCoord.x, y: null }]);
        }
        const axisValues = getAxisValues(data);

        return ({
            data: [{
                id  : 'user',
                data: config.data
            }],
            colors: [`url(#grad${gradName})`],
            margin: {
                top   : 0, right : 10, bottom: 70, left  : 90
            },
            layers: [...lineParams.layers, config.resultCoord && text({ x: config.resultCoord.x, text: config.resultValue })
            ],
            axisBottom: {
                ...lineParams.axisBottom,
                legend    : '',
                format    : axisValuesFormatter(config.scaleLog),
                tickValues: 6
            },
            xScale: {
                min : axisValues.minX as number,
                max : axisValues.maxX as number,
                type: 'linear'
            },
            yScale: {
                type: 'linear',
                min : axisValues.minY as number,
                max : axisValues.maxY as number
            },
            axisLeft: {
                ...lineParams.axisLeft,
                legendOffset: -70,
                legend      : config.legendY
            },
            ...config.resultCoord && {
                markers: [
                    {
                        axis     : 'x',
                        value    : config.resultCoord.x,
                        lineStyle: { stroke: '#242424', strokeWidth: 2, strokeDasharray: '6 6' }
                    }
                ]
            },
            areaBaselineValue: axisValues.minY
        });
    };

    return (
        <div className={clsx(classes.diagram_two, classes.diagram)}>
            <Slider
                className={classes.diagram__slider}
                arrowClassName={classes.diagram__sliderArrow}
                options={{
                    slides: groups.map((group, groupIndex) => (
                        <DiagramContainer key={group.categoryName} categoryInfo={group.categoryInfo} categoryName={group.categoryName}>
                            <div className={classes.diagram__inner}>
                                <Slider
                                    className={classes.diagram__sliderInner}
                                    arrowClassName={classes.diagram__sliderArrowInner}
                                    options={{
                                        slides: Array.isArray(group.data) ? (
                                            group.data.map((diagram, index) => {
                                                if(!diagram) {
                                                    return null;
                                                }
                                                const maxX = findHiegerPoint(diagram.data)?.x ?? 0;
                                                const len = diagram.data[diagram.data.length - 1].x - diagram.data[0].x;
                                                const offset = ((maxX - diagram.data[0].x) / len) * 100;
                                                const gradName = `${groupIndex}${index}`;

                                                return (
                                                    <div className={classes.diagram__innerSlide} key={diagram.name}>
                                                        <div className={classes.diagram__suggestTwo}>{diagram.name}</div>
                                                        <DiagramLine gradName={gradName} config={getConfig(diagram, gradName)} gradientOffset={offset} />
                                                        {diagram.units && <span className={classes.diagram__units}>{diagram.units}</span>}
                                                    </div>
                                                );
                                            })
                                        ) : []
                                    }}
                                />
                            </div>
                        </DiagramContainer>
                    ))
                }}
            />
        </div>
    );
};

export default memo(DiagramTypeTwo);
