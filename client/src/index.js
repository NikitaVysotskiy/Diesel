import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from "react-router-dom";

import App from './components/App';
import { history, store } from './store'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
