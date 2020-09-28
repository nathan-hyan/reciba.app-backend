import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Context/UserContext";
import UserMenuLogOut from "./userMenu/UserMenuLogOut";
import UserMenuLogIn from "./userMenu/UserMenuLogIn";
import OptionsLogIn from "./options/OptionsLogIn";

export default function Navigation() {
  const user = useContext(UserContext);

  return (
    <>
      <Navbar
        fixed="top"
        style={{ zIndex: 999 }}
        bg="primary"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand href="/">Proyecto Bills</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <OptionsLogIn />
          <Nav className="ml-auto">
            <NavDropdown
              title={`Usuario actual: ${
                user.isLoggedIn ? user.name : "invitado"
              }`}
              id="collasible-nav-dropdown"
            >
              {!user.isLoggedIn ? <UserMenuLogIn /> : <UserMenuLogOut />}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: 35 }} />
    </>
  );
}
