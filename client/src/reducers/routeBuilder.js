import {
    MAKE_SELECTED,
    MODEL_SELECTED,
    ROUTE_PAGE_LOADED,
    ROUTE_PAGE_UNLOADED
} from "../constants/actionTypes";

export default (state={}, action) => {
    switch (action.type) {
        case MAKE_SELECTED:
            return {
                ...state,
                engines: [],
                models: action.payload.models
            };
        case MODEL_SELECTED:
            return {
                ...state,
                engines: action.payload.engines
            };
        case ROUTE_PAGE_LOADED:
            return {
                ...state,
                fuelPrices: action.payload[0].fuelPrices,
                stations: action.payload[1].stations,
                makes: action.payload[2].makes,
            };
        case ROUTE_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};
