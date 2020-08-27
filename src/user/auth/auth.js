import { ACCESS_TOKEN as TOKEN_KEY } from '../../constants/index';
const USER_INFO = 'userInfo';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {

    clear(key) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        } else if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        } else {
            return null;
        }   
    },

    clearAppStorage() {
        if (localStorage) {
            localStorage.clear();
        }

        if (sessionStorage) {
            sessionStorage.clear();
        }
    },

    removeToken(tokenKey = TOKEN_KEY) {
        return auth.clear(tokenKey);
    },

    removeUserInfo(userInfo = USER_INFO) {
        return auth.clear(userInfo);
    },

    get(key) {
        if (localStorage && localStorage.getItem(key)) {
            return parse(localStorage.getItem(key)) || null;
        } else if (sessionStorage && sessionStorage.getItem(key)) {
            return parse(sessionStorage.getItem(key)) || null;
        } else {
            return null;
        }
    },

    getToken(tokenKey = TOKEN_KEY) {
        return auth.get(tokenKey);
    },

    getUserInfo(userInfo = USER_INFO) {
        return auth.get(userInfo);
    },

    set(value, key, isLocalStorage) {
        // todo check if value empty
        if (isLocalStorage && localStorage) {
            return localStorage.setItem(key, stringify(value));
        }

        if (!isLocalStorage && sessionStorage) {
            return sessionStorage.setItem(key, stringify(value));
        }

        return null;
    },

    setToken(value = '', isLocalStorage = false,  tokenKey = TOKEN_KEY ) {
        return auth.set(value, tokenKey, isLocalStorage);
    },

    setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
        return auth.set(value, userInfo, isLocalStorage);
    }

};

export default auth;