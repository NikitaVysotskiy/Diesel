import { combineReducers } from "redux";

import auth from './auth'
import common from './common'
import routeBuilder from "./routeBuilder";

export default combineReducers({
    auth,
    common,
    routeBuilder
});
