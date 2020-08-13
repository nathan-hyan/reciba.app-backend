// Import utilities
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Import context
import UserContextProvider from './Context/UserContext';

// Import pages
import Home from './Pages/Home'
import Login from './Pages/Login'
import Logout from './Pages/Logout'

// Import layout
import Navigation from './Layout/Navigation';

function App() {

  return (
    <>
      <UserContextProvider>
        <Navigation />
        <Router>
          {/* User authentication */}
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={Home} />
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
