import React from 'react';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';

import styles from './main.layout.css';

import Sidebar from 'components/sidebar/sidebar';


class MainLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <Sidebar />
            <div>
              {this.props.main}
            </div>
          </div>
        ) ;
    }
}

export default cssModules(MainLayout, styles);


MainLayout.propTypes =  {
    main: PropTypes.node
};
