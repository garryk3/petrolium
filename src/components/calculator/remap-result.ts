/* eslint-disable prefer-spread */

export default function remapResult(result: AppTypes.AnyProps) {
    if(!result) {
        return null;
    }
    result.dataType1.confidence = result.dataType1.confidence.reduce((acc, data) => {
        acc[data.value] = data;
        return acc;
    }, {});
    result.dataType1.minValue = Math.min.apply(Math, Object.keys(result.dataType1.confidence));
    result.dataType1.maxValue = Math.max.apply(Math, Object.keys(result.dataType1.confidence));

    result.dataType3.curves = Object.values(result.dataType3.curves);
    result.dataType3.data = result.dataType3.data?.sort((a) => {
        if(a.id === 'user') {
            return 1;
        }
        return -1;
    });
    return result;
}
