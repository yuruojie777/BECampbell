import React from "react";
import '../css/login.css';
const Login = ()=>{
    return (
        <div>
           <div className="homeLogo">
                <img src="logo.png" alt="logo"/>
            </div>
            <div className="loginContainer">
                <h1>Start Your Work Here</h1>
                
                <div className="control-form">
                    <input className="account"/>
                </div>
                <div className="control-form">
                    <input className="password"/>
                </div>
                <button>Login</button>
                <p >By continuing, you are indicating that you accept our Terms of Service and Privacy Policy.</p>
            </div>
        </div>
    )
}

export default Login;