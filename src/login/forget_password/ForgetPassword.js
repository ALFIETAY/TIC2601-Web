import React from 'react';
import './ForgetPassword.css';
import { useNavigate } from 'react-router-dom';

function updatePw(navigate){
    // var userName=document.getElementById('username');
    // var pw=document.getElementById('password');
    navigate('/login');
}

function ForgetPassword(){
    const navigate=useNavigate();
    return (
        <>
            <header>
                <h1 id='header-pw'> MPT Fitness App</h1>
            </header>
            <form class="container-pw" onSubmit={()=>updatePw(navigate)}>
                    <div class="password-pw">
                        <label id='label-pw' for="password-pw">New Password: </label>
                        <input tabindex="1" type="password" id="password-pw"/>
                    </div>
                    <div class="empty-pw">
                        <label id="empty-pw">&nbsp</label>
                        <p id='p-pw'>At least 8 to 20 characters</p>
                    </div>
                    <div class="confirm_password-pw">
                        <label id='label-pw' for="confirm_password-pw">Confirm Password:</label>
                        <input tabindex="2" type="password" id="confirm_password-pw"/>
                    </div>
                    <div class="empty-pw">
                        <label id="empty-pw">&nbsp</label>
                        <p id='p-pw'>At least 8 to 20 characters</p>
                    </div>
                <div class="button-pw">
                    <button tabIndex={3} id='forgetpw-pw' type='submit'>Update</button>
                </div>
            </form>
        </>
    );
}

export default ForgetPassword;