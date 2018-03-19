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