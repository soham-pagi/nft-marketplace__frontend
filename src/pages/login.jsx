import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../components/loginAndSignUp/LoginAndSignUp";

const Login = () => {
  return (
    <div className={Style.login} style={{marginTop: 94}}>
      <div className={Style.login_box}>
        <h1>Login</h1>
        <LoginAndSignUp />
        <p className={Style.login_box_para}>
          New user? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
