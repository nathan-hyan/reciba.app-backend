// Import utilities
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import context
import UserContextProvider from "./Context/UserContext";

// Import pages
import Home from "./Pages/Home";
import Signup from "./Pages/auth/Signup";
import Login from "./Pages/auth/Login";
import Logout from "./Pages/auth/Logout";

// Import layout
import Navigation from "./Layout/Navigation";
import GenerateInvoice from "./Pages/invoice/generate/GenerateInvoice";
import DisplayInvoice from "./Pages/invoice/display/DisplayInvoice";
import Signature from "./Pages/invoice/generate/Signature";
import ShowQRCodeModal from "./Pages/invoice/qr/ShowQRCodeModal";
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
              <Route
                path="/invoice/display/:id/:socketId"
                component={DisplayInvoice}
              />
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
