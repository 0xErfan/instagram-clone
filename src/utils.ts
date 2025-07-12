import useAxios from './utils/useAxios';
import { useToast } from "vue-toastification"

import type { ToastOptions } from "vue-toastification/dist/types/types"
type toastTypes = 'success' | 'info' | 'error' | 'warning'

const isLogin = async (): Promise<{ isLoggedIn: boolean; data?: any }> => {

    // const token = getCookieValue('token')
    // if (!token) return { isLoggedIn: false, data: undefined };

    try {

        const { data, status } = await useAxios().post('/auth/getMe');

        if (status !== 200) {
            return { isLoggedIn: false, data: undefined };
        }

        return { isLoggedIn: status === 200, data };

    } catch (error) {
        console.error('Fetch error:', error);
        return { isLoggedIn: false, data: undefined };
    }

}

const getCookieValue = (cookieName: string): string | null => {

    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) return decodeURIComponent(value);
    }

    return null;
}

const debounceFn = <T extends (...args: any[]) => any>(fn: T, timer: number = 300) => {
    let timeout: undefined | number;
    return (...args: Parameters<T>) => {
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => fn(...args), timer);
    }
}

const toast = (
    type: toastTypes = 'success',
    msg: string | string[] = '',
    options?: ToastOptions & { type?: toastTypes }
) => {
    const toastMsg = Array.isArray(msg) ? msg.join('\n') : msg
    useToast()[type](toastMsg, options)
}

export {
    isLogin,
    getCookieValue,
    debounceFn,
    toast,
    
}
