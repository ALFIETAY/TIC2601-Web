import React,{useState} from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function createUser(event,username, email,password,confirm_password,navigate){
    event.preventDefault();
    if (password!==confirm_password){
        alert('Password do not match');
        return;
    }
    
    navigate("/signup/create_profile");
}

function Signup(){
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm_password,setConfirmPassword]=useState('');
    const navigate=useNavigate();
    return (
        <>
            <header>
                <h1 id="header-signup"> MPT Fitness App</h1>
            </header>
            <form className="container-signup" onSubmit={(event) => createUser(event,username,email,password,confirm_password,navigate)}>
                <div className="username-signup">
                    <label id="label-signup" htmlFor="username-signup">Username: </label>
                    <input type="text" id="username-signup" value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="email-signup">
                    <label id="label-signup" htmlFor="email-signup">Email: </label>
                    <input type="email" id="email-signup" value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password-signup">
                    <label id="label-signup"htmlFor="password-signup">Password:</label>
                    <input type="password" id="password-signup" value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="empty-signup">
                    <label id="empty-signup">&nbsp</label>
                    <p id="p-signup">At least 8 to 20 characters</p>
                </div>
                <div className="confirm_password-signup">
                    <label id="label-signup" htmlFor="confirm_password-signup">Confirm Password:</label>
                    <input type="password" id="confirm_password-signup" value={confirm_password} 
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div className="empty-signup">
                    <label id="empty-signup">&nbsp</label>
                    <p id="p-signup">At least 8 to 20 characters</p>
                </div>
                <div className="button-signup">
                    <button id='signup-signup' type="submit">Sign Up</button>
                </div>
            </form>
            
        </>
    );
}

export default Signup;