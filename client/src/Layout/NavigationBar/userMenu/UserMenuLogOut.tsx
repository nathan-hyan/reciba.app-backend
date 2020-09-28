import { faUserEdit, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavDropdown } from "react-bootstrap";

export default function UserMenuLogOut() {
  return (
    <div>
      <NavDropdown.Item href="/login">
        <FontAwesomeIcon icon={faUserEdit} /> Perfil
      </NavDropdown.Item>
      <NavDropdown.Item href="/signup">
        <FontAwesomeIcon icon={faDoorOpen} /> Cerrar sesión
      </NavDropdown.Item>
    </div>
  );
}
