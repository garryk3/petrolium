import axios from 'axios';

import Endpoints from './endpoints';
import {
    HttpRequestParams, RequestResult, HttpParams, CalculateParams
} from './types';

const instance = axios.create({
    baseURL: `${process.env.API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

const setAuthHeader = (token: string) => {
    instance.defaults.headers.common.Authorization = token;
};

export const fetch: RequestResult = async ({
    url, method = 'POST', params, responseType = 'json'
}: HttpRequestParams) => {
    try {
        const { data, headers, status } = await instance({
            url,
            data: params,
            method,
            responseType
        });

        if(data?.error) {
            throw data.error;
        }

        return {
            headers,
            status,
            error : null,
            result: data
        };
    } catch(error) {
        const dataError = error?.response?.data?.error || error?.response?.data?.message;
        const responseError = dataError ? {
            message: dataError?.message ?? dataError
        } : error;

        return {
            result: null,
            error : responseError
        };
    }
};

const fetchForgotPass = (params: { login: string; password: string; }) => fetch({
    url   : Endpoints.ForgotPass,
    method: 'POST',
    params
});

const fetchRecoveryPass = (params: { login: string; password: string; }) => fetch({
    url   : Endpoints.RecoveryPass,
    method: 'POST',
    params
});

const fetchLogin = (params: { login: string; password: string; }) => fetch({
    url   : Endpoints.Login,
    method: 'POST',
    params
});

const fetchRegister = (params: { login: string; password: string; }) => fetch({
    url   : Endpoints.Register,
    method: 'POST',
    params
});

const fetchLogout = () => fetch({
    url   : Endpoints.Logout,
    method: 'GET'
});

const fetchRegisterComplete = (params: { userName: string; password: string; login: string; }) => fetch({
    url   : Endpoints.RegisterComplete,
    method: 'POST',
    params
});

const fetchLocalization = (params: { lang: string; path: string; }) => fetch({
    url   : Endpoints.Localization,
    method: 'POST',
    params
});

const fetchLocalizationLangs = () => fetch({
    url   : Endpoints.LocalizationLangs,
    method: 'GET'
});

const fetchLocalizationIcon = (lang: string) => fetch({
    url         : `${Endpoints.LocalizationIcon}${lang}`,
    responseType: 'blob',
    method      : 'GET'
});

const fetchMoreCalc = (params: { message: string; }) => fetch({
    url   : Endpoints.MoreCalc,
    method: 'POST',
    params
});


const fetchMyCalcs = (params: { offset: number; }) => fetch({
    url   : Endpoints.MyCalcs,
    method: 'POST',
    params
});

const fetchUserCalc = (params: { calcId: string; }) => fetch({
    url   : Endpoints.UserCalc,
    method: 'POST',
    params
});

const fetchContent = (params: { lang: string; path: string; }) => fetch({
    url   : `${Endpoints.Content}/${params.path}`,
    method: 'POST',
    params
});

const fetchCalcGroups = (params: { lang: string; }) => fetch({
    url   : Endpoints.CalcGroups,
    method: 'POST',
    params
});

const fetchCalcParams = (params: { lang: string; groupUid: string; }) => fetch({
    url   : Endpoints.CalcParams,
    method: 'POST',
    params
});

const fetchCalculate = (params: CalculateParams & HttpParams) => fetch({
    url   : Endpoints.Calculate,
    method: 'POST',
    params
});

export default {
    fetch,
    setAuthHeader,
    fetchLogin,
    fetchForgotPass,
    fetchLogout,
    fetchRegister,
    fetchRegisterComplete,
    fetchLocalization,
    fetchLocalizationLangs,
    fetchLocalizationIcon,
    fetchMoreCalc,
    fetchMyCalcs,
    fetchUserCalc,
    fetchContent,
    fetchCalcGroups,
    fetchCalcParams,
    fetchCalculate,
    fetchRecoveryPass
};
