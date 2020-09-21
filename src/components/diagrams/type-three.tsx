import { h } from 'preact';
import { memo } from 'preact/compat';
import clsx from 'clsx';

import { Result } from 'components/calculator/types';

import DiagramContainer from './container';
import DiagramScatterPlot from './elements/scatterplot';
import classes from './style.pcss';

const DiagramTypeThree = ({ config, tr }: { config: Result['dataType3'], tr: AppTypes.AnyProps; }) => {
    const {
        categoryInfo, categoryName, curves, data, name, description
    } = config ?? {};
    const { reserviorMarkerInfo1, reserviorMarkerInfo2, reserviorMarkerInfo3 } = tr ?? {};

    return (
        <div className={clsx(classes.diagram_three, classes.diagram)}>
            <DiagramContainer categoryInfo={categoryInfo} categoryName={categoryName} name={name} description={description}>
                <div className={clsx(classes.diagram__innerThree)}>
                    <div className={classes.diagram__suggestThree}>
                        <span>{reserviorMarkerInfo1}</span>
                        <span>{reserviorMarkerInfo2}</span>
                        <span>{reserviorMarkerInfo3}</span>
                    </div>
                    <DiagramScatterPlot data={data ?? []} curves={curves ?? []} />
                </div>
            </DiagramContainer>
        </div>
    );
};

export default memo(DiagramTypeThree);
