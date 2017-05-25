import React from 'react';

//import LandingLayout from 'layouts/landing/landing.layout';
//import MainLayout from 'layouts/main/main.layout';

import Sidebar from 'components/sidebar/sidebar';
//import Dashboard from 'components/dashboard/dashboard';

import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';

const App = () => {
    return (
      <Router>
      <div>
          <Route exact path="/">
            <Sidebar />
          </Route>
        </div>
      </Router>
    );
};

export default App;
