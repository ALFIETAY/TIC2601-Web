import React, { useState } from 'react';
import './CreateProfile.css';
import { addMeasurement } from '../../../API/measurementAPI';
import { useNavigate } from 'react-router-dom';

function CreateProfile() {
    //default values
    const [weight, setWeight] = useState(0);
    const [waistline, setWaistline] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);

    const navigate = useNavigate();

    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');

    //create new measurement data of user
    const create = async (event) => {
        event.preventDefault();

        //set up data for api
        const data = { user_id: userID, weight: weight, bodyfat_percentage: bodyFat, waistline: waistline };

        //try adding measurement
        if (addMeasurement(data)) {
            navigate('/home');
        };
    }

    //cancel creating profile
    const cancel = (event, navigate) => {
        event.preventDefault();
        navigate('/home');
    }

    return (
        <div id='container-createProfile'>
            <div className="header-createProfile"></div>
            <form className='measurements-createProfile'
                onSubmit={(event) => create(event)}>
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