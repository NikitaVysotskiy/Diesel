import React, { Component } from 'react';
import {Button, Divider, Form, Header, Icon, Segment, Statistic} from "semantic-ui-react";


class RouteForm extends Component {
    render() {
        console.log('form', this.props.makeOptions);
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
                            // options={['Lol']}
                            placeholder='Model'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Select
                            fluid
                            search
                            selection
                            // options={['Lol']}
                            placeholder='Engine'
                        />
                    </Form.Field>
                </Form>
                <Segment inverted>
                    <Header as="h3" color="grey" textAlign="center" content={'Fuel Consumption:'} />
                    <Statistic size="mini" inverted>
                        <Statistic.Value>10.6</Statistic.Value>
                        <Statistic.Label>City</Statistic.Label>
                    </Statistic>

                    <Statistic size="mini" inverted>
                        <Statistic.Value>10.6</Statistic.Value>
                        <Statistic.Label>Highway</Statistic.Label>
                    </Statistic>

                    <Statistic size="mini" inverted>
                        <Statistic.Value>10.6</Statistic.Value>
                        <Statistic.Label>Mixed</Statistic.Label>
                    </Statistic>
                </Segment>
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