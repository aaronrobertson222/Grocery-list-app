import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { fetchListById } from 'actions/index.actions';
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

    }

    toggleEditing() {
        this.setState((prevState) => {
            return {
                prevState,
                isEditing: !this.state.isEditing
            };
        });
    }

    render() {

        if (this.props.currentList) {

            const userField = (
          <div>
            <label>Users</label>
            <FieldArray name="listUsers" component={UserField}/>
          </div>
        );

            const editForm = (
        <form>
          <div>
            <label>List Name</label>
            <Field name="listName" component="input" value={this.props.currentList.listName} />
          </div>
          <div>
            <label>Items</label>
            <FieldArray name="items" component={ItemField} fields={this.props.currentList.items} />
          </div>
          {this.props.currentList.listOwner === this.props.user.id && userField}
          <button type="submit">Update List</button>
          <button type="button">Cancel</button>
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
                    <p styleName="list-item-check">Check</p>
                  </div>
                );
                    }

                    return (
              <div>
                <section styleName="list-info">
                  <header styleName="list-header-container">
                    <h1 styleName="list-header">
                      {this.props.currentList.listName}
                    </h1>
                  </header>
                  <button type="button" onClick={this.toggleEditing}>Edit List</button>
                </section>
                <section styleName="list-container">
                  <h1>Items</h1>
                  <div>
                    {itemsElements}
                  </div>
                  <h2>Notes</h2>
                </section>
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
};

const mapStateToProps = (state) => ({
    currentList: state.list.currentList,
    user: state.user.user,
});

export default connect(mapStateToProps, { fetchListById })(reduxForm({
    form: 'EditList',
})(cssModules(List, styles)));
