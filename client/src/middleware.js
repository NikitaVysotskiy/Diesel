import agent from './agent'
import { LOGIN } from "./constants/actionTypes";

export const localStorageMiddleware = store => next => action => {
    if (action.type === LOGIN) {
        if (!action.error) {
            console.log(action.payload);
            window.localStorage.setItem('jwt', action.payload.user.token);
            agent.setToken(action.payload.user.token);  // TODO: ???
        }
    }
    next(action);
};