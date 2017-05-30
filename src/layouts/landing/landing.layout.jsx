import React from 'react';
import cssModules from 'react-css-modules';

import styles from './landing.layout.css';

import Navbar from '../../components/navbar/navbar';

class LandingLayout extends React.Component {
    render() {
        return (
          <div>
            <Navbar />
          </div>
        );
    }
}

export default cssModules(LandingLayout, styles);
