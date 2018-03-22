import { ROUTE_PAGE_LOADED, ROUTE_PAGE_UNLOADED } from "../constants/actionTypes";

export default (state={}, action) => {
    switch (action.type) {
        case ROUTE_PAGE_LOADED:
            return {
                ...state,
                makes: action.payload.makes
            };
        case ROUTE_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};
