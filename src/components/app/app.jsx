import React from 'react';

import LandingLayout from 'layouts/landing/landing.layout';
import MainLayout from 'layouts/main/main.layout';

import Dashboard from 'components/dashboard/dashboard';
import Navbar from 'components/navbar/navbar';

import {BrowserRouter as Router, Route} from 'react-router-dom';

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
              <Route path="dashboard" render={(props) => (<Dashboard {...props}/>)}/>
            </MainLayout>
          )}/>
        </div>
      </Router>
    );
};

export default App;
