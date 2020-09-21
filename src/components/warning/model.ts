type Errors = {
    messages: string[];
};

const initialState = {
    messages: []
} as Errors;

export default {
    state   : initialState,
    reducers: {
        setError(state: Errors, error: string) {
            state.messages.push(error);
        },
        clearErrors(state: Errors) {
            state.messages = [];
        }
    }
};
