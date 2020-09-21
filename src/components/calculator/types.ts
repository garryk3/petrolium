import { InputConfig } from 'components/form/types';

export interface Step {
    name: string; // название шага
    position: number;
    data: Array<InputConfig>;
    id: string;
} // список конфигов контрола в каждом шаге

export interface Coord {
    x: number;
    y: number;
}

export interface DiagramData {
    categoryName: string;
    categoryInfo: string;
    name: string;
    legendX: string;
    legendY: string;
    data: Coord[];
    resultCoord: Coord;
}

export interface Confidence {
    [index: string]: {
        start: Coord;
        finish: Coord;
    }
}

export interface Group {
    categoryName: string;
    categoryInfo: string;
    data: {
        name: string;
        legendY: string;
        data: Coord[];
        resultCoord: Coord | null;
        scaleLog: boolean;
        units: string;
    }[];
}

export interface Result {
    date: string;
    description: string;
    userCalcUid: string;
    dataType1: DiagramData & {
        confidence:  Confidence;
        minValue: number;
        maxValue: number;
        confidenceStep: number;
        yAxisValues: number[];
    };
    dataType2: Group[];
    dataType3: Pick<DiagramData, 'categoryInfo' | 'categoryName' | 'data' | 'name'> & {
        curves: Coord[][];
        description: string;
    };
    translates: {
        [index: string]: string;
    }
}

export interface Calculate {
    date: string;
    dataType1: DiagramData & {
        confidence: Confidence;
    };
    dataType2: DiagramData,
    dataType3: {}
}

export interface Store {
    groups: {
        id: string;
        name: string;
        position: number;
        description: string;
        children: any[];
    }[] | null;
    config: null | Step[];
    data  : StepFormData[];
    userCalcData  : {
        [index: string]: {
            [index: string]: string;
        }
    } | null;
    type  : null | string;
    activeStep: number;
    result: Result | null;
    isConfigLoaded: boolean;
    calculateName: string;
}

export interface StepFormData {
    [index: string]: string;
}

export interface InputData {
    categoryUid: string;
    id   : string;
    value: string;
}
