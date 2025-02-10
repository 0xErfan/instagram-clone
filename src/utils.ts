import axios from "axios";

const isLogin = async (): Promise<{ isLoggedIn: boolean; data?: any }> => {

    const token = getCookieValue('token')
    if (!token) return { isLoggedIn: false, data: undefined };

    try {

        const { data, status } = await axios.post(
            'http://localhost:3001/auth/getMe',
            undefined,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

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

export {
    isLogin,
    getCookieValue,
}
