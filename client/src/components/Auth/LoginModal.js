import { connect } from "react-redux";
import { Button, Form, Icon, Header, Modal, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import React from 'react';

import agent from "../../agent";
import { LOGIN, REDIRECT, UPDATE_FIELD_AUTH } from "../../constants/actionTypes";
import { store } from "../../store"

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
    onUpdateField: (key, value) => dispatch({ type: UPDATE_FIELD_AUTH, key, value }),
    onSubmit: (email, password) => dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
    onRedirect: () => dispatch({ type: REDIRECT })
});

const LoginForm = props => (
    <Segment inverted>
        <Form inverted>
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

class LoginModal extends React.Component {

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if (nextProps.redirectTo) {
            console.log('redirect', nextProps.redirectTo);
            store.dispatch(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    }

    constructor(props) {
        super(props);

        const updateFieldEvent = key => ev => {
            this.props.onUpdateField(key, ev.target.value);
        };

        this.changeEmail = updateFieldEvent('email');
        this.changePassword = updateFieldEvent('password');

        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
        }
    }


    render() {
        const email = this.props.email;
        const password = this.props.password;

        return (
            <Modal open={this.props.open} basic size='small'>
                <Header as="h1" inverted color="grey" textAlign="center" content={'Welcome to Diesel'} />
                <Header icon='sign in' content={'Sign In'} />
                <Modal.Content>
                    <LoginForm
                        email={email}
                        password={password}
                        changeEmail={this.changeEmail}
                        changePassword={this.changePassword}
                    />
                </Modal.Content>

                <Modal.Actions >
                    <Link to="/register" className="nav-link">
                        <Button
                            color='black'
                            inverted
                        >
                            <Icon name='add user' /> Need an account?
                        </Button>
                    </Link>
                    <Button
                        color='green'
                        inverted
                        onClick={this.submitForm(email, password)}
                    >
                        <Icon name='checkmark' /> Sign In
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
