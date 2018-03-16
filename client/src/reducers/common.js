import { APP_LOAD } from "../constants/actionTypes";

const initState = {
    token: null
};

export default (state=initState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                appLoaded: true,
                token: action.token || null,
                currentUser: action.payload ? action.payload.user : null
            };
        default:
            return state
    }
};
