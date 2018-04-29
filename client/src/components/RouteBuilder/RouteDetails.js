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
            </div>
        )
    }

}


export default RouteDetails;