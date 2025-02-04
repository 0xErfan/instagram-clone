const isLogin = async (): Promise<{ isLoggedIn: boolean; data?: any }> => {

    const token = getCookieValue('token')
    if (!token) return { isLoggedIn: false, data: undefined };

    try {

        const response = await fetch('/auth/getMe', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            return { isLoggedIn: false, data: undefined };
        }

        const data = await response.json();
        return { isLoggedIn: data?.status === 200, data };

    } catch (error) {
        console.error('Fetch error:', error);
        return { isLoggedIn: false, data: undefined };
    }

}

const getCookieValue = (cookieName: string) => {

    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {

        const [name, value] = cookie.split('=');

        if (name === cookieName) {
            return decodeURIComponent(value); // Return the decoded value
        }

    }

    return null;
}

export {
    isLogin,
    getCookieValue,
}
