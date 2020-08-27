import { ACCESS_TOKEN } from "../../constants";

const initialState = {};

export default function logoutCurrentUser(state = initialState, action) {
    if (action.type === 'LOGOUT_CURRENT_USER') {
        localStorage.removeItem(ACCESS_TOKEN);
        return state;
    }
    return state;
}