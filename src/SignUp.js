import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./SignUp.css";
import db, { auth } from "./firebase";
import { useHistory } from "react-router-dom";
function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [name, setName] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmailMsg, setErrorEmailMsg] = useState("");
  const [errorPasswordMsg, setErrorPasswordMsg] = useState("");
  const [errorNameMsg, setErrorNameMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorEmail(false);
    setErrorPassword(false);
    setErrorName(false);
    setErrorEmailMsg("");
    setErrorPasswordMsg("");
    setErrorNameMsg("");

    if (!name) {
      setErrorName(true);
      setErrorNameMsg("Name cannot be empty");
      return;
    }
    if (!email) {
      setErrorEmail(true);
      setErrorEmailMsg("Email cannot be empty");
      return;
    }

    if (password !== Cpassword) {
      setErrorPassword(true);
      setErrorPasswordMsg("Both password should be same");
      return;
    }
    if (password.length < 8) {
      setErrorPassword(true);
      setErrorPasswordMsg("Password should be atleast 8 characters");
      return;
    }

    const regex = /[^\w\s]+/;
    if (regex.exec(name)) {
      setErrorName(true);
      setErrorNameMsg("Only alphanumeric allowed");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const uid = auth.currentUser.uid;

        db.collection("users").doc(uid).set({
          uid: uid,
          name: name,
          email: email,
          imgURL: "",
        });

        history.push("/login");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setErrorEmail(true);
          setErrorEmailMsg("Invalid Email");
        } else if (error.code === "auth/email-already-in-use") {
          setErrorEmail(true);
          setErrorEmailMsg("Email already exists");
        } else {
          alert(error);
        }
      });
  };
  return (
    <div className="signup">
      <div className="signup_page">
        <div className="signup_contents">
          <h1>Sign Up</h1>
          <form className="signup_form">
            <TextField
              className="signup_textfield"
              variant="outlined"
              type="text"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              error={errorName}
              helperText={errorName ? errorNameMsg : ""}
            />
            <TextField
              className="signup_textfield"
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
              className="signup_textfield"
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
            <TextField
              className="signup_textfield"
              variant="outlined"
              type="password"
              label="Confirm Password"
              value={Cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              error={errorPassword}
              helperText={errorPassword ? errorPasswordMsg : ""}
            />
            <Button
              className="signup_button"
              variant="outlined"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
