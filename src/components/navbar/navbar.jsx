import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showModal, hideModal } from 'actions/index.actions';
import styles from './navbar.css';

class Navbar extends React.Component {

    componentWillUnmount() {
        this.props.hideModal();
    }

    handleShowModal(event) {
        event.preventDefault();
        this.props.showModal();
    }

    render() {
        return (
          <div styleName="navbar">
            <nav styleName="container">
              <div styleName="navbar-header">
                <h1>Grocery List App</h1>
              </div>
              <div styleName="login-options">
                <a styleName="login-option" onClick={this.handleShowModal.bind(this)}>
                  Login / Demo
                </a>
                <p styleName="login-option signup">
                  Sign Up
                </p>
              </div>
            </nav>
          </div>
        );
    }
}

Navbar.propTypes = {
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
};

export default connect(null, { showModal, hideModal })(cssModules(Navbar, styles, { allowMultiple: true }));
