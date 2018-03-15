import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class HeaderMenu extends  Component {

    state = { activeItem: 'routeCalculator' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item name='routeCalculator' active={activeItem === 'routeCalculator'} onClick={this.handleItemClick} />
                    <Menu.Item name='eventView' active={activeItem === 'eventView'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
                        <Menu.Item name='register' active={activeItem === 'register'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

