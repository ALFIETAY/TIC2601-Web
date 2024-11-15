import React,{useState} from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const serverPort = 3001;

//create new user
const createUser = async(event,username, email,password,confirm_password,navigate) => {
    event.preventDefault();

    //ensure both passwords match
    if (password!==confirm_password){
        alert('Password do not match');
        return;
    }
    
    //set up data for api
    const data={username,email,password};

    //try to create user
    try{
        const response= await fetch(`http://localhost:${serverPort}/api/users/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        //if successful, go to create profile, pass userID and username to the page
        if(response.status === 200){
            const user = await response.json();
            localStorage.setItem('userID', user.user.userId);
            localStorage.setItem('username',user.user.username);
            localStorage.setItem('token',user.token);
            navigate('/signup/create_profile');
        }
        //else if user already exist
        else if (response.status === 400){
            alert('Username or Email already exists');
        }
    }
    catch (error){
        console.error(error);
    }
    
}

function Signup(){
    //default values
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm_password,setConfirmPassword]=useState('');

    const navigate=useNavigate();
    
    return (
        <div id='container-signup'>
            <header>
                <h1 id="header-signup">Fitness App</h1>
            </header>
            <form className="container-signup" onSubmit={(event) => createUser(event,username,email,password,confirm_password,navigate)}>
                <div className="username-signup">
                    <label id="label-signup" htmlFor="username-signup">Username: </label>
                    <input type="text" id="username-signup" value={username} 
                    onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="email-signup">
                    <label id="label-signup" htmlFor="email-signup">Email: </label>
                    <input type="email" id="email-signup" value={email} 
                    onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="password-signup">
                    <label id="label-signup"htmlFor="password-signup">Password:</label>
                    <input type="password" id="password-signup" value={password} 
                    onChange={(e) => setPassword(e.target.value)} required minLength={8} maxLength={20}/>
                </div>
                <div className="empty-signup">
                    <label id="empty-signup">&nbsp</label>
                    <p id="p-signup">At least 8 to 20 characters</p>
                </div>
                <div className="confirm_password-signup">
                    <label id="label-signup" htmlFor="confirm_password-signup">Re-enter Password:</label>
                    <input type="password" id="confirm_password-signup" value={confirm_password} 
                    onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} maxLength={20}/>
                </div>
                <div className="empty-signup">
                    <label id="empty-signup">&nbsp</label>
                    <p id="p-signup">At least 8 to 20 characters</p>
                </div>
                <div className="button-signup">
                    <button id='signup-signup' type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;