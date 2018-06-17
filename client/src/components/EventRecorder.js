import React, {Component} from 'react';
import {Button, Card, Form, Grid, Header, Icon, Image, Item, Label, Modal, Segment} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";


const fuelData = [
      {name: 'Jun 12', okko: 31.99, wog: 31.95, ukrNafta: 28, socar: 32},
      {name: 'Jun 13', okko: 31.99, wog: 31.95, ukrNafta: 28, socar: 32},
      {name: 'Jun 14', okko: 31.99, wog: 31.95, ukrNafta: 28, socar: 32},
      {name: 'Jun 15', okko: 31.99, wog: 31.95, ukrNafta: 28, socar: 32},
      {name: 'Jun 16', okko: 31.99, wog: 31.95, ukrNafta: 28, socar: 32},
      {name: 'Jun 17', okko: 31.99, wog: 31.95, ukrNafta: 28, socar: 32},
      {name: 'Jun 18', okko: 31.99, wog: 31.95, ukrNafta: 28, socar: 32},
];

const expenseData = [
      {name: 'Dec 2017', 'Subaru Legacy': 4000, 'VW Jetta': 2400},
      {name: 'Jan 2018', 'Subaru Legacy': 3000, 'VW Jetta': 1398},
      {name: 'Feb 2018', 'Subaru Legacy': 2000, 'VW Jetta': 9800},
      {name: 'Mar 2018', 'Subaru Legacy': 2780, 'VW Jetta': 3908},
      {name: 'Apr 2018', 'Subaru Legacy': 1890, 'VW Jetta': 4800},
      {name: 'May 2018', 'Subaru Legacy': 3400, 'VW Jetta': 2250},
      {name: 'Jun 2018', 'Subaru Legacy': 0, 'VW Jetta': 15650},
];


const Feed1 = props => (
    <Item.Group>
        <Item>
            <Item.Content>

                <Header as='h4'>Fueling</Header>
                <Item.Meta>
                    <Icon name='minus' color='red'/>
                    640 UAH
                </Item.Meta>
                <Item.Description>
                    Okko, 20 liters E95
                </Item.Description>
                <Item.Extra>17.05.2018</Item.Extra>
            </Item.Content>
        </Item>
        <br/>
        <Item>
            <Item.Content>

                <Header as='h4'>Other expenses</Header>
                <Item.Meta>
                    <Icon name='minus' color='red'/>
                    570 UAH
                </Item.Meta>
                <Item.Description>
                    Wiper blades
                </Item.Description>
                <Item.Extra>15.05.2018</Item.Extra>
            </Item.Content>
        </Item>
        <br/>
        <Item>
            <Item.Content>

                <Header as='h4'>Fueling</Header>
                <Item.Meta>
                    <Icon name='minus' color='red'/>
                    1420 UAH
                </Item.Meta>
                <Item.Description>
                    Wog, 40 liters E95+
                </Item.Description>
                <Item.Extra>30.04.2018</Item.Extra>
            </Item.Content>
        </Item>
        <br/>
    </Item.Group>
);

const Feed2 = props => (
    <Item.Group>
        <Item>
            <Item.Content>

                <Header as='h4'>Other expenses</Header>
                <Item.Meta>
                    <Icon name='minus' color='red'/>
                    1100 UAH
                </Item.Meta>
                <Item.Description>
                    Installation of additional equipment
                </Item.Description>
                <Item.Extra>14.06.2018</Item.Extra>
            </Item.Content>
        </Item>
        <br/>
        <Item>
            <Item.Content>
                <Header as='h4'>Service</Header>
                <Item.Meta>
                    <Icon name='minus' color='red'/>
                    11450 UAH
                </Item.Meta>
                <Item.Description>
                    Scheduled maintenance
                </Item.Description>
                <Item.Extra>14.06.2018</Item.Extra>
            </Item.Content>
        </Item>
        <br/>
        <Item>
            <Item.Content>

                <Header as='h4'>Fueling</Header>
                <Item.Meta>
                    <Icon name='minus' color='red'/>
                    1420 UAH
                </Item.Meta>
                <Item.Description>
                    Socar, 40 liters E95+
                </Item.Description>
                <Item.Extra>10.06.2018</Item.Extra>
            </Item.Content>
        </Item>
        <br/>
    </Item.Group>
);

const CarCard1 = props => (
    <Card>
        <Image src='http://www.zercustoms.com/news/images/Subaru/th1/Subaru-Legacy-20D-Saloon.jpg' />
        <Card.Content>
            <Card.Header>Subaru Legacy 2.0i</Card.Header>
            <Card.Meta>
                <span className='date'>2008 (142000 km)</span>
                <br/><br/>
                <Button icon labelPosition='left' inverted color='green' onClick={props.open}>
                    <Icon name='plus' />
                    Add event
                </Button>
                <br/><br/>
                <Icon name='calendar' />
                Last Events:
            </Card.Meta>
        </Card.Content>
        <Card.Content textAlign='left'>
            <Feed1 />
        </Card.Content>
        <Card.Content extra>
            <Icon name='angle double down' />
            Show more
        </Card.Content>
    </Card>
);

const CarCard2 = props => (
    <Card>
        <Image src='http://i.infocar.ua/i/12/3950/1400x936.jpg' />
        <Card.Content>
            <Card.Header>Volkswagen Jetta 1.4 TSI</Card.Header>
            <Card.Meta>
                <span className='date'>2014 (31000 km)</span>
                <br/><br/>
                <Button icon labelPosition='left' inverted color='green' onClick={props.open}>
                    <Icon name='plus' />
                    Add event
                </Button>
                <br/><br/>
                <Icon name='calendar' />
                Last Events:
            </Card.Meta>
        </Card.Content>
        <Card.Content textAlign='left'>
            <Feed2 />
        </Card.Content>
        <Card.Content extra>
            <Icon name='angle double down' />
            Show more
        </Card.Content>
    </Card>
);


