import React from 'react';
import { connect } from "react-redux";
import { Button, Form, Icon, Header, Modal, Segment } from 'semantic-ui-react';

import agent from "../agent";
import { LOGIN, UPDATE_FIELD_AUTH } from "../constants/actionTypes";

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
    onUpdateField: (key, value) => dispatch({ type: UPDATE_FIELD_AUTH, key, value }),
    onSubmit: (email, password) => dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) })
});

const LoginForm = props => (
    <Segment inverted>
        <Form inverted>
            <Form.Field>
                <Form.Input
                    fluid
                    icon='user circle'
                    iconPosition='left'
                    placeholder='Email'
                    onChange={props.changeEmail}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    fluid
                    icon='unlock alternate'
                    iconPosition='left'
                    placeholder='Password'
                    onChange={props.changePassword}
                />
            </Form.Field>
        </Form>
    </Segment>
);

class LoginModal extends React.Component {

    constructor(props) {
        super(props);

        const updateFieldEvent = key => ev => {
            console.log(key, ev.target.value);
            this.props.onUpdateField(key, ev.target.value);
        };

        this.changeEmail = updateFieldEvent('email');
        this.changePassword = updateFieldEvent('password');

        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
            this.props.onClose()
        }

    }

    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose} basic size='small'>
                <Header icon='sign in' content={'Sign In'} />
                <Modal.Content>
                    <LoginForm
                        changeEmail={this.changeEmail}
                        changePassword={this.changePassword}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        color='red'
                        inverted
                        onClick={this.props.onClose}
                    >
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button
                        color='green'
                        inverted
                        onClick={this.submitForm}
                    >
                        <Icon name='checkmark' /> Sign In
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
