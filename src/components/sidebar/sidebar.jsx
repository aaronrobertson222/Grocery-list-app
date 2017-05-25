import React from 'react';

import cssModules from 'react-css-modules';

import styles from './sidebar.css';

class Sidebar extends React.Component {

    render() {
        return (
        <div styleName="app-sidebar">
          <header>
            <h1 styleName="sidebar-title">
              Grocery List App
            </h1>
          </header>
            <nav styleName="sidebar-nav">
              <ul styleName="sidebar-nav-list">
                <li styleName="sidebar-nav-list-items">
                  Dashboard
                </li>
                <li styleName="sidebar-nav-list-items">
                  My Account
                </li>
              </ul>
            </nav>
        </div>
        );
    }
}

export default cssModules(Sidebar, styles);
