import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';

import styles from './newList.css';

import { createList } from 'actions/index.actions';

import ItemField from 'components/itemField/itemField';
import UserField from 'components/userField/userField';

class NewList extends React.Component {

    formSubmitHandler(values) {
        const listName = values.listName;
        const items = values.items;
        const listUsers = values.listUsers;
        this.props.createList(listName, items, listUsers);
    }

    render() {
        return (
          <div styleName="new-list-form">
            <form onSubmit={this.props.handleSubmit(this.formSubmitHandler.bind(this))}>
              <div>
                <label>List Name</label>
                <Field name="listName" component="input" type="text" placeholder="List Name" styleName="form-input" required />
              </div>
              <div>
                <label>Items</label>
                <FieldArray name="items" component={ItemField} />
              </div>
              <div>
                <label>Users</label>
                <FieldArray name="listUsers" component={UserField} />
              </div>
              <button type="submit">Submit List</button>
            </form>
          </div>
        );
    }
}

NewList.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    createList: PropTypes.func.isRequired
};



export default connect(null, { createList })(reduxForm({
    form: 'List',
})(cssModules(NewList, styles)));
