import { faColumns, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav } from "react-bootstrap";

export default function OptionsLogIn() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="/">
        <FontAwesomeIcon icon={faHome} /> Principal
      </Nav.Link>
      <Nav.Link href="/dashboard">
        <FontAwesomeIcon icon={faColumns} /> Dashboard
      </Nav.Link>
    </Nav>
  );
}
