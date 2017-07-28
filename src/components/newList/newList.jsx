import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';

import styles from './newList.css';

import { createList, clearListError } from 'actions/index.actions';

import ItemField from 'components/itemField/itemField';
import UserField from 'components/userField/userField';

class NewList extends React.Component {
    componentWillUnmount() {
        this.props.clearListError();
    }

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
              <div styleName="form-group">
                <label styleName="form-label">List Name</label>
                <br />
                <Field name="listName" component="input" type="text" placeholder="List Name" styleName="form-input" required />
              </div>
              <div styleName="form-group">
                <label styleName="form-label">Items</label>
                <FieldArray name="items" component={ItemField} required />
              </div>
              <div styleName="form-group">
                <label styleName="form-label">Users</label>
                <FieldArray name="listUsers" component={UserField}  required />
              </div>
              {this.props.listError && <p styleName="list-error">{this.props.listError}</p>}
              <button styleName="btn" type="submit">Submit List</button>
            </form>
          </div>
        );
    }
}

NewList.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    createList: PropTypes.func.isRequired,
    listError: PropTypes.string,
    clearListError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    listError: state.list.listError,
});

export default connect(mapStateToProps, { createList, clearListError })(reduxForm({
    form: 'List',
})(cssModules(NewList, styles)));
