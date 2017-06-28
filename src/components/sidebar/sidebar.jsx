import React from 'react';
import { Link } from 'react-router-dom';

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
                  <Link to="/app" styleName="nav-links">
                    <p>My Dashboard</p>
                  </Link>
                </li>
                <li styleName="sidebar-nav-list-items">
                  <Link to="/app/newlist" styleName="nav-links">
                    <p>New List</p>
                  </Link>
                </li>
              </ul>
            </nav>
        </div>
        );
    }
}

export default cssModules(Sidebar, styles);
