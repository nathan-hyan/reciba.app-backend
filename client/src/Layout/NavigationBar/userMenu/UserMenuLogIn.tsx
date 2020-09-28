import { faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavDropdown } from "react-bootstrap";

export default function UserMenuLogOut() {
  return (
    <div>
      <NavDropdown.Item href="/login">
        <FontAwesomeIcon icon={faUserCheck} /> Iniciar sesión
      </NavDropdown.Item>
      <NavDropdown.Item href="/signup">
        <FontAwesomeIcon icon={faUserPlus} /> Crear usuario
      </NavDropdown.Item>
    </div>
  );
}
