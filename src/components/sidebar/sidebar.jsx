import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssModules from 'react-css-modules';

import styles from './sidebar.css';

import { clearCurrentUser } from 'actions/index.actions';

class Sidebar extends React.Component {
    constructor() {
        super();

        this.state = {
            sidebarIsVisible: false
        };

        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState((prevState) => {
            return {
                prevState,
                sidebarIsVisible: !this.state.sidebarIsVisible
            };
        });
    }

    render() {
        return (
        <div styleName={'app-sidebar' + (this.state.sidebarIsVisible ? ' isVisible' : '' )}>
          <header>
            <h1 styleName="sidebar-title">
              Grocery List App
            </h1>
          </header>
            <nav styleName="sidebar-nav">
              <ul styleName="sidebar-nav-list">
                <li styleName="sidebar-nav-list-items">
                  <Link to="/app" styleName="nav-links">
                    <p>My Dashboard</p>
                  </Link>
                </li>
                <li styleName="sidebar-nav-list-items">
                  <Link to="/app/newlist" styleName="nav-links">
                    <p>New List</p>
                  </Link>
                </li>
                <li styleName="sidebar-nav-list-items">
                  <a onClick={this.props.clearCurrentUser} styleName="nav-links">
                    <p>Log Out</p>
                  </a>
                </li>
              </ul>
            </nav>
            <button styleName="sidebar-button" onClick={this.toggleSidebar}>T</button>
        </div>
        );
    }
}

Sidebar.propTypes = {
    clearCurrentUser: PropTypes.func.isRequired,
};

export default connect(null, { clearCurrentUser })(cssModules(Sidebar, styles, { allowMultiple: true }));
