import React, {useEffect, useState} from 'react';
import './Profile.css';
import {logout} from '../../Protect';
import {addMeasurement, getLatestMeasurement} from '../../API/measurementAPI';
import {Link, useNavigate} from 'react-router-dom';

//update measurements
const update = async (event,isEditMode, setMode, userID, token, weight, bodyFat, waistLine) => {
    event.preventDefault();

    //enable edit mode
    if (!isEditMode){
        setMode(true);
        return;
    }

    //set up data for api
    const data = {user_id: userID, weight: weight, bodyfat_percentage: bodyFat, waistline: waistLine};

    //try inserting new measurement
    addMeasurement(data, token);

    //Disable edit mode
    setMode(false);
}

//cancel
const cancel = (event, isEditMode,setMode, navigate) =>{
    event.preventDefault();
    
    //disable edit mode if is currently in edit mode
    setMode(!isEditMode);
    //else return to home page
    if (!isEditMode){
        navigate('/home');

    }
}

function Profile(){
    //get userID and token
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');

    //set default values
    const [isEditMode,setMode] = useState(false);
    const [weight, setWeight] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);
    const [waistLine, setWaistLine]=useState(0);
    const navigate = useNavigate();

    //get latest measurement of user once there is a change in userID
    useEffect(() => {
        getLatestMeasurement(userID, token, setWeight, setBodyFat, setWaistLine);
    }, [userID]);
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
                    <li tabIndex="4" style={{float: "right"}}>
                        
                    <Link to="/" className='menu-link' tabIndex={4} onClick={(e)=>logout(e)}>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
            <form className='measurements-profile' onSubmit={(event) => update(event,isEditMode,setMode, userID, token, weight, bodyFat, waistLine)}>
                <fieldset>
                    <legend>Measurements</legend>
                    <div className="weight-profile">
                        <label id='label-profile' htmlFor="weight-profile">Weight (kg): </label>
                        <input type="number" id="weight-profile" disabled={!isEditMode} value={weight} onChange={(e) => setWeight(e.target.value)} step={0.1}/>
                    </div>
                    <div className="bodyFat-profile">
                        <label id='label-profile' htmlFor="bodyFat-profile">Body Fat (%): </label>
                        <input type="number" id="bodyFat-profile" disabled={!isEditMode} value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} step={0.1}/>
                    </div>
                    <div className="waistLine-profile">
                        <label id='label-profile' htmlFor="waistLine-profile">Waistline (cm): </label>
                        <input type="number" id="waistLine-profile" disabled={!isEditMode} value={waistLine} onChange={(e) => setWaistLine(e.target.value)} step={0.1}/>
                    </div>
                </fieldset>
                <div className="btn-profile">
                <div>
                    <button id='edit-profile' type='submit'>{isEditMode? 'Save':'Edit'}</button>
                </div>
                <div>
                    <button id='cancel-profile' onClick={(event) => cancel(event,isEditMode,setMode, navigate)}>Cancel</button>
                </div>
            </div>
            </form>
            
        </>
    );
}

export default Profile;