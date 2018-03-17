import {connect} from "react-redux";
import { Component } from 'react';
import { push } from "react-router-redux";

import { REDIRECT } from "../../constants/actionTypes";
import {store} from "../../store";


const mapDispatchToProps = dispatch => ({
    onRedirect: () => dispatch({ type: REDIRECT })
});


class LoginRequiredContainer extends Component {

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (!token) {
            store.dispatch(push('/login'));
            this.props.onRedirect();
        }
    }

    render() {
        console.log(this.props.children);
        return this.props.children
    }
}

export default connect(null, mapDispatchToProps)(LoginRequiredContainer);