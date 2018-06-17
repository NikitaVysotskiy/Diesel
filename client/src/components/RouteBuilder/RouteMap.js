import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { ROUTE_RENDERED } from "../../constants/actionTypes";
import {connect} from "react-redux";


const mapDispatchToProps = dispatch => ({
    onRouteRender: payload => dispatch({ type: ROUTE_RENDERED, payload })
});


class RouteMap extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    renderRoute(origin, destination, fuelPrice=0, fuelConsumptions=0) {
        console.log(origin, destination);
        const request = {
            // origin, destination,
            origin: origin.geometry.location,
            destination: destination.geometry.location,
            travelMode: 'DRIVING',
            provideRouteAlternatives: true
        };

        this.directionsService.route(request, (res, status) => {
            if (status === 'OK') {
                console.log(res);
                this.directionsDisplay.setDirections(res);
                this.props.onRouteRender({
                    directionsRes: res,
                    fuelPrice,
                    fuelConsumptions,
                })

            } else {
                console.log('err', status);
            }
        });
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: {lat: 50.45, lng: 30.52},
                zoom: 6,
                gestureHandling: "cooperative",
                mapTypeId: 'terrain'
            });
            this.map = new maps.Map(node, mapConfig);

            this.directionsService = new maps.DirectionsService();
            this.directionsDisplay = new maps.DirectionsRenderer();

            this.directionsDisplay.setMap(this.map);
            this.directionsDisplay.setPanel(this.props.panel)
        }
    }

    render() {

        const style = {
            width: '73vw',
            height: '88vh'
        };

        return (
            <div ref="map" style={style}>

            </div>
        )
    }
}

export default connect(null, mapDispatchToProps, null, { withRef: true })(RouteMap);