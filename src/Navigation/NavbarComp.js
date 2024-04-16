import React, { Component } from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Routes,
    Route, 
    Link
} from "react-router-dom";

//import CameraComponent from "../CameraComponent";
import HomePage from "../HomePage";
import CameraPage from "../CameraPage";
import ModelViewer from "../ModelViewer";
import UserTutorialPage from "../UserTutorialPage";
import logo from "../images/clotoure_logo.png"

function NavbarComp() {
    return (
        <Router>
        <div>
        <Navbar bg="light" variant={"light"} expand="lg">
            <Container>
                {<Navbar.Brand as={Link} to={"/"}>
                    <img
                        alt=""
                        src= {logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                         />{' '}
                     Clotoure </Navbar.Brand>}
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"}> Home </Nav.Link>
                        <Nav.Link as={Link} to={"/camera"}>Camera Page</Nav.Link>
                        <Nav.Link as={Link} to={"/tutorial"}>Tutorial</Nav.Link>
                        <Nav.Link as={Link} to={"/modelviewer"}>Model Viewer</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>    
        </div>
        <div>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/camera" element={<CameraPage />} />
                <Route exact path="/tutorial" element={<UserTutorialPage />} />
                <Route exact path="/modeliewer" element={<ModelViewer />} />
            </Routes>
        </div>
        </Router>
    );
}
export default NavbarComp;

