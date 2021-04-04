import React from "react";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
//import Profile from "../routes/Profile";

import Navigation from "./Navigation";

function AppRouter(props) {
  return (
    <Router>
      {props.isLogIn && <Navigation isLogIn={props.isLogIn}></Navigation>}
      <>
        <Switch>
          {props.isLogIn ? (
            <>
              <Route exact path="/">
                <Home userObj={props.userObj} />
              </Route>
            </>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </Switch>
      </>
      <footer> 부동산고객리스트</footer>
    </Router>
  );
}

export default AppRouter;
