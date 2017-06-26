import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';


import styles from './newList.css';

class NewList extends React.Component {
    render() {
        return (
          <div>
            <form>
              <div>
                <label>List Name</label>
                <Field name="listName" component="input" type="text" placeholder="List Name" styleName="form-input" required />
              </div>
            </form>
          </div>
        );
    }
}

NewList.propTypes = {

};

export default connect(null)(cssModules(NewList, styles));
