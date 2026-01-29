// authStorage.js
const AUTH_STORAGE_KEYS = {
    USER: 'user',
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken'
};

export const authStorage = {
    getUser: () => {
        try {
            const user = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Failed to get user from storage:', error);
            return null;
        }
    },

    setUser: (user) => {
        try {
            localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
        } catch (error) {
            console.error('Failed to save user to storage:', error);
        }
    },

    getAccessToken: () => {
        try {
            return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
        } catch (error) {
            console.error('Failed to get access token:', error);
            return null;
        }
    },

    setAccessToken: (token) => {
        try {
            localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
        } catch (error) {
            console.error('Failed to save access token:', error);
        }
    },

    clearAuth: () => {
        try {
            localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
            localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error('Failed to clear auth storage:', error);
        }
    }
};