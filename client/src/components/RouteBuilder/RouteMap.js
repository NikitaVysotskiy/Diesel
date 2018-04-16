import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class RouteMap extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
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

            const directionsService = new maps.DirectionsService();
            const directionsDisplay = new maps.DirectionsRenderer();
            directionsDisplay.setMap(this.map);

            const request = {
                origin: 'kiyv',
                destination: 'lviv',
                travelMode: 'DRIVING',
                provideRouteAlternatives: true
            };
            directionsService.route(request, (res, status) => {
                if (status === 'OK') {
                    console.log(res);
                    directionsDisplay.setDirections(res)
                } else {
                    console.log('err', status);
                }
            })
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