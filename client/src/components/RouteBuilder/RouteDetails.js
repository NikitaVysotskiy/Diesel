import React, { Component } from 'react';
import { Dropdown, Statistic } from 'semantic-ui-react';


class RouteDetails extends Component {

    onRouteChange() {

    }

    render () {
        let distanceText = '0 KM';
        let durationText = '0 hours';
        let totalPrice = 0;
        let routes = [];


        if (this.props.routeDetails) {

            const { directionsRes, fuelPrice, fuelConsumptions } = this.props.routeDetails;

            routes = directionsRes.routes.map((route, i) => ({key: i, value: i, text: `Route ${i}`}));

            const distance = directionsRes.routes[0].legs[0].distance;
            const distanceValue = distance.value / 1000;
            distanceText = distance.text;

            const duration = directionsRes.routes[0].legs[0].duration;
            durationText = duration.text;


            const consumption = parseFloat(fuelConsumptions[0]);  // TODO: consider different consumptions

            totalPrice = Math.round((consumption * distanceValue * fuelPrice) / 100);

            console.log(directionsRes);
            console.log(fuelPrice, distance, fuelConsumptions);
        }

        // TODO: back button
        return (
            <div>
                <Dropdown placeholder='Select Route'
                          fluid
                          selection
                          options={routes}
                          onChange={this.onRouteChange}
                />

                <Statistic inverted>
                    <Statistic.Value>{distanceText}</Statistic.Value>
                    <Statistic.Label>Distance</Statistic.Label>
                </Statistic>
                <Statistic inverted>
                    <Statistic.Value>{durationText}</Statistic.Value>
                    <Statistic.Label>Duration</Statistic.Label>
                </Statistic>
                <Statistic inverted>
                    <Statistic.Value>{totalPrice} UAH</Statistic.Value>
                    <Statistic.Label>Price</Statistic.Label>
                </Statistic>
            </div>
        )
    }

}


export default RouteDetails;