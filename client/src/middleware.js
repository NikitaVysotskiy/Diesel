import agent from './agent'
import { ASYNC_START, ASYNC_END, LOGIN, LOGOUT, REGISTER } from "./constants/actionTypes";

const isPromise = v => v && typeof v.then === 'function';

export const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        action.payload.then(
            res => {
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            },
            err => {
                console.log('ERROR', err);
                action.error = true;
                action.payload = err.response.body;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

export const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
        if (!action.error) {
            window.localStorage.setItem('jwt', action.payload.user.token);
            agent.setToken(action.payload.user.token);
        }
    } else if (action.type === LOGOUT) {
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
    }

    next(action);
};