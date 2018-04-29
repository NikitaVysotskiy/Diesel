import {
    MAKE_SELECTED,
    MODEL_SELECTED,
    ROUTE_PAGE_LOADED,
    ROUTE_PAGE_UNLOADED,
    ROUTE_RENDERED
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
        case ROUTE_RENDERED:
            console.log(action.payload);
            return {
                ...state,
                routeDetails: action.payload
            };
        default:
            return state;
    }
};
