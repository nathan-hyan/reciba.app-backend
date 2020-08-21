// Import utilities
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import context
import UserContextProvider from './Context/UserContext';

// Import pages
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';

// Import layout
import Navigation from './Layout/Navigation';
import GenerateInvoice from './Pages/invoice/GenerateInvoice';

function App() {
	return (
		<Fragment>
			<UserContextProvider>
				<Router>
					<Navigation />
					<Switch>
						{/* User authentication */}
						<Route path='/signup' component={Signup} />
						<Route path='/login' component={Login} />
						<Route path='/logout' component={Logout} />
						<Route path='/' exact component={Home} />

						{/* Invoice Generation */}
						<Route path='/invoice/generate' component={GenerateInvoice} />
					</Switch>
				</Router>
			</UserContextProvider>
		</Fragment>
	);
}

export default App;
