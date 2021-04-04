import React, { useState } from "react";
import { firebaseInstance, authService } from "../fbase";
import { Button, Modal } from "react-bootstrap";

function Auth() {
  const SocialLogin = async (e) => {
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };
  const EmailLogin = async (e) => {
    
    await authService.setPersistence(
      firebaseInstance.auth.Auth.Persistence.LOCAL
    ); //to set either auth be Local,Session,None.

    await authService.signInWithEmailAndPassword(email, password);
  };
  const AddUser = async (e) => {
    
     await authService.createUserWithEmailAndPassword(email, password);
     await authService.signInWithEmailAndPassword(email, password);
  };

  const [registerModal, setRegisterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginModal, setLoginModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setRegisterModal(!registerModal);
          setLoginModal(false);
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          setLoginModal(!loginModal);
          setRegisterModal(false);
        }}
      >
        로그인
      </button>

      <LoginModal
        setRegisterModal={setRegisterModal}
        setEmail={setEmail}
        setPassword={setPassword}
        setLoginModal={setLoginModal}
        EmailLogin={EmailLogin}
        SocialLogin={SocialLogin}
        show={loginModal}
        onHide={() => setLoginModal(false)}
      />

      <RegisterModal
        setRegisterModal={setRegisterModal}
        setEmail={setEmail}
        setPassword={setPassword}
        AddUser={AddUser}
        SocialLogin={SocialLogin}
        show={registerModal}
        onHide={() => setRegisterModal(false)}
      />
    </>
  );
}
function RegisterModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="register-page-item">
          <h3>이메일 :</h3>
          <input
            type="email"
            required
            onChange={(event) => {
              props.setEmail(event.target.value);
            }}
          />
        </div>
        <div className="register-page-item">
          <h3>비밀번호 :</h3>
          <input
            type="password"
            required
            onChange={(event) => {
              props.setPassword(event.target.value);
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.AddUser} variant="primary">
          회원가입{" "}
        </Button>{" "}
        <Button
          onClick={() => {
            props.SocialLogin();
          }}
          variant="primary"
        >
          구글{" "}
        </Button>{" "}
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function LoginModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-page-item">
          <h3>회원이름</h3>
          <input
            type="email"
            required
            onChange={(event) => {
              props.setEmail(event.target.value);
            }}
          />
        </div>
        <div className="login-page-item">
          <h3>비밀번호</h3>
          <input
            type="password"
            required
            onChange={(event) => {
              props.setPassword(event.target.value);
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.EmailLogin();
          }}
          variant="primary"
        >
          로그인
        </Button>
        <Button
          onClick={() => {
            props.setRegisterModal(true);
            props.setLoginModal(false);
          }}
          variant="primary"
        >
          회원가입
        </Button>
        <Button onClick={props.SocialLogin} variant="primary">
          구글로 로그인
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Auth;
