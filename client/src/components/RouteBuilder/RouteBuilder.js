import { connect } from "react-redux";
import { GoogleApiWrapper } from 'google-maps-react'
import { Grid } from "semantic-ui-react";
import React, { Component } from 'react';

import agent from "../../agent";
import { MAKE_SELECTED, MODEL_SELECTED, ROUTE_PAGE_LOADED, ROUTE_PAGE_UNLOADED } from "../../constants/actionTypes";
import RouteForm from "./RouteForm";
import RouteMap from "./RouteMap";

const Promise = global.Promise;

const mapStateToProps = state => ({
    ...state.routeBuilder,
    token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: ROUTE_PAGE_LOADED, payload }),
    onMakeChange: payload => dispatch({ type: MAKE_SELECTED, payload }),
    onModelChange: payload => dispatch({ type: MODEL_SELECTED, payload }),
    onUnload: () => dispatch({ type: ROUTE_PAGE_UNLOADED })
});


class RouteBuilder extends Component {

    handleMakeChange = (e, { value }) => {
        this.setState({ make: value, fuelConsumptions: [] });
        this.props.onMakeChange(agent.Models.modelsForMake(value.toLowerCase()))
    };

    handleModelChange = (e, { value }) => {
        this.setState({ fuelConsumptions: [] });
        const { submodel, years } = JSON.parse(value);
        this.props.onModelChange(agent.Models.enginesForModel(this.state.make, submodel, years))
    };

    handleEngineChange = (e, { value }) => {
        this.setState({
            fuelConsumptions: this.props.engines.filter(
                engineData => engineData.engine === value
            )[0].fuel_consumptions.split(' ')
        });
    };

    componentWillMount() {
        this.props.onLoad(Promise.all([agent.FuelPrices.all(), agent.Makes.all(), ]))
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        // TODO: refactor
        let makesOptions = [];
        if (this.props.makes) {
            makesOptions = this.props.makes.map((make, i) => ({key: i, value: make, text: make}));
        }

        let modelsOptions = [];
        if (this.props.models) {
            modelsOptions = this.props.models.map((model, i) => ({
                key: i,
                value: JSON.stringify(model),
                text: `${model.submodel} (${model.years})`
            }));
        }

        let enginesOptions = [];
        if (this.props.engines) {
            enginesOptions = this.props.engines.map(
                (engineData, i) => ({
                    key: i,
                    value: engineData.engine,
                    text: `${engineData.engine} (${engineData.fuel_type})`
                })
            );
        }
        // -----

        const { fuelConsumptions } = this.state || {};
        return (
            <Grid celled='internally'>
                <Grid.Row>

                    <Grid.Column width={4}>
                        <RouteForm makesOptions={makesOptions}
                                   modelsOptions={modelsOptions}
                                   enginesOptions={enginesOptions}
                                   handleMakeChange={this.handleMakeChange}
                                   handleModelChange={this.handleModelChange}
                                   handleEngineChange={this.handleEngineChange}
                                   fuelConsumptions={fuelConsumptions}
                        />
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
