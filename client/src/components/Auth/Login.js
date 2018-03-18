import React, { Component } from 'react';

import LoginModal from "./LoginModal";


class Login extends Component {

    render() {
        return (
            <LoginModal
                open={true}
            />
        );
    }
}

export default Login;
