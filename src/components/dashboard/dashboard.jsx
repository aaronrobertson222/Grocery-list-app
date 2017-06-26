import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './dashboard.css';

class Dashboard extends React.Component {
    render() {
        return (
          <div>
            <section styleName="user-info">
              <h1 styleName="username">{this.props.user.name}</h1>
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

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps)(cssModules(Dashboard, styles));
