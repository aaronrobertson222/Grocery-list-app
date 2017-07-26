import React from 'react';
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../history';

import { fetchUsersInfo } from 'actions/index.actions';

import LandingLayout from '../../layouts/landing/landing.layout';
import MainLayout from 'layouts/main/main.layout';

import Dashboard from 'components/dashboard/dashboard';
import List from 'components/list/list';
import Navbar from 'components/navbar/navbar';
import NewList from 'components/newList/newList';

class App extends React.Component {
    componentWillMount() {
        if (this.props.user === null) {
            this.props.fetchUsersInfo();
        }
    }

    render() {
        return (
          <Router history={history}>
            <div>
              <Route exact path="/" render={(props) => (
                  <LandingLayout {...props}>
                    <Navbar/>
                  </LandingLayout>
              )}/>
            <Route path="/app" render={(props) => (
                  this.props.user ? (
                  <MainLayout {...props}>
                    <Route exact path="/app" render={(props) => (<Dashboard {...props} />)} />
                    <Route path="/app/newlist" render={(props) => (<NewList {...props} />)} />
                    <Route path="/app/list/:id" render={(props) => (<List {...props} />)} />
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
