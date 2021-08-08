import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
function Navigation() {
    return (
        <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="#">Irvin's</Navbar.Brand>
    <Nav className="text-dark">
      <NavLink to="/" className="mx-2">Home</NavLink>
      <NavLink to="/products" className="mx-2">Add</NavLink>
      <NavLink to="/" className="mx-2" >Pricing</NavLink>
    </Nav>
    </Container>
  </Navbar>
    )
}

export default Navigation
