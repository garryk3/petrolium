import selectPlugin from '@rematch/select';
import immerPlugin from '@rematch/immer';
import loadingPlugin from '@rematch/loading';

export default [
    selectPlugin(),
    immerPlugin(),
    loadingPlugin()
];
