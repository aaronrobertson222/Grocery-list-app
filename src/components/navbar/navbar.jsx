import React from 'react';
import cssModules from 'react-css-modules';
import { connect, dispatch } from 'react-redux'; //eslint-disable-line
import PropTypes from 'prop-types';

import { showModal } from 'actions/index.actions';
import styles from './navbar.css';

class Navbar extends React.Component {

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
    showModal: PropTypes.func.isRequired
};

export default connect(null, { showModal })(cssModules(Navbar, styles, { allowMultiple: true }));
