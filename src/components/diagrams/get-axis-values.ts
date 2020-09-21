export default function getAxisValues(dataList: {x: number; y: number}[][]) {
    const values = {
        minX: null,
        maxX: null,
        minY: null,
        maxY: null
    } as {
        minX: number | null;
        maxX: number | null;
        minY: number | null;
        maxY: number | null;
    };

    if(Array.isArray(dataList)) {
        dataList.forEach((data) => {
            data.forEach((coords) => {
                if(coords.x && !values.minX || (values.minX && (coords.x < values.minX))) {
                    values.minX = coords.x;
                }
                if(coords.x && !values.maxX || (values.maxX && (coords.x > values.maxX))) {
                    values.maxX = coords.x;
                }
                if(coords.y && !values.minY || (values.minY && (coords.y < values.minY))) {
                    values.minY = coords.y;
                }
                if(coords.y && !values.maxY || (values.maxY && (coords.y > values.maxY))) {
                    values.maxY = coords.y;
                }
            });
        });
    }
    return values;
}
