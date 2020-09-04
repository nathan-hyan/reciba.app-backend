// Import utilities
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import context
import UserContextProvider from "./Context/UserContext";
import IdGeneration from "./Context/IdGeneration";

// Import pages
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";

// Import layout
import Navigation from "./Layout/Navigation";
import GenerateInvoice from "./Pages/invoice/GenerateInvoice";
import DisplayInvoice from "./Pages/invoice/DisplayInvoice";
import Signature from "./Pages/invoice/Signature";
import ShowQRCodeModal from "./Pages/invoice/ShowQRCodeModal";
import IdGenerationProvider from "./Context/IdGeneration";

function App() {
  return (
    <Fragment>
      <UserContextProvider>
        <IdGenerationProvider>
          <Router>
            <Navigation />
            <Switch>
              {/* User authentication */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={Home} />

              {/* Invoice */}
              <Route path="/invoice/generate" component={GenerateInvoice} />
              <Route path="/invoice/display/:id" component={DisplayInvoice} />
              <Route path="/invoice/code/:id" component={ShowQRCodeModal} />

              {/* Signature pad */}
              <Route path="/signature/:id" component={Signature} />
            </Switch>
          </Router>
        </IdGenerationProvider>
      </UserContextProvider>
    </Fragment>
  );
}

export default App;
