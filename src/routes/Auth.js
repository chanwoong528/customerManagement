import React, { useState } from "react";
import { firebaseInstance, authService } from "../fbase";
import { Button, Modal } from "react-bootstrap";

import "../css/auth.css";
import google_login from "../img/login_google.png";
function Auth() {
  const SocialLogin = async (e) => {
    e.preventDefault();
    await authService
      .setPersistence(firebaseInstance.auth.Auth.Persistence.SESSION)
      .then(() => {
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        return authService.signInWithPopup(provider);
      })
      .catch((error) => {
        // Handle Errors here.
        alert(error);
      });
  };
  const EmailLogin = async (e) => {
    //to set either auth be Local,Session,None.
    e.preventDefault();
    await authService
      .setPersistence(firebaseInstance.auth.Auth.Persistence.SESSION)
      .then(() => {
        return authService.signInWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        alert(error);
      });
  };
  const AddUser = async (e) => {
    e.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);
      alert("회원가입 완료")
    } catch (err) {
      alert(err);
    }
  };

  const [registerModal, setRegisterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-main">
      <form onSubmit =  {EmailLogin}>
        <div className="login-page-item">
          <h3>회원이름</h3>
          <input
            type="email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="login-page-item">
          <h3>비밀번호</h3>
          <input
            type="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <Button type="submit" variant="primary">
          로그인
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            setRegisterModal(!registerModal);
          }}
        >
          회원가입
        </Button>
      </form>
      <div>
       <img
          className="btn-google"
          src={google_login}
          name="google"
          onClick={SocialLogin}
        />
      </div>
      <RegisterModal
        setRegisterModal={setRegisterModal}
        setEmail={setEmail}
        setPassword={setPassword}
        AddUser={AddUser}
        SocialLogin={SocialLogin}
        show={registerModal}
        onHide={() => setRegisterModal(false)}
      />
    </div>
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
      <form onSubmit={props.AddUser}>
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
          <Button type="submit" variant="primary">
            회원가입
          </Button>

          <Button onClick={props.onHide} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default Auth;
