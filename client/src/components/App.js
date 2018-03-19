import { connect } from "react-redux";
import { push } from "react-router-redux";
import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import agent from "../agent";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import EventRecorder from "./EventRecorder";
import HeaderMenu from "./HeaderMenu";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import RouteBuilder from "./RouteBuilder/RouteBuilder";
import { store } from '../store';

const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo
    }
};


const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) => dispatch({ type: APP_LOAD,  payload, token, skipTracking: true}),
    onRedirect: () => dispatch({ type: REDIRECT })
});


class App extends Component {

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            console.log('token present redirect');
            agent.setToken(token);
            // TODO: redirect on '/'
            // store.dispatch(push('/route-builder'));
            // this.props.onRedirect();
        } else {
            store.dispatch(push('/login'));
            this.props.onRedirect();
        }

        this.props.onLoad(token ? agent.Auth.get() : null, token);
    }

    render() {
        if (this.props.appLoaded) {
            return (
                <div className="App">
                    <HeaderMenu currentUser={this.props.currentUser}/>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/route-builder" component={RouteBuilder} />
                        <Route path="/event-recorder" component={EventRecorder} />
                    </Switch>
                </div>
            );
        }
        return null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
