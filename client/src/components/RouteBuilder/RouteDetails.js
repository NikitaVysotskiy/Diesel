import React, { Component } from 'react';
import {Divider, Dropdown, Segment, Statistic} from 'semantic-ui-react';


class RouteDetails extends Component {

    onRouteChange() {

    }

    render () {
        let distanceText = '0 KM';
        let durationText = '0 hours';
        let totalPrice = 0;
        let routes = [];
        let consumptionText = '0 liters';


        if (this.props.routeDetails) {

            const { directionsRes, fuelPrice, fuelConsumptions } = this.props.routeDetails;

            routes = directionsRes.routes.map((route, i) => ({key: i, value: i, text: `Route ${i}`}));

            const distance = directionsRes.routes[0].legs[0].distance;
            const distanceValue = distance.value / 1000;
            distanceText = distance.text;

            const duration = directionsRes.routes[0].legs[0].duration;
            durationText = duration.text;


            const averageSpeed = (distance.value / duration.value) * 3.6;
            console.log('avg speed', averageSpeed);

            let consumption = 0;  // 0 - city, 1 - highway, 2 - mixed (can be 0 or missing)
            if (distance < 85 || averageSpeed < 40) {
                consumption = parseFloat(fuelConsumptions[0]);
            } else if (distance > 50 && averageSpeed < 75) {
                consumption = parseFloat(fuelConsumptions[2] || (fuelConsumptions[0] + fuelConsumptions[1]) / 2);
            } else {
                consumption = parseFloat(fuelConsumptions[1]);
            }

            consumptionText = `${consumption} liters`;
            totalPrice = Math.round((consumption * distanceValue * fuelPrice) / 100);

            console.log(directionsRes);
            console.log(fuelPrice, distance, fuelConsumptions, consumption);
        }

        // TODO: back button
        return (
            <Segment inverted size='tiny'>
                <Dropdown placeholder='Select Route'
                          fluid
                          selection
                          options={routes}
                          onChange={this.onRouteChange}
                />
                <Divider horizontal inverted>Route details</Divider>
                <Statistic inverted size='tiny'>
                    <Statistic.Value>{distanceText}</Statistic.Value>
                    <Statistic.Label>Distance</Statistic.Label>
                </Statistic>
                <Divider/>
                <Statistic inverted size='tiny'>
                    <Statistic.Value>{durationText}</Statistic.Value>
                    <Statistic.Label>Duration</Statistic.Label>
                </Statistic>
                <Divider/>
                <Statistic inverted size='tiny'>
                    <Statistic.Value>{consumptionText}</Statistic.Value>
                    <Statistic.Label>Expected Fuel Consumption</Statistic.Label>
                </Statistic>
                <Divider/>
                <Statistic inverted size='tiny'>
                    <Statistic.Value>{totalPrice} UAH</Statistic.Value>
                    <Statistic.Label>Price</Statistic.Label>
                </Statistic>
                <Segment inverted>
                    <div ref={node => {this.props.setPanel(node)}}>

                    </div>
                </Segment>
            </Segment>
        )
    }

}


export default RouteDetails;