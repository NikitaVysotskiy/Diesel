import { connect } from "react-redux";
import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import agent from "../agent";
import { APP_LOAD } from "../constants/actionTypes";
// import EventRecorder from "./EventRecorder";
import HeaderMenu from "./HeaderMenu";
import Login from "./Auth/Login";
// import LoginRequiredContainer from "./Auth/LoginRequiredContainer";
import Register from "./Auth/Register";
// import RouteBuilder from "./RouteBuilder";


const mapStateToProps = state => {
    // console.log(state);

    return {
        currentUser: state.auth.currentUser
    }
};


const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) => dispatch({ type: APP_LOAD,  payload, token})
});


class App extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }

        this.props.onLoad(token ? agent.Auth.get() : null, token);
        console.log(this.props.currentUser, token)

    }

    render() {
        return (
            <div className="App">
                <HeaderMenu />
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    {/*<Route component={LoginRequiredContainer}>*/}
                        {/*<Route path="/route-builder" component={RouteBuilder}/>*/}
                        {/*<Route path="/event-recorder" component={EventRecorder}/>*/}
                    {/*</Route>*/}
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
