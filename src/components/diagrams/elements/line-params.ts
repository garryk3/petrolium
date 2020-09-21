import theme from './theme';
import bgRect from './bg-rect';

const formatter = (c: string) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c] || (c === '.' && '∙') || (c === '-' && '¯') || '';

const formatNumberDegree = (number: number | string) => number.toString().replace(/./g, formatter);

export const axisValuesFormatter = (isLogScaleFormat?) => (number: number) => {
    if(isLogScaleFormat) {
        const numberDegree = formatNumberDegree(number);

        return `10${numberDegree}`;
    }
    if(Math.abs(number) > 999) {
        return `${Math.sign(number) * ((Math.abs(number) / 1000).toFixed(1))}k`;
    }
    if(String(number).length > 6) {
        const [base, exponent] = number.toExponential(1).split('e');
        const baseValue = base === '1.0' ? '' : `${base}*`;

        return `${baseValue}10${formatNumberDegree(exponent)}`;
    }
    return number;
};

// export const axisFormats

export default {
    layers       : [bgRect, 'crosshair', 'slices', 'mesh', 'axes', 'grid', 'legends', 'points', 'areas', 'lines', 'markers'],
    curve        : 'linear',
    enableArea   : true,
    areaOpacity  : 1,
    isInteractive: false,
    enablePoints : false,
    xScale       : {
        type: 'linear', min : 'auto', max : 'auto'

    },
    yScale: {
        type   : 'linear',
        min    : 'auto',
        max    : 'auto',
        stacked: false,
        reverse: false
    },
    axisTop   : null,
    axisRight : null,
    axisBottom: {
        orient        : 'top',
        tickSize      : 0,
        tickPadding   : 15,
        tickRotation  : 0,
        legendOffset  : -160,
        legendPosition: 'end',
        format        : axisValuesFormatter()
    },
    axisLeft: {
        orient        : 'left',
        tickSize      : 0,
        tickPadding   : 5,
        tickRotation  : 0,
        legendOffset  : -50,
        legendPosition: 'middle',
        tickValues    : 5,
        format        : axisValuesFormatter()
    },
    colors   : ['rgba(66, 177, 229, 0.2)', 'url(#grad)', 'rgba(66, 177, 229, 0.2)'],
    lineWidth: 0,
    useMesh  : false,
    theme
};
