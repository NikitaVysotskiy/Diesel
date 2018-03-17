import { ASYNC_START, LOGIN, LOGOUT, REGISTER, UPDATE_FIELD_AUTH } from "../constants/actionTypes";

export default (state={}, action) => {
    switch (action.type) {
        case ASYNC_START:
            if (action.subtype === LOGIN || action.subtype === REGISTER) {
                return {...state, inProgress: true}
            }
            break;
        case LOGIN:
            console.log(action);
            return {
                ...state,
                currentUser: action.payload ? action.payload.user : null,
                errors: action.error ? action.payload.errors : null,
                inProgress: false,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
            };
        case LOGOUT:
            return {...state, redirectTo: '/login', token: null, currentUser: null};
        case REGISTER:
            return {
                ...state,
                currentUser: action.payload ? action.payload.user : null,
                inProgress: false,
                errors: action.error ? action.payload.errors : null,
                token: action.error ? null : action.payload.user.token,
            };
        case UPDATE_FIELD_AUTH:
            return {...state, [action.key]: action.value };
        default:
            return state
    }
    return state;
};
