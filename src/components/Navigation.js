import React from "react";
import  { authService } from "../fbase";
import {
  
  Navbar,
  Nav,
  
 } from "react-bootstrap";
import { useHistory } from "react-router";

function Navigation(props) {
  const history = useHistory();
  function signOut() {
    history.push("/home");
    authService.signOut();
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">부동산 고객관리</Navbar.Brand>
        <Nav className="mr-auto">
          {props.isLogIn ? (
            <Nav.Link href="/Auth" onClick={() => {signOut()}}>
              로그아웃
            </Nav.Link>
            
          ) : (
            <Nav.Link href="/Auth" onClick={() => {}}>
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
