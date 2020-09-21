import { init } from '@rematch/core';

import { models } from './models';
import plugins from './plugins';

const middlewares: any[] = [];

if(process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const { createLogger } = require('redux-logger');

    middlewares.push(createLogger());
}

export const store = init({
    models,
    plugins,
    redux: {
        middlewares
    }
});

export default store;
