import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import LandingLayout from '../../layouts/landing/landing.layout';
import MainLayout from 'layouts/main/main.layout';

import Dashboard from 'components/dashboard/dashboard';
import List from 'components/list/list';
import Navbar from 'components/navbar/navbar';

const App = () => {
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => (
            <LandingLayout {...props}>
              <Navbar/>
            </LandingLayout>
          )}/>
          <Route path="/app" render={(props) => (
              <MainLayout {...props}>
                <Route path="/app/dashboard" render={(props) => (<Dashboard {...props}/>)} />
                <Route path="/app/list" render={(props) => (<List {...props} />)} />
              </MainLayout>
            )}/>
          </div>
      </Router>
    );
};

export default App;
