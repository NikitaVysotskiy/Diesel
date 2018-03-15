import agent from './agent'
import { LOGIN } from "./constants/actionTypes";

export const localStorageMiddleware = store => next => action => {
    if (action.type === LOGIN) {
        if (!action.error) {
            window.localStorage.setItem('jwt', action.payload.token);
            agent.setToken(action.payload.token);
        }
    }
    next(action);
};