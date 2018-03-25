import React, { Component } from 'react';
import {Button, Divider, Form, Header, Icon, Segment, Statistic} from "semantic-ui-react";


class RouteForm extends Component {
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
                        <Form.Input
                            fluid
                            placeholder='From'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            fluid
                            placeholder='To'
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
                        <Form.Input
                            fluid
                            placeholder='Gas station'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            fluid
                            placeholder='Fuel'
                        />
                    </Form.Field>
                </Form>
                <Segment inverted>
                    <Button primary>
                        Build a route
                    </Button>
                </Segment>
            </Segment>
        )
    }
}

export default RouteForm;