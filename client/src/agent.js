import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import { API_ROOT } from './constants/constants'

const superagent = superagentPromise(_superagent, global.Promise);

let token = null;
const setToken = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
};

const getResBody = res => res.body;

const requests = {
    get: url => superagent.get(`${API_ROOT}${url}`).use(setToken).then(getResBody),
    post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(setToken).then(getResBody),
    put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(setToken).then(getResBody),
    del: url => superagent.del(`${API_ROOT}${url}`).use(setToken).then(getResBody),
};

const Auth = {
    register: (username, email, password) => {
        console.log({user: {username, email, password}});
        return requests.post('/users', {user: {username, email, password}})
    },
    login: (email, password) => requests.post('/users/login', {user: {email, password}}),
    get: () => requests.get('/user')
};

const Models = {
    modelsForMake: make => requests.get(`/car/make/${make}/models`),
    enginesForModel: (make, submodel, years) =>
                     requests.get(`/car/make/${make}/models/engines?submodel=${submodel}&years=${years}`)
};

const Makes = {
    all: () => requests.get('/car/makes')
};


const FuelData = {
    prices: () => requests.get('/car/fuel-prices'),
    stations: () => requests.get('/car/gas-stations')
};

export default {
    Auth,
    FuelData,
    Makes,
    Models,
    setToken: _token => { token = _token; }
}
