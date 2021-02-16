import React, { useState } from "react";
import "./Login.css";
import { TextField, Button } from "@material-ui/core";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMsg, setErrorEmailMsg] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMsg, setErrorPasswordMsg] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorPasswordMsg("");
    setErrorEmailMsg("");
    setErrorEmail(false);
    setErrorPassword(false);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setErrorPasswordMsg("");
        setErrorEmailMsg("Invalid username or password");
        setErrorEmail(true);
        setErrorPassword(true);
      });
  };

  return (
    <div className="login">
      <div className="login_page">
        <div className="login_contents">
          <h1>Login</h1>
          <form className="login_form">
            <TextField
              className="login_textfield"
              variant="outlined"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={errorEmail}
              helperText={errorEmail ? errorEmailMsg : ""}
            />
            <TextField
              className="login_textfield"
              variant="outlined"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={errorPassword}
              helperText={errorPassword ? errorPasswordMsg : ""}
            />
            <Button
              className="login_button"
              variant="outlined"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
