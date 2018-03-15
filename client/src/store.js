import { applyMiddleware, createStore } from "redux";

import { localStorageMiddleware } from "./middleware";
import reducer from './reducers/index'

export default createStore(reducer, applyMiddleware(localStorageMiddleware));
