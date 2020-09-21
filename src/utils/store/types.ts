import { RematchDispatch, RematchRootState } from '@rematch/core';
import { RootModel } from './models';

interface LoadingPlugin {
    loading: {
        global: boolean;
        models: {
            [key in keyof RootModel]: boolean;
        };
        effects: {
            [index: string]: any;
        };
    }
}

export type RootStore = RematchRootState<RootModel> & LoadingPlugin;

export type Dispatch = RematchDispatch<RootModel>;
