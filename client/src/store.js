import { applyMiddleware, createStore } from "redux";
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux'

import { localStorageMiddleware, promiseMiddleware } from "./middleware";
import reducer from './reducers/index'

export const history = createHistory();
export const store = createStore(
    reducer,
    applyMiddleware(
        routerMiddleware(history),
        promiseMiddleware,
        localStorageMiddleware
    )
);
