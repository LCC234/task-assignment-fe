import { EnhancedStore } from "@reduxjs/toolkit";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// @ts-ignore
let store: EnhancedStore;
export const injectStore = (_store: EnhancedStore) => {
    store = _store;
};

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
const axiosObj = axios.create({
    baseURL: baseUrl,
});

axiosObj.interceptors.request.use(
    (config) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosObj.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

const clientBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: "" }
    ): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig["method"];
            data?: AxiosRequestConfig["data"];
            params?: AxiosRequestConfig["params"];
            headers?: AxiosRequestConfig["headers"];
        },
        unknown,
        { status: number | undefined; data: any }
    > =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result: AxiosResponse = await axiosObj.request({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: headers,
            });
            if (result.status >= 400) {
                throw result;
            }
            return { data: result.data };
        } catch (e) {
            const axiosError = e as AxiosError;
            return {
                error: {
                    status: axiosError.response?.status,
                    data: axiosError.response?.data,
                },
            };
        }
    };

export default clientBaseQuery;