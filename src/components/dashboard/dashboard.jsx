import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLists, fetchSharedLists } from 'actions/index.actions';
import { Link } from 'react-router-dom';

import styles from './dashboard.css';

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.fetchLists();
        this.props.fetchSharedLists();
    }

    render() {



        let lists = this.props.lists || [];
        const listElements = lists.map((list, i) => (
              <Link styleName="list-link-item" key={i} to={`/app/list/${list.id}`}>
                <div styleName="list">
                  <h3 styleName="list-name">
                    {list.listName}
                  </h3>
                  <p styleName="list-length">{list.items.length} items</p>
                </div>
              </Link>
            ));



        let sharedLists = this.props.sharedLists || [];
        let sharedListsElements = sharedLists.map((list, i) => (
          <Link styleName="list-link-item" key={i} to={`/app/list/${list.id}`}>
            <div styleName="list">
              <h3 styleName="list-name">
                {list.listName}
              </h3>
              <p styleName="list-length">{list.items.length} items</p>
            </div>
          </Link>
        ));

        return (
          <div>
            <section styleName="user-info">
              <h1 styleName="username">{this.props.user.username}</h1>
            </section>
            <section styleName="list-section">
              <header styleName="list-section-header">
                <h2>
                  My Lists
                </h2>
              </header>
              <hr />
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
              <hr />
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
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    lists: state.list.lists,
    sharedLists: state.list.sharedLists,
});

export default connect(mapStateToProps, { fetchLists, fetchSharedLists })(cssModules(Dashboard, styles));
