import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLists, fetchSharedLists, clearAllCurrentLists } from 'actions/index.actions';
import { Link } from 'react-router-dom';

import styles from './dashboard.css';

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.fetchLists();
        this.props.fetchSharedLists();
    }

    componentWillUnmount() {
        this.props.clearAllCurrentLists();
    }

    render() {

        let lists = this.props.lists;

        if (lists.length > 0) {
            var listElements = lists.map((list, i) => (
                  <Link styleName="list-link-item" key={i} to={`/app/list/${list.id}`}>
                    <div styleName="list">
                      <h3 styleName="list-name">
                        {list.listName}
                      </h3>
                      <p styleName="list-length">{list.items.length} items</p>
                    </div>
                  </Link>
                ));
        }

        let sharedLists = this.props.sharedLists;

        if (sharedLists.length > 0) {

            var sharedListsElements = sharedLists.map((list, i) => (
              <Link styleName="list-link-item" key={i} to={`/app/list/${list.id}`}>
                <div styleName="list">
                  <h3 styleName="list-name">
                    {list.listName}
                  </h3>
                  <p styleName="list-length">{list.items.length} items</p>
                </div>
              </Link>
            ));
        }

        return (
          <div>
            <section styleName="user-info">
              <h1 styleName="username">{this.props.user.username}</h1>
              <p styleName="user-lists-count">{this.props.lists.length} lists</p>
              <p styleName="user-lists-count">{this.props.sharedLists.length} shared lists</p>
            </section>
            <section styleName="list-section">
              <header styleName="list-section-header">
                <h2>
                  My Lists
                </h2>
              </header>
              <hr styleName="section-ruler"/>
              <div styleName="lists-container">
                {listElements}
              </div>
            </section>
            <section styleName="list-section">
              <header styleName="list-section-header">
                <h2>
                  Shared Lists
                </h2>
              </header>
              <hr styleName="section-ruler"/>
              <div styleName="lists-container">
                {sharedListsElements}
              </div>
            </section>
          </div>
        );
    }
  }

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    fetchLists: PropTypes.func.isRequired,
    fetchSharedLists: PropTypes.func.isRequired,
    lists: PropTypes.array,
    sharedLists: PropTypes.array,
    clearAllCurrentLists: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    lists: state.list.lists,
    sharedLists: state.list.sharedLists,
});

export default connect(mapStateToProps, { fetchLists, fetchSharedLists, clearAllCurrentLists })(cssModules(Dashboard, styles));
