import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLists } from 'actions/index.actions';
import { Link } from 'react-router-dom';

import styles from './dashboard.css';

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.fetchLists();
    }

    render() {

        let lists = this.props.lists;
        let listElements = [];
        for (let i = 0; i < lists.length; i++) {
            listElements.push(
              <Link key={i} to={`/app/list/${lists[i].id}`}>
                <div styleName="list">
                  <h3>
                    {this.props.lists[i].listName}
                  </h3>
                </div>
              </Link>
            );
        }

        return (
          <div>
            <section styleName="user-info">
              <h1 styleName="username">{this.props.user.name}</h1>
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
          </div>
        );
    }
  }

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    fetchLists: PropTypes.func.isRequired,
    lists: PropTypes.array
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    lists: state.list.lists
});

export default connect(mapStateToProps, { fetchLists })(cssModules(Dashboard, styles));
