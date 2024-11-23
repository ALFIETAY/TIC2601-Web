import React, { useEffect, useState } from 'react';
import './Profile.css';
import { logout } from '../../Protect';
import { addMeasurement, getLatestMeasurement } from '../../API/measurementAPI';
import { Link, useNavigate } from 'react-router-dom';


const Measurements = () => {
    //get userID
    const userID = localStorage.getItem('userID');

    //set default values
    const [isEditMode, setMode] = useState(false);
    const [weight, setWeight] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);
    const [waistLine, setWaistLine] = useState(0);
    const navigate = useNavigate();

    //get latest measurement of user once there is a change in userID
    useEffect(() => {
        getLatestMeasurement(userID, setWeight, setBodyFat, setWaistLine);
    }, []);

    //update measurements
    const update = async (event) => {
        event.preventDefault();

        //enable edit mode
        if (!isEditMode) {
            setMode(true);
            return;
        }

        //set up data for api
        const data = { user_id: userID, weight: weight, bodyfat_percentage: bodyFat, waistline: waistLine };

        //try inserting new measurement
        addMeasurement(data);

        //Disable edit mode
        setMode(false);
    }

    //cancel
    const cancel = (event) => {
        event.preventDefault();

        //Change mode
        setMode(!isEditMode);
        //if already not in edit mode, return home
        if (!isEditMode) {
            navigate('/home');

        }
    }


    return (
        <form className='measurements-profile' onSubmit={(event) => update(event)}>
            <fieldset>
                <legend>Measurements</legend>
                <div className="weight-profile">
                    <label id='label-profile' htmlFor="weight-profile">Weight (kg): </label>
                    <input type="number" id="weight-profile" disabled={!isEditMode} value={weight} onChange={(e) => setWeight(e.target.value)} step={0.1} />
                </div>
                <div className="bodyFat-profile">
                    <label id='label-profile' htmlFor="bodyFat-profile">Body Fat (%): </label>
                    <input type="number" id="bodyFat-profile" disabled={!isEditMode} value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} step={0.1} />
                </div>
                <div className="waistLine-profile">
                    <label id='label-profile' htmlFor="waistLine-profile">Waistline (cm): </label>
                    <input type="number" id="waistLine-profile" disabled={!isEditMode} value={waistLine} onChange={(e) => setWaistLine(e.target.value)} step={0.1} />
                </div>
            </fieldset>
            <div className="btn-profile">
                <div>
                    <button id='edit-profile' type='submit'>{isEditMode ? 'Save' : 'Edit'}</button>
                </div>
                <div>
                    <button id='cancel-profile' onClick={(event) => cancel(event)}>Cancel</button>
                </div>
            </div>
        </form>
    );
}

function Profile() {


    return (
        <>
            <nav id='menu'>
                <ul className="menu_1">
                    <li tabIndex="3">
                        <Link to="/workouts" className='menu-link'>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li tabIndex="2">
                        <Link to="/profile" className='menu-link active'>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2">
                    <li tabIndex="1">
                        <Link to="/home" className='menu-link'>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li tabIndex="4" style={{ float: "right" }}>

                        <Link to="/" className='menu-link' tabIndex={4} onClick={(e) => logout(e)}>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
            <Measurements />
        </>
    );
}

export default Profile;