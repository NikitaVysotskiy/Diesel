import React from 'react';
import { Button, Form, Icon, Header, Modal, Segment } from 'semantic-ui-react'

const LoginForm = props => (
    <Segment inverted>
        <Form inverted>
            <Form.Field>
                <Form.Input
                    fluid
                    icon='user circle'
                    iconPosition='left'
                    placeholder='Email'
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    fluid
                    icon='unlock alternate'
                    iconPosition='left'
                    placeholder='Password'
                />
            </Form.Field>
        </Form>
    </Segment>
);

const LoginModal = props => (
            <Modal open={props.open} onClose={props.onClose} basic size='small'>
                <Header icon='sign in' content={'Sign In'} />
                <Modal.Content>
                    <LoginForm

                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        color='red'
                        inverted
                        onClick={props.onClose}
                    >
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button
                        color='green'
                        inverted
                        onClick={props.submitForm}
                    >
                        <Icon name='checkmark' /> Sign In
                    </Button>
                </Modal.Actions>
            </Modal>
);

export default LoginModal;
