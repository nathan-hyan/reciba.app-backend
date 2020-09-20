import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faUserPlus,
  faHome,
  faUserEdit,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../Context/UserContext";

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
          <Nav className="mr-auto">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faHome} /> Principal
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown
              title={`Usuario actual: ${
                user.isLoggedIn ? user.name : "invitado"
              }`}
              id="collasible-nav-dropdown"
            >
              {!user.isLoggedIn ? (
                <div>
                  <NavDropdown.Item href="/login">
                    <FontAwesomeIcon icon={faUserCheck} /> Iniciar sesión
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/signup">
                    <FontAwesomeIcon icon={faUserPlus} /> Crear usuario
                  </NavDropdown.Item>
                </div>
              ) : (
                <div>
                  <NavDropdown.Item href="/login">
                    <FontAwesomeIcon icon={faUserEdit} /> Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/signup">
                    <FontAwesomeIcon icon={faDoorOpen} /> Cerrar sesión
                  </NavDropdown.Item>
                </div>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: 35 }} />
    </>
  );
}
