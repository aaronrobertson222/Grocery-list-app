import React from 'react';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';

import styles from './main.layout.css';

import Sidebar from 'components/sidebar/sidebar';


const MainLayout = (props) => (
          <div className="container">
            <div styleName="sidebar">
              <Sidebar />
            </div>
            <div styleName="main">
              {props.children}
            </div>
          </div>
);

export default cssModules(MainLayout, styles);

MainLayout.propTypes =  {
    children: PropTypes.node.required
};
