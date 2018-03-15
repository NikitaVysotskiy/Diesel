import { LOGIN, UPDATE_FIELD_AUTH } from "../constants/actionTypes";

export default (state={}, action) => {
    switch (action.type) {
        case LOGIN:
        case UPDATE_FIELD_AUTH:
            return {...state, [action.key]: action.value };
        default:
            return state
    }
};
