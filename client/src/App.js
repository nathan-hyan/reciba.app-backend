// Import utilities
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Import context
import { UserContext } from './Context/UserContext';

// Import pages
import Home from './Pages/Home'
import Login from './Pages/Login'
import Logout from './Pages/Logout'

// Import layout
import Navigation from './Layout/Navigation';

function App() {

  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }, [user, setUser]))

  return (
    <>
      <Navigation />
      <Router>
        <UserContext.Provider value={value}>
          {/* User authentication */}
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={Home} />
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
