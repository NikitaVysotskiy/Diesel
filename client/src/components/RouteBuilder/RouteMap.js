import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class RouteMap extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    renderRoute(origin, destination) {
        console.log(origin, destination);
        const request = {
            origin: origin.geometry.location,
            destination: destination.geometry.location,
            travelMode: 'DRIVING',
            provideRouteAlternatives: true
        };

        this.directionsService.route(request, (res, status) => {
            if (status === 'OK') {
                console.log(res);
                this.directionsDisplay.setDirections(res)
            } else {
                console.log('err', status);
            }
        })
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: {lat: 0, lng: 180},
                zoom: 2,
                gestureHandling: "cooperative",
                mapTypeId: 'terrain'
            });
            this.map = new maps.Map(node, mapConfig);

            this.directionsService = new maps.DirectionsService();
            this.directionsDisplay = new maps.DirectionsRenderer();
            this.directionsDisplay.setMap(this.map);
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

export default RouteMap;