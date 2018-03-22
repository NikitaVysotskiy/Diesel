import { connect } from "react-redux";
import { GoogleApiWrapper } from 'google-maps-react'
import { Grid } from "semantic-ui-react";
import React, { Component } from 'react';

import agent from "../../agent";
import RouteForm from "./RouteForm";
import RouteMap from "./RouteMap";
import { ROUTE_PAGE_LOADED, ROUTE_PAGE_UNLOADED } from "../../constants/actionTypes";


const mapStateToProps = state => ({
    ...state.routeBuilder,
    token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: ROUTE_PAGE_LOADED, payload }),
    onUnload: () => dispatch({ type: ROUTE_PAGE_UNLOADED })
});


class RouteBuilder extends Component {

    componentWillMount() {

        this.props.onLoad(agent.Makes.all())
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        let makeOptions = [];
        if (this.props.makes) {
            makeOptions = this.props.makes.map((make, i) => ({key: i, value: make, text: make}));
        }

        return (
            <Grid celled='internally'>
                <Grid.Row>

                    <Grid.Column width={4}>
                        <RouteForm makeOptions={makeOptions}/>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <RouteMap google={this.props.google}/>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBer7_UfqRnKcWke3WwnIElV300Z8NV8kU' // TODO: move
})(connect(mapStateToProps, mapDispatchToProps)(RouteBuilder));
