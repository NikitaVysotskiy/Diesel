import { ASYNC_START, LOGIN, UPDATE_FIELD_AUTH } from "../constants/actionTypes";

export default (state={}, action) => {
    switch (action.type) {
        case ASYNC_START:
            if (action.subtype === LOGIN) {
                return {...state, inProgress: true}
            }
        case LOGIN:
        case UPDATE_FIELD_AUTH:
            return {...state, [action.key]: action.value };
        default:
            return state
    }
};
