import { connect } from "react-redux";
import { Icon, Menu, Segment } from 'semantic-ui-react';
import { push } from "react-router-redux";
import React, { Component } from 'react';

import { LOGOUT, REDIRECT } from "../constants/actionTypes";
import { store } from "../store";


const mapStateToProps = state => ({...state.auth});


const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => dispatch({ type: LOGOUT }),
    onRedirect: () => dispatch({ type: REDIRECT })
});

class HeaderMenu extends  Component {

    state = { activeItem: 'routeCalculator' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    logout (onLogoutClick) {
        onLogoutClick();
        store.dispatch(push('/login'));
        this.props.onRedirect();
    }

    render() {
        const { activeItem } = this.state;
        const { currentUser, onLogoutClick } = this.props;
        if (currentUser) {
            return (
                <Segment inverted>
                    <Menu pointing secondary inverted>
                        <Menu.Item name='routeCalculator'
                                   active={activeItem === 'routeCalculator'}
                                   onClick={this.handleItemClick}
                        />
                        <Menu.Item name='eventView'
                                   active={activeItem === 'eventView'}
                                   onClick={this.handleItemClick}
                        />
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Icon name='user circle outline' />
                                { this.props.currentUser.username }
                            </Menu.Item>
                            <Menu.Item name='logout' onClick={() => this.logout(onLogoutClick)}>
                                <Icon name='sign out' />
                                Logout
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>
            )
        } else {
            return null
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
