import { RouterReducer, TransitionPayload } from './types';

const initialState: RouterReducer = {
    current : null,
    previous: null
};

export default {
    state   : initialState,
    reducers: {
        transition(state: RouterReducer, payload: TransitionPayload) {
            return payload;
        }
    }
};
