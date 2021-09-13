import React from 'react'
import { Navbar,Container, Button, Nav } from 'react-bootstrap'
import './NavBar.css'

function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
            <Navbar.Brand href="/"><img alt="TestME" src="https://res.cloudinary.com/kunalbarve/image/upload/v1630391287/Quiz%20app/TestMe_logo_fh2xjs.png" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        
                    </Nav>
                    <Nav className="d-flex justify-content-between" style={{width:"300px"}}>
                        <Button variant="outline-dark" className="nav-btn">
                            Sign Up
                        </Button>{'   '}
                        <Button style={{color:"white",borderColor:"white"}} className="nav-btn" variant="primary">
                            Sign In
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
