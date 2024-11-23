import React, { useState } from 'react';
import './ForgetPassword.css';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../../API/userAPI';

function ForgetPassword() {
    //set default values
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    //update password
    const updatePw = async (event) => {
        event.preventDefault();

        //both passwords have to match before updating
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // set data to pass into api
        const data = {
            email: email,
            password: newPassword
        };

        //try to update password
        updatePassword(data, navigate);
    };

    return (
        <div id='container-pw'>
            <header>
                <h1 id='header-pw'>Fitness App</h1>
            </header>
            <form className="container-pw" onSubmit={(event) => updatePw(event)}>
                <div className="email-pw">
                    <label id='label-pw' htmlFor="email-pw">Email: </label>
                    <input tabIndex={1} type="email" id="email-pw" value={email} onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div className="password-pw">
                    <label id='label-pw' htmlFor="password-pw">New Password: </label>
                    <input tabIndex={2} type="password" id="password-pw" value={newPassword} minLength={8} maxLength={20} onChange={(e) => setNewPassword(e.target.value)}
                        required />
                </div>
                <div className="empty-pw">
                    <label id="empty-pw">&nbsp</label>
                    <p id='p-pw'>At least 8 to 20 characters</p>
                </div>
                <div className="confirm_password-pw">
                    <label id='label-pw' htmlFor="confirm_password-pw">Confirm Password:</label>
                    <input tabIndex={3} type="password" id="confirm_password-pw" value={confirmPassword} minLength={8} maxLength={20} onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                </div>
                <div className="empty-pw">
                    <label id="empty-pw">&nbsp</label>
                    <p id='p-pw'>At least 8 to 20 characters</p>
                </div>
                <div className="button-pw">
                    <button tabIndex={4} id='update-pw' type='submit'>Update</button>
                </div>
            </form>
        </div>
    );
}

export default ForgetPassword;