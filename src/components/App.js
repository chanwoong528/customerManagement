import React, { useState, useEffect } from "react";
import AppRouter from "./Routes";
import  { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
        setUserObj(user);
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLogIn={isLogIn} userObj={userObj} />
      ) : (
        "waiting for the firebase..."
      )}
    </>
  );
}

export default App;
