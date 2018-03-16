import { ASYNC_START, LOGIN, UPDATE_FIELD_AUTH } from "../constants/actionTypes";

export default (state={}, action) => {
    switch (action.type) {
        case ASYNC_START:
            if (action.subtype === LOGIN) {
                return {...state, inProgress: true}
            }
            break;
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload ? action.payload.user : null,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case UPDATE_FIELD_AUTH:
            return {...state, [action.key]: action.value };
        default:
            return state
    }
    return state;
};
