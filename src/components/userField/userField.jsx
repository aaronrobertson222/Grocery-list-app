import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import styles from './userField.css';

const UserField = ({fields}) => {
    return(
      <ul styleName="user-field-wrapper">
        {fields.map((user, index) => (
          <li styleName="field-group" key={index}>
            <label styleName="form-input-label">Username</label>
            <Field
              name={user}
              type="text"
              component="input"
              styleName="form-input"
            />
          <button styleName="btn red"type="button" onClick={() => fields.remove(index)}>
            <img styleName="button-icon" src="../../assets/images/icons/delete.png" />
          </button>
          </li>
        ))}
        <li>
          <button styleName="btn blue" type="button" onClick={() =>  fields.push()}><span>Add User</span><img styleName="button-icon" src="../../assets/images/icons/add.png" /></button>
        </li>
      </ul>
    );
};

UserField.propTypes = {
    fields: PropTypes.object
};

export default cssModules(UserField, styles, { allowMultiple: true });
