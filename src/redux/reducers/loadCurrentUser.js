const initialState = {};

export default function loadCurrentUser(state = initialState, action) {
    if (action.type === 'LOAD_CURRENT_USER') {
        return [
            ...state,
            action.currentUser
        ];
    }
    return state;
} 