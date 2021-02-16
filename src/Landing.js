import React from "react";
import "./Landing.css";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Sidebar from "./Sidebar";
import Body from "./Body";
function Landing() {
  return (
    <div className="landing">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/preview">
            <div className="preview">
              <Sidebar />
              <Body />
            </div>
          </Route>
          <Route path="/">
            <div className="landing_page">
              <div className="landing_contents">
                <img
                  className="whatsApp_Logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png"
                  alt=""
                />

                <div className="landing_buttons">
                  <Link to="/login">
                    <Button className="landing_button">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="landing_button">SignUp</Button>
                  </Link>
                  <Link to="/preview">
                    <Button className="landing_button">Preview</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Landing;
