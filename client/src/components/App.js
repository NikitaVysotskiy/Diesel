import { connect } from "react-redux";
import { push } from "react-router-redux";
import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import agent from "../agent";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import HeaderMenu from "./HeaderMenu";
import Login from "./Auth/Login";
import LoginRequiredContainer from "./Auth/LoginRequiredContainer";
import Register from "./Auth/Register";
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
            agent.setToken(token);
        } else {
            store.dispatch(push('/login'));
            this.props.onRedirect();
        }

        this.props.onLoad(token ? agent.Auth.get() : null, token);
    }

    render() {
        if (this.props.appLoaded) {
            console.log(this.props.currentUser);
            return (
                <div className="App">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <LoginRequiredContainer>
                            <HeaderMenu currentUser={this.props.currentUser}/>
                            {/*<Route path="/route-builder" component={RouteBuilder}/>*/}
                            {/*<Route path="/event-recorder" component={EventRecorder}/>*/}
                        </LoginRequiredContainer>
                    </Switch>
                </div>
            );
        }
        return null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
