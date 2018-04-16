import React, { Component } from 'react';
import {Button, Divider, Form, Header, Icon, Input, Segment, Statistic} from "semantic-ui-react";
import ReactDOM from "react-dom";


class RouteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {origin: '', destination: ''}
    }

    getInputRef = type => node => {type === 'origin' ? this._originInput = node : this._routeInput = node};

    buildRoute = () => {
        const { origin, destination } = this.state;
        if (origin && destination) {
            this.props.renderRoute(origin, destination);
        }
    };

    loadAutocomplete() {
        if (this.props.google) {
            // TODO: handle multiple inputs
            const node1 = ReactDOM.findDOMNode(this._originInput.inputRef);
            const node2 = ReactDOM.findDOMNode(this._routeInput.inputRef);

            const originAutocomplete = new this.props.google.maps.places.Autocomplete(node1);
            originAutocomplete.addListener('place_changed', () => {
                const origin = originAutocomplete.getPlace();
                this.setState({origin: origin});
            });

            const destinationAutocomplete = new this.props.google.maps.places.Autocomplete(node2);
            destinationAutocomplete.addListener('place_changed', () => {
                const destination = destinationAutocomplete.getPlace();
                this.setState({destination: destination});
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.google !== this.props.google) {
            this.loadAutocomplete();
        }
    }

    renderFuelConsumptions(arr) {
        const labels = ['City', 'Highway', 'Mixed'];
        if (arr) {
            if (arr.length === 3 && arr[2] === "0") {
                arr = arr.slice(0, 2)
            }
            return (
                <Segment inverted>
                    <Header as="h3" color="grey" textAlign="center" content={'Fuel Consumption:'}/>
                    {arr.map((consumption, i) => (
                        <Statistic size="mini" inverted key={i}>
                            <Statistic.Value>{consumption}</Statistic.Value>
                            <Statistic.Label>{labels[i]}</Statistic.Label>
                        </Statistic>
                    ))}
                </Segment>
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <Segment inverted>
                <Form inverted>
                    <Header as="h1" inverted textAlign="center" content={'Build a Route'} />
                    <Form.Field>
                        <Header as="h3" color="grey" textAlign="center" content={'Select your car:'} />
                        <Form.Select
                            fluid
                            onChange={this.props.handleMakeChange}
                            options={this.props.makesOptions}
                            placeholder='Brand'
                            search
                            selection
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Select
                            fluid
                            search
                            selection
                            onChange={this.props.handleModelChange}
                            options={this.props.modelsOptions}
                            placeholder='Model'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Select
                            fluid
                            search
                            selection
                            onChange={this.props.handleEngineChange}
                            options={this.props.enginesOptions}
                            placeholder='Engine'
                        />
                    </Form.Field>
                </Form>
                {this.renderFuelConsumptions(this.props.fuelConsumptions)}
                <Divider />
                <Form inverted>
                    <Form.Field>
                        <Header as="h3" color="grey" textAlign="center" content={'Route:'} />
                        <Input
                            fluid
                            onChange={this.props.onRouteInputUpdate}
                            placeholder='From'
                            ref={this.getInputRef('origin')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            onChange={this.props.onRouteInputUpdate}
                            placeholder='To'
                            ref={this.getInputRef()}
                        />
                    </Form.Field>
                    <Button icon secondary labelPosition='left'>
                        <Icon name='plus' />Add a destination point
                    </Button>
                </Form>
                <Divider />
                <Form inverted>
                    <Form.Field>
                        <Header as="h3" color="grey" textAlign="center" content={'Gas Station:'} />
                        <Form.Select
                            fluid
                            onChange={this.props.handleStationChange}
                            options={this.props.stationsOptions}
                            selection
                            placeholder='Gas station'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Select
                            fluid
                            options={this.props.fuelsOptions || []}
                            selection
                            placeholder='Fuel'
                        />
                    </Form.Field>
                </Form>
                <Segment inverted>
                    <Button primary onClick={this.buildRoute}>
                        Build a route
                    </Button>
                </Segment>
            </Segment>
        )
    }
}

export default RouteForm;