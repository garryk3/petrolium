import { getService } from 'utils/service-locator';

import remapResult from './remap-result';
import { StepFormData, InputData, Store } from './types';

const initialState = {
    groups        : null,
    params        : null,
    config        : null,
    data          : [],
    userCalcData  : null,
    type          : null,
    activeStep    : 0,
    result        : null,
    isConfigLoaded: false,
    calculateName : ''
} as Store;

const clearedStore = (groups: Store['groups']) => ({
    ...initialState,
    groups
});

export default {
    state   : initialState,
    reducers: {
        setConfig(state: Store, config: Store['config'], type: string) {
            state.isConfigLoaded = true;
            state.config = config;
            if(state.activeStep === 0) {
                state.activeStep = (state.data.length && state.result) ? (config?.length as number) + 1 : 1;
            }
            state.type = type;
        },
        setType(state: Store, id) {
            state.type = id;
        },
        setCalculateName(state: Store, name: string) {
            state.calculateName = name;
        },
        setGroups(state: Store, groups: Store['groups']) {
            state.groups = groups;
        },
        setResult(state: Store, result: Store['result']) {
            state.result = result;
        },
        setActiveStep(state: Store, step: Store['activeStep']) {
            if(state.activeStep === step) {
                return;
            }
            state.activeStep = step;
        },
        saveStepData(state: Store, data: StepFormData) {
            state.data[state.activeStep - 1] = data;
        },
        setData(state: Store, data: Store['data']) {
            state.data = data;
        },
        setUserCalcData(state: Store, data: Store['userCalcData']) {
            state.userCalcData = data;
        },
        clear(state: Store) {
            return clearedStore(state.groups);
        }
    },
    effects: (dispatch: any) => ({
        loadConfig: async (id: string, store: AppTypes.Store) => {
            await dispatch.calculator.loadCalcGroups();

            const { localization: { lang }, calculator: { userCalcData } } = store;
            const { calculator: { groups } } = store;
            const group = groups && Array.isArray(groups) && (groups as Store['groups'])!.find((item) => item.id === id);

            if(!group) {
                return;
            }
            const { result, error } = await getService('transport').fetchCalcParams({ lang, groupUid: group.id });

            if(error) {
                getService('errorHandler')!.process(error);
            } else {
                const sortedConfig = Array.isArray(result.steps) && result.steps.sort((a, b) => a.position - b.position);

                if(userCalcData) {
                    const userData = sortedConfig.reduce((acc, config) => {
                        const stepData = userCalcData[config.id];
                        const data = {};

                        if(Array.isArray(stepData)) {
                            stepData.forEach((param) => {
                                data[param.id] = param.value;
                            });
                        }
                        acc.push(data);
                        return acc;
                    }, []);

                    dispatch.calculator.setData(userData);
                }
                dispatch.calculator.setConfig(sortedConfig ?? [], group.id);
            }
        },
        loadCalcGroups: async (payload: any, store: AppTypes.Store) => {
            const { localization: { lang } } = store;
            const { result, error } = await getService('transport').fetchCalcGroups({ lang });

            let groups = [];

            if(error) {
                getService('errorHandler')!.process(error);
            } else {
                groups = result.items.sort((a, b) => a.position - b.position);
                dispatch.calculator.setGroups(result.items);
            }
            return groups;
        },
        loadPdf: () => {
            console.log('laod pdf');
        },
        calculate: async (payload: any, store: AppTypes.Store) => {
            const {
                data, calculateName, type, config
            } = store.calculator;
            const params = data.length && data.reduce((acc, current, index) => {
                const categoryUid = config?.[index].id;

                if(!categoryUid) {
                    return acc;
                }

                const inputs = Object.entries(current).reduce((accum, entry) => {
                    if(entry[1] && entry[1] !== 'Unknown') {
                        accum.push({
                            categoryUid,
                            id   : entry[0],
                            value: entry[1]
                        });
                    }

                    return accum;
                }, [] as InputData[]);

                return [
                    ...acc,
                    ...inputs
                ];
            }, [] as InputData[]);

            if(!data) {
                return;
            }
            const { result, error } = await getService('transport').fetchCalculate({
                calcName: calculateName,
                groupUid: type,
                params
            });

            if(error) {
                getService('errorHandler')!.process(error);
            } else {
                dispatch.calculator.setResult(remapResult(result));
                dispatch.calculator.setActiveStep(store.calculator.activeStep + 1);
            }
        }
    })
};
