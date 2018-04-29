import React, { Component } from 'react';
import { Statistic } from 'semantic-ui-react';


class RouteDetails extends Component {


    render () {
        return (
            <div>
                <Statistic size="mini" inverted>
                    <Statistic.Value>2500 UAH</Statistic.Value>
                    <Statistic.Label>PRICE</Statistic.Label>
                </Statistic>
                {this.props.routeDetails && this.props.routeDetails.directionsRes.routes[0].legs[0].distance.text}
            </div>
        )
    }

}


export default RouteDetails;