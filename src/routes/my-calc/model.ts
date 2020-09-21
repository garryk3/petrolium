import { route } from 'preact-router';

import { getService } from 'utils/service-locator';
import Urls from 'components/router/urls-enum';
import remapResult from 'components/calculator/remap-result';

type Calc = {
    date: string;
    globUid: string; // id расчета
    groupName: string;
    isUseAsTemplate: boolean;
    name: string;
    groupUid: string;
};
type Calcs = {
    calcs: Calc[];
    count: number;
};

const initialState = {
    calcs: [],
    count: 0
} as Calcs;

export default {
    state   : initialState,
    reducers: {
        setCalc(state: Calcs, calcs: Calc[], count: number) {
            state.calcs = [...state.calcs, ...calcs];
            state.count = count;
        }
    },
    effects: (dispatch: any) => ({
        load: async (payload: any, store: AppTypes.Store) => {
            const { result, error } = await getService('transport').fetchMyCalcs({
                offset: store.myCalcs.calcs.length,
                limit : 15
            });

            if(error) {
                getService('errorHandler')!.process(error);
            } else {
                dispatch.myCalcs.setCalc(result?.items?.items, result?.items?.total);
            }
        },
        async loadCalc({ calcId, type }: { calcId: string; type: string; }) {
            const { result, error } = await getService('transport').fetchUserCalc({ calcId });

            if(error) {
                getService('errorHandler')!.process(error);
            } else {
                const {
                    calcName, calcDate, groupUid, params, result: userCalc
                } = result;

                dispatch.calculator.setCalculateName(calcName);
                dispatch.calculator.setType(groupUid);
                dispatch.calculator.setResult(remapResult(userCalc));
                dispatch.calculator.setUserCalcData(params);
                route(`${Urls.CALCULATE}${type}`);
            }
        }
    })
};
