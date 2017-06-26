import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUsersInfo } from 'actions/index.actions';

import LandingLayout from '../../layouts/landing/landing.layout';
import MainLayout from 'layouts/main/main.layout';

import Dashboard from 'components/dashboard/dashboard';
import List from 'components/list/list';
import Navbar from 'components/navbar/navbar';
import NewList from 'components/newList/newList';

class App extends React.Component {

    componentWillMount() {
        this.props.fetchUsersInfo();
    }

    render() {
        return (
          <Router>
            <div>
              <Route exact path="/" render={(props) => (
                  <LandingLayout {...props}>
                    <Navbar/>
                  </LandingLayout>
              )}/>
            <Route path="/app" render={(props) => (
                  props.user !== null ? (
                  <MainLayout {...props}>
                    <Route path="/app" render={(props) => (<Dashboard {...props} />)} />
                    <Route path="/new-list" render={(props) => (<NewList {...props} />)} />
                    <Route path="/list" render={(props) => (<List {...props} />)} />
                  </MainLayout>
                ) : (
                  <Redirect to={{
                      pathname: '/',
                      state: { from: props.location }
                  }} />
                )
              )}/>
            </div>
          </Router>
        );
    }
}

App.propTypes = {
    fetchUsersInfo: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps, { fetchUsersInfo })(App);
