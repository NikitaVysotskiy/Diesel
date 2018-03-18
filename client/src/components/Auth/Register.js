import React, { Component } from 'react';

import RegisterModal from "./RegisterModal";


class Register extends Component {

    render() {
        return (
            <RegisterModal
                open={true}
            />
        );
    }
}

export default Register;
