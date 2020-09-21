import store from 'utils/store';

const TIME_TO_HIDE_ERROR = 5000;
let timeout: ReturnType<typeof setTimeout> | null = null;

export default function errorHandler(
    error: AppTypes.RequestError | null,
    time: number = TIME_TO_HIDE_ERROR
) {
    const { dispatch } = store;

    if(!error?.message) {
        return;
    }
    dispatch.errors.setError(error.message);

    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
        dispatch.errors.clearErrors();
        timeout = null;
    }, time);
}
