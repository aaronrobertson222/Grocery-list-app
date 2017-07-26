import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import styles from './landing.layout.css';

import { fetchLogin, fetchUsersInfo } from 'actions/index.actions';

import Navbar from 'components/navbar/navbar';
import Hero from 'components/hero/hero';
import About from 'components/about/about';
import Login from 'components/login/login';
import Signup from 'components/signup/signup';

class LandingLayout extends React.Component {
    render() {
        const Element = Scroll.Element;
        if (this.props.user) {
            return (
              <Redirect to={{
                  pathname: '/app'
              }} />
            );
        }
        return (
          <div styleName="landing-container">
            <Navbar />
            <div styleName="content">
              {this.props.isVisible && <Login />}
              <Hero />
              <About />
              <Element name="signup-section">
                <Signup />
              </Element>
            </div>
          </div>
        );
    }
}

LandingLayout.propTypes = {
    fetchLogin: PropTypes.func.isRequired,
    fetchUsersInfo: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    isVisible: state.modal.isVisible,
    user: state.user.user
});

export default connect(mapStateToProps, {
    fetchLogin,
    fetchUsersInfo,
})(cssModules(LandingLayout, styles, { allowMultiple: true }));
