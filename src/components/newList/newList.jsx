import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

import styles from './newList.css';

class NewList extends React.Component {
    render() {
        return (
          <div>
              new list
          </div>
        );
    }
}

NewList.propTypes = {

};

export default connect(null)(cssModules(NewList, styles));
