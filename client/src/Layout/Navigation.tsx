import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserPlus, faHome, faUserEdit, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../Context/UserContext';

export default function Navigation() {

    const user = useContext(UserContext);

    return (
        <Navbar style={{ zIndex: 999 }} bg="primary" variant='dark' expand="lg">
            <Navbar.Brand href="/">Bills App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link href="/"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                </Nav>
                <Nav className='ml-auto'>
                    <NavDropdown title={`Signed in as ${user.isLoggedIn ? user.name : 'Guest'}`} id="collasible-nav-dropdown">
                        {!user.isLoggedIn ? (
                            <div>
                                <NavDropdown.Item href="/login"><FontAwesomeIcon icon={faUserCheck} /> Login</NavDropdown.Item>
                                <NavDropdown.Item href="/signup"><FontAwesomeIcon icon={faUserPlus} /> Signup</NavDropdown.Item>
                            </div>) : (<div>
                                <NavDropdown.Item href="/login"><FontAwesomeIcon icon={faUserEdit} /> Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/signup"><FontAwesomeIcon icon={faDoorOpen} /> Log off</NavDropdown.Item>
                            </div>)}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
