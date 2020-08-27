import { combineReducers } from 'redux';
import loadCurrentUser from './loadCurrentUser';
import logoutCurrentUser from './logoutCurrentUser';
import auth from './auth';

export default combineReducers(
    {
        auth,
        loadCurrentUser,
        logoutCurrentUser
    }
)