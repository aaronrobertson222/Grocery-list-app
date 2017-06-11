import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './landing.layout.css';

import { fetchLogin } from 'actions/index.actions';

import Navbar from 'components/navbar/navbar';
import Hero from 'components/hero/hero';
import About from 'components/about/about';

class LandingLayout extends React.Component {
    render() {
        return (
          <div>
            <Navbar />
            <div styleName="content">
              <Hero />
              <About />
              <button onClick={this.props.fetchLogin.bind(null, 'aaron', 'blahblah2345')}>My Button</button>
            </div>
          </div>
        );
    }
}

LandingLayout.propTypes = {
    fetchLogin: PropTypes.func.isRequired,
};

export default connect(null, {
    fetchLogin
})(cssModules(LandingLayout, styles, { allowMultiple: true }));
