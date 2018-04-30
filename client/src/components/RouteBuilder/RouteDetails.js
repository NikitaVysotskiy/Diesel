import React, { Component } from 'react';
import { Statistic } from 'semantic-ui-react';


class RouteDetails extends Component {


    render () {
        let distanceText = '0 KM';
        let totalPrice = 0;


        if (this.props.routeDetails) {

            const { directionsRes, fuelPrice, fuelConsumptions } = this.props.routeDetails;
            const distance = directionsRes.routes[0].legs[0].distance;
            const distanceValue = distance.value / 1000;
            distanceText = distance.text;

            const consumption = parseFloat(fuelConsumptions[0]);  // TODO: consider different consumptions

            totalPrice = Math.round((consumption * distanceValue * fuelPrice) / 100);

            console.log(directionsRes);
            console.log(fuelPrice, distance, fuelConsumptions);
        }


        return (
            <div>
                <Statistic inverted>
                    <Statistic.Value>{distanceText}</Statistic.Value>
                    <Statistic.Label>Distance</Statistic.Label>
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