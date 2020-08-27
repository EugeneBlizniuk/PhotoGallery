import { 
    getCurrentUser,
    login,
    signup
} from './../../util/APIUtils';
import auth from '../../user/auth/auth'; 
import { notification } from 'antd';

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
export const LOAD_CURRENT_USER_SUCCESS = 'LOAD_CURRENT_USER_SUCCESS';
export const LOAD_CURRENT_USER_FAIL = 'LOAD_CURRENT_USER_FAIL';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const SIGN_UP = 'SIGH_UP';
export const SIGN_UP_FAIL = 'SIGH_UP_FAIL';

export const LOGOUT = 'LOGOUT';

export function _getCurrentUser() {
    return async dispatch => {
        dispatch({ type: LOAD_CURRENT_USER });
        
        try {
            const response = await getCurrentUser();
            dispatch(
                {
                    type: LOAD_CURRENT_USER_SUCCESS,
                    currentUser: response
                }
            );
        } catch(err) {
            dispatch(
                {
                    type: LOAD_CURRENT_USER_FAIL
                }
            );
        }
    };
}

export function _login(loginRequest) {
    return async dispatch => {
        dispatch({ type: LOGIN });
        
        try {
            const response = await login(loginRequest);
            auth.setToken(response.accessToken, true);
            dispatch(_getCurrentUser());

            notification.success({
                message: 'Photo Gallery App',
                description: "Wow! You're logged in right now!",
            });
        } catch (error) {
            if(error.status === 401) {
                notification.error({
                    message: 'Photo Gallery App',
                    description: 'Your Username or Password is incorrect. Please try again!'
                });                    
            } else {
                notification.error({
                    message: 'Photo Gallery App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });                                            
            }

            dispatch({ type: LOGIN_FAIL });
        }
    };
}

export function _signup(signupRequest) {
    return async dispatch => {
        dispatch({ type: SIGN_UP });

        try {
            const response = await signup(signupRequest);
            auth.setToken(response.accessToken, true);
            dispatch(getCurrentUser());
        } catch (error) {
            dispatch({ type: SIGN_UP_FAIL });
        }
    };
}

export function _logout() {
    auth.removeToken();

    return async dispatch => {
        dispatch({ type: LOGOUT });
    };
}