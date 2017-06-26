import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchListById } from 'actions/index.actions';
import styles from './list.css';

class List extends React.Component {

    componentWillMount() {
        this.props.fetchListById(this.props.match.params.id);
    }

    componentWillUnmount() {

    }

    render() {

        if (this.props.currentList) {

            const currentList = this.props.currentList;
            const itemsElements = [];
            for (let i = 0; i < currentList.items.length; i++) {
                itemsElements.push(
                  <div key={i} styleName="list-item">
                    <p styleName="list-item-name">{currentList.items[i].item}</p>
                    <p styleName="list-item-quantity">{currentList.items[i].quantity}</p>
                  </div>
                );
            }

            return (
              <div>
                <header styleName="list-header-container">
                  <h1 styleName="list-header">
                    {this.props.currentList.listName}
                  </h1>
                  <div>

                  </div>
                </header>
                <section styleName="list-container">
                  <div>
                    {itemsElements}
                  </div>
                </section>
              </div>
            );
        }
    }
}

List.propTypes = {
    fetchListById: PropTypes.func.isRequired,
    match: PropTypes.object,
    currentList: PropTypes.object
};

const mapStateToProps = (state) => ({
    currentList: state.list.currentList,
});

export default connect(mapStateToProps, { fetchListById })(cssModules(List, styles));
