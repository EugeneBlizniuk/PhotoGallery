import { auth as initialState } from '../initialState';
import { 
    LOAD_CURRENT_USER, 
    LOAD_CURRENT_USER_SUCCESS, 
    LOAD_CURRENT_USER_FAIL, 
    LOGIN_FAIL, 
    SIGN_UP_FAIL,
    LOGOUT
} from '../actions/auth';

export default function(state = initialState, action) {

    switch(action.type) {
        case LOAD_CURRENT_USER:
            return {
                ...initialState,
                isLoading: true
            };

        case LOAD_CURRENT_USER_SUCCESS:
            return {
                ...initialState,
                currentUser: action.currentUser,
                isAuthenticated: true,
                isLoading: false
            };
        
        case LOAD_CURRENT_USER_FAIL:
            return {
                ...initialState,
                isAuthenticated: false,
                isLoading: false
            };
        
        case LOGOUT: 
            return {
                ...initialState,
                currentUser: null,
                isAuthenticated: false,
                isLoading: false
            }
        
        case LOGIN_FAIL:
        case SIGN_UP_FAIL:
            return {
                ...initialState,
                isAuthenticated: false,
                isLoading: false
            };

        default:
            return state;
    }

}