import React from 'react';
import cssModules from 'react-css-modules';

import styles from './dashboard.css';

class Dashboard extends React.Component {
    render() {
        return (
          <div>
            <section styleName="user-info">
              <h1 styleName="username">User Name</h1>
            </section>
            <section styleName="list-section">
              <header styleName="list-section-header">
                <h2>
                  My Lists
                </h2>
              </header>
              <p>
                lists
              </p>
            </section>
          </div>
        );
    }
  }

export default cssModules(Dashboard, styles);
