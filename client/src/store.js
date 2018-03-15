import { applyMiddleware, createStore } from "redux";

import { localStorageMiddleware, promiseMiddleware } from "./middleware";
import reducer from './reducers/index'

export default createStore(reducer, applyMiddleware(promiseMiddleware, localStorageMiddleware));
