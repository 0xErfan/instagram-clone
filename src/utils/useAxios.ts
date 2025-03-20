import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { server } from "@/configs.json";

export type Response = {
    success: boolean
    data?: { [key: string]: any } | null
    status: number
    message: string
    errors: string[]
}

const useAxios = () => {

    const axiosInstance = axios.create({
        baseURL: server.url,
        timeout: 8000,
        headers: { 'Content-Type': 'application/json' },
    });

    // Request interceptor
    axiosInstance.interceptors.request.use(
        config => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        response => response,
        error => Promise.reject(error)
    );

    const handleResponse = (response: AxiosResponse<Response>): Response => {
        return { ...response.data, status: response.status };
    };

    const handleError = (error: any): never => {

        const { status, message, errors } = error.response?.data;

        console.log(status)

        const apiError: Response = {
            success: false,
            data: null,
            message: message || 'An error occurred',
            status: status || 500,
            errors: errors || [],
        };

        throw apiError;

    };

    return {
        get: async (route: string, config?: AxiosRequestConfig): Promise<Response> => {
            try {
                const response = await axiosInstance.get<Response>(route, config);
                return handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },
        post: async (route: string, data?: any, config?: AxiosRequestConfig): Promise<Response> => {
            try {
                const response = await axiosInstance.post<Response>(route, data, config);
                return handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },
        put: async (route: string, data?: any, config?: AxiosRequestConfig): Promise<Response> => {
            try {
                const response = await axiosInstance.put<Response>(route, data, config);
                return handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },
        delete: async (route: string, config?: AxiosRequestConfig): Promise<Response> => {
            try {
                const response = await axiosInstance.delete<Response>(route, config);
                return handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },
        patch: async (route: string, data?: any, config?: AxiosRequestConfig): Promise<Response> => {
            try {
                const response = await axiosInstance.patch<Response>(route, data, config);
                return handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        }
    };
};

export default useAxios;