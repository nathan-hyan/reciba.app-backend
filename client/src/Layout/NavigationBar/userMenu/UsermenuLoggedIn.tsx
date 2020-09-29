import { faUserEdit, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UsermenuLoggedIn() {
  return (
    <div>
      <NavDropdown.Item>
        <Link className="text-dark text-decoration-none" to="/profile">
          <FontAwesomeIcon icon={faUserEdit} className="mr-1" /> Perfil
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link className="text-dark text-decoration-none" to="/logout">
          <FontAwesomeIcon icon={faDoorOpen} className="mr-1" /> Cerrar sesión
        </Link>
      </NavDropdown.Item>
    </div>
  );
}
