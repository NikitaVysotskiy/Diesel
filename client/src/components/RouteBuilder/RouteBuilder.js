import { connect } from "react-redux";
import { GoogleApiWrapper } from 'google-maps-react'
import { Button, Grid, Segment, Sidebar } from "semantic-ui-react";
import React, { Component } from 'react';

import agent from "../../agent";
import { MAKE_SELECTED, MODEL_SELECTED, ROUTE_PAGE_LOADED, ROUTE_PAGE_UNLOADED } from "../../constants/actionTypes";
import RouteDetails from "./RouteDetails";
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
    state = {visible: true};
    toggleVisibility = () => {

        // this.setState({ visible: !this.state.visible })
         this.routeMap.getWrappedInstance().renderRoute(
             {lat: 50.45, lng: 30.52},
             {lat: 49.84, lng: 24.03},
             32.5,
             ["5.6", "6.1"]
         );
    };

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

    handleStationChange = (e, { value }) => {
        this.setState({
            fuelsOptions: this.props.fuelPrices
                            .filter(f => f.station === value)[0]
                            .fuels.map((fuel, i) => ({
                                key: i,
                                value: fuel.price,
                                text: `${fuel.fuel_kind} (${fuel.price} UAH)`
                            }))
        })
    };

    componentWillMount() {
        this.props.onLoad(Promise.all([
            agent.FuelData.prices(),
            agent.FuelData.stations(),
            agent.Makes.all(),
        ]))
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    submitRoute = (origin, destination, fuelPrice) => {
        const { fuelConsumptions } = this.state;

        this.routeMap.getWrappedInstance().renderRoute(origin, destination, fuelPrice, fuelConsumptions);
    };

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
            enginesOptions = this.props.engines.map((engineData, i) => ({
                key: i,
                value: engineData.engine,
                text: `${engineData.engine} (${engineData.fuel_type})`
            }));
        }

        let stationsOptions = [];
        if (this.props.stations) {
            stationsOptions = this.props.stations.map((station, i) => ({
                key: i,
                value: station,
                text: station
            }));
        }
        // -----

        const { fuelConsumptions, fuelsOptions, visible } = this.state || {};

        return (
            <Grid celled='internally'>
                <Grid.Row>

                    <Grid.Column width={4}>

                        <Sidebar.Pushable>

                            <Sidebar
                                as={Segment}
                                animation='overlay'
                                width='wide'
                                direction='left'
                                visible={visible || !!this.props.routeDetails}
                                icon='labeled'
                                vertical
                                inverted
                                style={{'width': '100%'}}
                            >
                                <RouteDetails routeDetails={this.props.routeDetails}/>
                            </Sidebar>

                            <Sidebar.Pusher>
                                <RouteForm makesOptions={makesOptions}
                                           modelsOptions={modelsOptions}
                                           enginesOptions={enginesOptions}
                                           stationsOptions={stationsOptions}
                                           fuelsOptions={fuelsOptions}
                                           handleMakeChange={this.handleMakeChange}
                                           handleModelChange={this.handleModelChange}
                                           handleEngineChange={this.handleEngineChange}
                                           handleStationChange={this.handleStationChange}
                                           fuelConsumptions={fuelConsumptions}
                                           google={this.props.google}
                                           submitRoute={this.submitRoute}
                                />


                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>

                    </Grid.Column>

                    <Grid.Column width={10}>
                        <RouteMap ref={node => {this.routeMap = node}} google={this.props.google}/>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBer7_UfqRnKcWke3WwnIElV300Z8NV8kU' // TODO: move
})(connect(mapStateToProps, mapDispatchToProps)(RouteBuilder));
