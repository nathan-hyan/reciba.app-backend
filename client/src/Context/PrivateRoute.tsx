import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ render: Render, ...rest }: any) => {
  const User = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (User.isLoggedIn || localStorage.getItem("bill-token")) {
          return <Render {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