const CarForm = props => (
    <Form>
        <Form.Group widths='equal'>
            <Form.Field>
                <Form.Select
                    label='Brand'
                    fluid
                    placeholder='Brand'
                    search
                    selection
                />
            </Form.Field>
            <Form.Field>
                <Form.Select
                    label='Model'
                    fluid
                    search
                    selection
                    placeholder='Model'
                />
            </Form.Field>
            <Form.Field>
                <Form.Select
                    label='Engine'
                    fluid
                    search
                    selection
                    placeholder='Engine'
                />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Button as='div' labelPosition='right'>
                <Button color='green'>
                    <Icon name='plus' />
                    Image
                </Button>
                <Label as='a' basic color='green' pointing='left'>
                    Add an image
                </Label>
            </Button>
        </Form.Group>
            <Header as='h5'>
                Fuel Consumption
            </Header>
        <Form.Group>
            <Form.Field>
                <input
                    placeholder='City'
                />
            </Form.Field>

            <Form.Field>
                <input
                    placeholder='Highway'
                />
            </Form.Field>

            <Form.Field>
                <Form.Input
                    placeholder='Mixed'
                />
            </Form.Field>
        </Form.Group>
        <br/>
        <Form.TextArea label='Description' placeholder='Provide some details...' />
    </Form>
);

const EventForm = props => (
    <Form>
        <Form.Group widths='equal'>
            <Form.Field>

                <Label>Event Type</Label>
                <Form.Select
                    fluid
                    placeholder='Type'
                    search
                    selection
                />
            </Form.Field>
            <Form.Field>
                <Label>Cost</Label>
                <input
                    placeholder='UAH'
                />
            </Form.Field>
            <Form.Field>
                <Label>Date</Label>
                <input
                    placeholder='Date'
                />
            </Form.Field>
        </Form.Group>
        <Form.TextArea label='Description' placeholder='Provide some details...' />
    </Form>
);


const CarFormModal = props => (
    <Modal dimmer={props.dimmer} open={props.open} onClose={props.close}>
        <Modal.Header>Register your car</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <p>After you fill up this form, you will be able
                    to create events describing activity connected to your car usage.</p>
            </Modal.Description>
        </Modal.Content>
        <Modal.Content>
            <CarForm />
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={props.close}>
                Cancel
            </Button>
            <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content="Submit"
                onClick={props.close}
            />
        </Modal.Actions>
    </Modal>
);


const CarEventModal = props => (
    <Modal dimmer={props.dimmer} open={props.open} onClose={props.close}>
        <Modal.Header>Add new event</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <p>Create event describing activity connected to your car usage.</p>
            </Modal.Description>
        </Modal.Content>
        <Modal.Content>
            <EventForm />
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={props.close}>
                Cancel
            </Button>
            <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content="Submit"
                onClick={props.close}
            />
        </Modal.Actions>
    </Modal>
);


class EventRecorder extends Component {
    state = { open1: false, open2: false, cars: [''] };

    show1 = dimmer => () => this.setState({ dimmer, open1: true });
    close1 = () => this.setState({ open1: false });

    show2 = dimmer => () => this.setState({ dimmer, open2: true });
    close2 = () => this.setState({ open2: false });

    render() {
        const { open1, open2, dimmer } = this.state;
        return (
            <Segment inverted>
                <CarFormModal show={this.show1}
                         close={this.close1}
                         open={open1}
                         dimmer={dimmer}
                />
                <CarEventModal show={this.show2}
                         close={this.close2}
                         open={open2}
                         dimmer={dimmer}
                />
                <Header as='h2' icon inverted>
                    Your cars:
                </Header>
                <Grid centered>
                    <Grid.Column width={8} textAlign='center'>
                        {(this.state.cars.length) ? (
                            <Grid.Row>
                                <Card.Group>
                                    <CarCard1 open={this.show2(true)}/>
                                    <CarCard2 open={this.show2(true)}/>
                                </Card.Group>
                            </Grid.Row>
                        ) : (
                            <div>
                                <Grid.Row>
                                    <Header as='h2' icon inverted>
                                        <Icon name='plus circle' />
                                        Add a car please
                                        <Header.Subheader> Please, register you car first to create events.</Header.Subheader>
                                    </Header>
                                </Grid.Row>

                            </div>
                        ) }
                        <br/>
                        <Grid.Row>
                            <Button icon labelPosition='left' inverted  onClick={this.show1(true)}>
                                <Icon name='plus' />
                                Add car
                            </Button>
                        </Grid.Row>

                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Header inverted>
                            E95 petrol price for last week (UAH)
                        </Header>

                        <LineChart width={500}
                                   height={300}
                                   data={fuelData}
                                   margin={{top: 5, right: 0, left: 0, bottom: 5}}
                        >
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="okko" stroke="#8884d8" />
                            <Line type="monotone" dataKey="wog" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="ukrNafta" stroke="#8984d8" />
                            <Line type="monotone" dataKey="socar" stroke="#8774d8" />
                        </LineChart>
                        No changes of fuel prices for the last week.

                        <br/>
                        <Header inverted>
                            Common expenses (UAH)
                        </Header>
                        <BarChart width={600} height={300} data={expenseData}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="Subaru Legacy" fill="#8884d8" />
                            <Bar dataKey="VW Jetta" fill="#82ca9d" />
                        </BarChart>

                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default EventRecorder;