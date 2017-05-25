import React from 'react';
import cssModules from 'react-css-modules';

import styles from './navbar.css';


class Navbar extends React.Component {
    render() {
        return (
          <div styleName="navbar">
            <nav styleName="container">
              <div styleName="navbar-header">
                <h1>Grocery List App</h1>
              </div>
              <div styleName="navbar-menu">
                <ul>
                  <li>
                    Home
                  </li>
                  <li>
                    About
                  </li>
                </ul>
              </div>
              <div styleName="login-options">
                <p styleName="login-option">
                  Sign In
                </p>
                <p styleName="login-option">
                  Sign Up
                </p>
              </div>
            </nav>
          </div>
        );
    }
}

export default cssModules(Navbar, styles);
