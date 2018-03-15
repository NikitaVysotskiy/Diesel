import React, { Component } from 'react';
import HeaderMenu from "./HeaderMenu";
import LoginModal from "./LoginModal";

class App extends Component {

    constructor(props) {
        super(props);

        this.submitForm = ev => {
            ev.preventDefault();

            this.closeModal();
        };


        this.state = { modalOpen: true };
        this.showModal.bind(this);
        this.closeModal.bind(this);
    }

    showModal = () => this.setState({ modalOpen: true });
    closeModal = () => this.setState({ modalOpen: false });

    render() {
        const { modalOpen } = this.state;
        return (
            <div className="App">
                <HeaderMenu />
                <LoginModal
                    open={modalOpen}
                    onClose={this.closeModal}
                    submitForm={this.submitForm}
                />
            </div>
        );
    }
}

export default App;
