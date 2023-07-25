import React, { useState } from "react";
import classes from "./Login.module.css";
import { login } from "../api/connectDB";
import { redirect } from "react-router-dom";

function LoginPage() {
  const [currentInputs, updateCurrentInputs] = useState({
    loginUsername: "",
    loginPassword: "",
    registerUsername: "",
    registerPassword: "",
    registerPassword2: "",
    registerName: "",
    registerEmail: "",
  });
  const [loginForm, setLogginForm]=useState(true);
  const [registerForm, setRegisterForm]=useState(false);


  function handleLoginChanges(event) {
    if (event.target.name === "loginUsername") {
      updateCurrentInputs({
        loginUsername: event.target.value,
        loginPassword: currentInputs.loginPassword,
      });
    }
    if (event.target.name === "loginPassword") {
      updateCurrentInputs({
        loginUsername: currentInputs.loginUsername,
        loginPassword: event.target.value,
      });
    }
  }


  function handleRegisterChanges(event) {
    switch (event.target.name) {
      case "registerName":
        updateCurrentInputs({
          ...currentInputs,
          registerName: event.target.value,
        });
        break;
      case "registerEmail":
        updateCurrentInputs({
          ...currentInputs,
          registerEmail: event.target.value,
        });
        break;
      case "registerUsername":
        updateCurrentInputs({
          ...currentInputs,
          registerUsername: event.target.value,
        });
        break;
      case "registerPassword":
        updateCurrentInputs({
          ...currentInputs,
          registerPassword: event.target.value,
        });
        break;
      case "registerPassword2":
        updateCurrentInputs({
          ...currentInputs,
          registerPassword2: event.target.value,
        });
        break;
    }
  }


  async function loginHandler(e) {
    e.preventDefault();
    const submitData=JSON.stringify(currentInputs)

    const data = await login(submitData);
    // const json=data.data.slice(25);
    // const loggedIn=JSON.parse(json);
    console.log(data.data);
    // if(!loggedIn.error){
    //   return redirect("/");
    // }
  }
  function toggleRegister(){
    setLogginForm(!loginForm);
    setRegisterForm(!registerForm)
  }

  return (
    <div className={classes.card}>
      {loginForm && <form className={classes.form}>
        <label htmlFor="loginUsername">Username</label>
        <input
          id="loginUsername"
          type="text"
          name="loginUsername"
          placeholder="JohnDoe"
          onChange={handleLoginChanges}
          value={currentInputs.loginUsername}
        ></input>
        <label htmlFor="loginPassword">password</label>
        <input
          id="loginPassword"
          type="password"
          name="loginPassword"
          placeholder="password"
          onChange={handleLoginChanges}
          value={currentInputs.loginPassword}
        ></input>
        <span className={classes.toggleRegister} onClick={toggleRegister}>
          don't have an account yet? sign up here
        </span>
        <button type="submit" onClick={loginHandler}>
          Login
        </button>
      </form>}
      {registerForm && <form className={classes.form}>
        <label htmlFor="registerName">Name</label>
        <input
          id="registerName"
          type="text"
          name="registerName"
          placeholder="John"
          onChange={handleRegisterChanges}
          value={currentInputs.registerName}
        ></input>
        <label htmlFor="registerEmail">Email</label>
        <input
          id="registerEmail"
          type="email"
          name="registerEmail"
          placeholder="JohnDoe@example.com"
          onChange={handleRegisterChanges}
          value={currentInputs.registerEmail}
        ></input>
        <label htmlFor="registerUsername">Username</label>
        <input
          id="registerUsername"
          type="text"
          name="registerUsername"
          placeholder="JohnDoe"
          onChange={handleRegisterChanges}
          value={currentInputs.registerUsername}
        ></input>
        <label htmlFor="registerPassword">password</label>
        <input
          id="registerPassword"
          type="password"
          name="registerPassword"
          placeholder="password"
          onChange={handleRegisterChanges}
          value={currentInputs.registerPassword}
        ></input>
        <label htmlFor="registerPassword2">Confirm password</label>
        <input
          id="registerPassword2"
          type="password"
          name="registerPassword2"
          placeholder="confirm password"
          onChange={handleRegisterChanges}
          value={currentInputs.registerPassword2}
        ></input>
        <span className={classes.toggleRegister} onClick={toggleRegister}>Have an account? Login!</span>
        <button type="submit">Register</button>
      </form>}
    </div>
  );
}

export default LoginPage;
