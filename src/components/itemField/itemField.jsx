import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const ItemField = ({fields}) => {
    return (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push()}>Add Item</button>
        </li>
        {fields.map((item, index) => (
            <li key={index}>
              <button onClick={() => fields.remove(index)}>
                Remove Item
              </button>
              <label>Item Name</label>
              <Field
                name={`${item}.name`}
                type="text"
                component="input"
                label="Item Name"
              />
              <label>Qty.</label>
              <Field
                name={`${item}.quantity`}
                type="text"
                component="input"
                label="Item Quantiy"
              />
            </li>
        ))}
    </ul>

    );
};

ItemField.propTypes = {
    fields: PropTypes.array
};

export default ItemField;
