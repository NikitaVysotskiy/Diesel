import React, { Component } from 'react';

import { GoogleApiWrapper } from 'google-maps-react'
import RouteMap from "./RouteMap";


class RouteBuilder extends Component {
    render() {
        return (
            <RouteMap google={this.props.google}/>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBer7_UfqRnKcWke3WwnIElV300Z8NV8kU'
})(RouteBuilder);