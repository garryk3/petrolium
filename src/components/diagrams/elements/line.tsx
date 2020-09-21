import { h } from 'preact';
import { memo, Fragment } from 'preact/compat';
import { ResponsiveLine } from '@nivo/line';

import lineParams from './line-params';

const DiaramLine = ({ config, gradientOffset = 50, gradName = '' }: { config: any, gradientOffset: number; gradName?: string; }) => {
    const leftGradientOffset = (gradientOffset - 10) > 0 ? gradientOffset - 10 : 0;
    const rigthGradientOffset = (gradientOffset + 10) < 100 ? gradientOffset + 10 : 100;

    return (
        <Fragment>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id={`grad${gradName}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop stopColor="#42B0E3" />
                        <stop offset={`${leftGradientOffset}%`} stopColor="#7A79BF" />
                        <stop offset={`${rigthGradientOffset}%`} stopColor="#7A79BF" />
                        <stop offset="100%" stopColor="#42B0E3" />
                    </linearGradient>
                </defs>
            </svg>
            <ResponsiveLine {...lineParams} {...config} />
        </Fragment>
    );
};

export default memo(DiaramLine);
