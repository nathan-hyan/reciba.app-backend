import { faColumns, faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav } from "react-bootstrap";

export default function OptionsLoggedIn() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="/">
        <FontAwesomeIcon icon={faHome} /> Principal
      </Nav.Link>
      <Nav.Link href="/invoice/generate">
        <FontAwesomeIcon icon={faPlus} /> Crear nueva boleta
      </Nav.Link>
      <Nav.Link href="/dashboard">
        <FontAwesomeIcon icon={faColumns} /> Dashboard
      </Nav.Link>
    </Nav>
  );
}
