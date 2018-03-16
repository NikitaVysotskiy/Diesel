import React, { Component } from 'react';

import LoginModal from "./LoginModal";


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = { modalOpen: true };
        this.showModal.bind(this);
        this.closeModal.bind(this);
    }

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (!token) {
            this.showModal()
        }
    }

    showModal = () => this.setState({ modalOpen: true });
    closeModal = () => this.setState({ modalOpen: false });

    render() {
        const { modalOpen } = this.state;
        return (
            <LoginModal
                open={modalOpen}
                onClose={this.closeModal}
            />
        );
    }
}

export default Login;
