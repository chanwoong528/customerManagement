import React from "react";
import  { authService } from "../fbase";
import {
  
  Navbar,
  Nav,
  
 } from "react-bootstrap";
 import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function Navigation(props) {
  const history = useHistory();
  function signOut() {
    history.push("/");
    authService.signOut();
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">부동산 고객관리</Navbar.Brand>
        <Nav className="mr-auto">
          {props.isLogIn ? (
            <Nav.Link as={Link} to="/" onClick={() => {signOut()}}>
              로그아웃
            </Nav.Link>
            
          ) : (
            <Nav.Link as={Link} to="/" onClick={() => {}}>
              로그인
            </Nav.Link>
          )}

          
        </Nav>
        
      </Navbar>
      <br />
    </>
  );
}

export default Navigation;
