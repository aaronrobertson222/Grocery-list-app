import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const UserField = ({fields}) => {
    return(
      <ul>
        <li>
          <button type="button" onClick={() =>  fields.push()}>Add User</button>
        </li>
        {fields.map((user, index) => (
          <li key={index}>
            <button type="button" onClick={() => fields.remove(index)}>
              Remove User
            </button>
            <label>User</label>
            <Field
              name={user}
              type="text"
              component="input"
            />
          </li>
        ))}
      </ul>
    );
};

UserField.propTypes = {
    fields: PropTypes.object
};

export default UserField;
