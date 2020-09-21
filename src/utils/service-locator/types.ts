import transport from './transport';
import errorHandler from './error-handler';

export type HttpMethods = 'GET' | 'POST';

export type ServiceNames = 'transport' | 'logger' | 'config' | 'errorHandler';

export interface HttpParams {
    [index: string]: string | string[] | number | HttpParams;
}

export interface HttpRequestParams {
    url: string;
    method?: HttpMethods;
    params?: HttpParams;
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
}


export type RequestResult = ({ url, method, params }: HttpRequestParams) => Promise<{
    headers?: {
        [index: string]: string;
    };
    error : AppTypes.RequestError | null;
    result: any;
}>

export type Services = typeof transport | typeof errorHandler;

export interface ServiceMap extends Map<ServiceNames, Services> {
    get<U extends ServiceNames>(key: U):
        U extends 'transport' ? typeof transport :
            U extends 'errorHandler' ? typeof errorHandler : any;
}


export interface CalculateParams {
    'calcName': string;
    'groupUid': string;
    'params':       {
        'categoryUid': string;
        'id': string;
        'value': string;
      }[]
  }
