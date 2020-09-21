import transport from './transport';
import errorHandler from './error-handler';

import { ServiceNames, ServiceMap } from './types';

const serviceLocator: ServiceMap = new Map();

export const getService = (serviceName: ServiceNames) => {
    if(!serviceLocator.has(serviceName)) {
        console.error(`[Service locator] error: service ${serviceName} not found!`);
    }
    return serviceLocator.get(serviceName);
};

export const setService = (serviceName: ServiceNames, service: any) => {
    serviceLocator.set(serviceName, service);
};

setService('transport', transport);
setService('errorHandler', { process: errorHandler });

export default serviceLocator;
