import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserPlus, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Navigation() {
    return (
        <Navbar bg="primary" variant='dark' expand="lg">
            <Navbar.Brand href="/">Bills App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link href="/"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                </Nav>
                <Nav className='ml-auto'>
                    <NavDropdown title="Signed in as Guest" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/login"><FontAwesomeIcon icon={faUserCheck} /> Login</NavDropdown.Item>
                        <NavDropdown.Item href="/signup"><FontAwesomeIcon icon={faUserPlus} /> Signup</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
