import React,{useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './Login.css';

//login
const user = async (event, email,password,navigate) => {
    event.preventDefault();

    //set up data for api
    const data = {email, password};

    //try to login
    try {
        const response = await fetch ('http://localhost:5001/api/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200){
            const check = await response.json();
            navigate('/home',{state: {userID: check.user.userId, username: check.user.username}});
            return;
        }
        else if (response.status === 401){
            alert('Wrong Username or Password');
            return;
        }
    }catch (error){
        console.error('POST error: ',error);
    }
    return;
}

function Login(){
    //set default values
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate();

    return (
        <div id='container-login'>
            <header>
                <h1 id="header-login">Fitness App</h1>
            </header>
            <form className="container-login" onSubmit={(event)=>user(event,email,password,navigate)}>
                <div className="email-login">
                    <label id='label-login' htmlFor="email-login">Email: </label>
                    <input tabIndex="1" type="email" id="email-login" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="password-login">
                    <label id='label-login' htmlFor="password-login">Password:</label>
                    <input tabIndex="2" type="password" id="password-login" value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
        </div>
    );
}

export default Login;