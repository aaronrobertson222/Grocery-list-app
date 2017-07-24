import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { fetchListById, clearCurrentList, deleteList, updateList } from 'actions/index.actions';
import styles from './list.css';

import UserField from 'components/userField/userField';
import ItemField from 'components/itemField/itemField';

class List extends React.Component {

    constructor() {
        super();

        this.state = {
            isEditing: false
        };

        this.toggleEditing = this.toggleEditing.bind(this);
    }

    componentWillMount() {
        this.props.fetchListById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearCurrentList();
    }

    toggleEditing() {
        this.setState((prevState) => {
            return {
                prevState,
                isEditing: !this.state.isEditing
            };
        });
    }

    formSubmitHandler(values) {
        const list = {};
        list.listName = values.listName;
        list.items = values.items;
        list.listUsers = values.listUsers;
        this.props.updateList(this.props.currentList.id, list);
    }

    render() {

        if (this.props.currentList) {

            const deleteButton = (
              <button styleName="delete-list-button button" type="button" onClick={() => this.props.deleteList(this.props.currentList.id)}><span>Delete List</span></button>
            );

            const userField = (
              <div styleName="form-group">
                <label styleName="form-label">Users</label>
                <FieldArray name="listUsers" component={UserField} required/>
              </div>
            );

            const editForm = (
              <form styleName="edit-form">
                <div styleName="form-group">
                  <label styleName="form-label">List Name</label>
                  <br />
                  <Field styleName="form-input" name="listName" component="input" />
                </div>
                <div styleName="form-group">
                  <label styleName="form-label">Items</label>
                  <FieldArray name="items" component={ItemField} required />
                </div>
                {this.props.currentList.listOwner === this.props.user.id && userField}
                <div styleName="form-options">
                  <button styleName="update-button button" type="submit" onClick={this.props.handleSubmit(this.formSubmitHandler.bind(this))}>Update List</button>
                  <button styleName="cancel-button button" type="button" onClick={this.toggleEditing}>Cancel</button>
                </div>
              </form>
            );

            if (this.state.isEditing) {
                return editForm;
            } else {

                if (this.props.currentList) {
                    const currentList = this.props.currentList;
                    const itemsElements = [];
                    for (let i = 0; i < currentList.items.length; i++) {
                        itemsElements.push(
                  <div key={i} styleName="list-item">
                    <p styleName="list-item-name">{currentList.items[i].name}</p>
                    <p styleName="list-item-quantity">Qty: {currentList.items[i].quantity}</p>
                  </div>
                );
                    }

                    return (
                      <div>
                        <section styleName="list-info">
                          <header>
                            <h1 styleName="list-header">
                              {this.props.currentList.listName}
                            </h1>
                          </header>
                          <button styleName="edit-list-button button" type="button" onClick={this.toggleEditing}>Edit List</button>
                        </section>
                        <section styleName="list-container">
                          <h1 styleName="list-section-header">Items</h1>
                          <hr styleName="section-ruler"/>
                          <div>
                            {itemsElements}
                          </div>
                        </section>
                        {this.props.user.id === this.props.currentList.listOwner && deleteButton}
                      </div>
                    );
                }
            }
        }
    }
}

List.propTypes = {
    fetchListById: PropTypes.func.isRequired,
    match: PropTypes.object,
    currentList: PropTypes.object,
    user: PropTypes.object.isRequired,
    clearCurrentList: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    currentList: state.list.currentList,
    user: state.user.user,
    initialValues: state.list.currentList,
});

export default connect(mapStateToProps, { fetchListById, clearCurrentList, deleteList, updateList })(reduxForm({
    form: 'EditList',
})(cssModules(List, styles, { allowMultiple: true })));
