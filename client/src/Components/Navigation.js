import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
function Navigation() {
    return (
        
   
      <Navbar bg="dark" text="light">
    <Navbar.Brand className="text-warning mx-3" href="#">Irvin's</Navbar.Brand>
    <Nav>
      <NavLink to="/" className="text-warning mx-2 nav-link">Home</NavLink>
      <NavLink to="/products" className="text-warning mx-2 nav-link">Add</NavLink>
      <NavLink to="/info" className="text-warning mx-2 nav-link" >Info</NavLink>
    </Nav>
    </Navbar>
   
  
    )
}

export default Navigation
