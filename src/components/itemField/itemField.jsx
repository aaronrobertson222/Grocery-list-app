import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import styles from './itemField.css';

const ItemField = ({fields}) => {

    return (
      <ul styleName="item-field-wrapper">
        {fields.map((item, index) => (
            <li styleName="field-group" key={index}>
              <label styleName="form-input-label">Item Name</label>
              <Field
                name={`${item}.name`}
                type="text"
                component="input"
                label="Item Name"
                styleName="form-input"
              />
            <label styleName="form-input-label">Qty.</label>
              <Field
                name={`${item}.quantity`}
                type="text"
                component="input"
                label="Item Quantiy"
                styleName="form-input"
              />
            <button styleName="btn red" onClick={() => fields.remove(index)}>
                D
              </button>
            </li>
        ))}
        <li styleName="add-field-btn-wrapper">
          <button styleName="btn blue" type="button" onClick={() => fields.push()}>Add Item</button>
        </li>
      </ul>
    );
};

ItemField.propTypes = {
    fields: PropTypes.object
};

export default cssModules(ItemField, styles, { allowMultiple: true });
