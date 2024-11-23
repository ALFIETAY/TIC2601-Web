import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../API/userAPI';

function Login() {
    //set default values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    //login
    const user = async (event) => {
        event.preventDefault();

        //set up data for api
        const data = { email, password };

        //try to login
        login(data, navigate);
    }
    return (
        <div id='container-login'>
            <header>
                <h1 id="header-login">Fitness App</h1>
            </header>
            <form className="container-login" onSubmit={(event) => user(event)}>
                <div className="email-login">
                    <label id='label-login' htmlFor="email-login">Email: </label>
                    <input tabIndex="1" type="email" id="email-login" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="password-login">
                    <label id='label-login' htmlFor="password-login">Password:</label>
                    <input tabIndex="2" type="password" id="password-login" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="container-forgetpw">
                    <Link to="forget_password" tabIndex={3} className='forgetpw'>
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