import React, { useState } from 'react';
import './CreateProfile.css';
import { useLocation, useNavigate } from 'react-router-dom';

//create new measurement data of user
const create = async (event, userID, token, weight, waistline, bodyFat, navigate) => {
    event.preventDefault();

    //set up data for api
    const data = { user_id: userID, weight: weight, bodyfat_percentage: bodyFat, waistline: waistline };

    //try adding measurement
    try {
        const response = await fetch(`http://localhost:5001/api/measurements/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        //if successfully, go to home page
        if (response.status === 201) {
            navigate('/home');
        }
        else {
            alert('Error creating profile.');
        }
    }
    catch (error) {
        console.error('POST error', error);
    }
    return;
}

const cancel = (event, navigate) => {
    event.preventDefault();
    navigate('/home');
}

function CreateProfile() {
    //default values
    const [weight, setWeight] = useState(0);
    const [waistline, setWaistline] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);

    const navigate = useNavigate();

    // const location = useLocation();
    // const {userID, username} = location.state || {}; //userID and username passed from signup
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(token);
    return (
        <div id='container-createProfile'>
            <div className="header-createProfile"></div>
            <form className='measurements-createProfile'
                onSubmit={(event) => create(event, userID, token, weight, waistline, bodyFat, navigate)}>
                <fieldset>
                    <legend>{username} Measurements</legend>
                    <div className="weight-createProfile">
                        <label id='label-createProfile' htmlFor="weight-createProfile">Weight (kg): </label>
                        <input type="number" id="weight-createProfile" value={weight}
                            onChange={(e) => setWeight(e.target.value)} required />
                    </div>
                    <div className="bodyFat-createProfile">
                        <label id='label-createProfile' htmlFor="bodyFat-createProfile">Body Fat (%): </label>
                        <input type="number" id="bodyFat-createProfile" value={bodyFat}
                            onChange={(e) => setBodyFat(e.target.value)} required />
                    </div>
                    <div className="waistLine-createProfile">
                        <label id='label-createProfile' htmlFor="waistLine-createProfile">Waistline (cm): </label>
                        <input type="number" id="waistLine-createProfile" value={waistline}
                            onChange={(e) => setWaistline(e.target.value)} required />
                    </div>
                </fieldset>

                <div className="btn-createProfile">
                    <div>
                        <button id='create-createProfile' type='submit'>Create</button>
                    </div>
                    <div>
                        <button id='cancel-createProfile' onClick={(event) => cancel(event, navigate)}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateProfile;