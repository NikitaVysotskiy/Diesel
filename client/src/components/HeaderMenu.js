import { connect } from "react-redux";
import { Icon, Menu, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';

import { LOGOUT } from "../constants/actionTypes";


const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => dispatch({ type: LOGOUT }),
});

class HeaderMenu extends  Component {

    state = { activeItem: 'routeCalculator' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        const { currentUser } = this.props;
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
                            <Menu.Item name='logout' onClick={this.props.onLogoutClick}>
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

export default connect(null, mapDispatchToProps)(HeaderMenu);
