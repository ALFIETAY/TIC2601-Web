import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './Login.css';

function user(navigate){
    // var userName=document.getElementById('username');
    // var pw=document.getElementById('password');
    navigate('/home');
}

function Login(){
    const navigate=useNavigate();
    return (
        <>
            <header>
                <h1 id="header-login"> MPT Fitness App</h1>
            </header>
            <form className="container-login" onSubmit={()=>user(navigate)}>
                <div className="username-login">
                    <label id='label-login' htmlFor="username-login">Username: </label>
                    <input tabindex="1" type="text" id="username-login"/>
                </div>
                <div className="password-login">
                    <label id='label-login' htmlFor="password-login">Password:</label>
                    <input tabindex="2" type="password" id="password-login"/>
                </div>
            <div className="container-forgetpw">
                <Link to="/login/forget_password" tabIndex={3} className='forgetpw'>
                    Forgot Password
                </Link>
            </div>
            <div className="button-login">
                <button tabIndex={4} id="login-login" type='submit'>Login</button>
            </div>
            </form>
        </>
    );
}

export default Login;