import { Button, Form, Icon, Header, Modal, Segment } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from 'react';

import agent from "../../agent";
import { REGISTER, UPDATE_FIELD_AUTH } from "../../constants/actionTypes";

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
    onUpdateField: (key, value) => dispatch({ type: UPDATE_FIELD_AUTH, key, value }),
    onSubmit: (username, email, password) =>
              dispatch({ type: REGISTER, payload: agent.Auth.register(username, email, password) })
});

const RegisterForm = props => (
    <Segment inverted>
        <Form inverted>
            <Form.Field>
                <Form.Input
                    fluid
                    icon='user circle'
                    iconPosition='left'
                    placeholder='Username'
                    value={props.username || ''}
                    onChange={props.changeUsername}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='Email'
                    value={props.email || ''}
                    onChange={props.changeEmail}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    fluid
                    icon='unlock alternate'
                    iconPosition='left'
                    onChange={props.changePassword}
                    placeholder='Password'
                    type='password'
                    value={props.password || ''}
                />
            </Form.Field>
        </Form>
    </Segment>
);

class RegisterModal extends React.Component {

    constructor(props) {
        super(props);

        const updateFieldEvent = key => ev => {
            this.props.onUpdateField(key, ev.target.value);
        };

        this.changeUsername = updateFieldEvent('username');
        this.changeEmail = updateFieldEvent('email');
        this.changePassword = updateFieldEvent('password');

        this.submitForm = (username, email, password) => ev => {
            ev.preventDefault();
            console.log(password);
            this.props.onSubmit(username, email, password);
            // this.props.onClose()
        }

    }

    render() {
        const username = this.props.username;
        const email = this.props.email;
        const password = this.props.password;

        return (
            <Modal open={this.props.open} basic size='small'>
                <Header as="h1" inverted color="grey" textAlign="center" content={'Welcome to Diesel'} />
                <Header icon='add user' content={'Sign Up'} />
                <Modal.Content>
                    <RegisterForm
                        username={username}
                        email={email}
                        password={password}
                        changeUsername={this.changeUsername}
                        changeEmail={this.changeEmail}
                        changePassword={this.changePassword}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Link to="/login" className="nav-link">
                        <Button
                            color='black'
                            inverted
                        >
                            <Icon name='sign in' /> Have an account?
                        </Button>
                    </Link>
                    <Button
                        color='green'
                        inverted
                        onClick={this.submitForm(username, email, password)}
                    >
                        <Icon name='add user' /> Sign Up
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
