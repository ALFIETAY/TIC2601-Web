import React, {useEffect, useState} from 'react';
import './Profile.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';

//get last logged measurement of user
const getLatestMeasurement = async (userID,setWeight,setBodyFat,setWaistLine) =>{
    try{
        const response = await fetch (`http://localhost:5001/api/measurements/latest/${userID}`, {
            method: 'GET'
        });
        if (response.status === 200){
            const data = await response.json();

            //set values for display
            setWeight(data.measurement.weight);
            setBodyFat(data.measurement.bodyfat_percentage);
            setWaistLine(data.measurement.waistline);
        }
    }
    catch(error){
        console.error (error);
    }
}

//update measurements
const update = async (event,buttonText,setText, setDisabled, userID, weight, bodyFat, waistLine) => {
    event.preventDefault();

    //enable edit mode
    if (buttonText === 'Edit'){
        setDisabled(false);
        setText('Save');
        return;
    }

    //set up data for api
    const data = {user_id: userID, weight: weight, bodyfat_percentage: bodyFat, waistline: waistLine};

    //try inserting new measurement
    try{
        const response = await fetch (`http://localhost:5001/api/measurements/add`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.status === 201){
            alert('Measurement updated successfully');
        }
    }
    catch(error){
        console.error('PUT error', error);
    }

    //Disable edit mode
    setDisabled(true);
    setText('Edit');
    return;
}

//cancel
const cancel = (event, userID,username,deload, buttonText,setText,setDisabled,navigate) =>{
    event.preventDefault();
    
    //disable edit mode if is currently in edit mode
    if (buttonText === 'Save'){
        setDisabled(true);
        setText('Edit');
        return;
    }
    //else return to home page
    navigate('/home', {state: {userID: userID, username:username}});
}

function Profile(){
    const location = useLocation();

    //get userID and deload status from previous page
    const {userID, username, deload} = location.state || {};

    //set default values
    const [buttonText,setText] = useState('Edit');
    const [disabled,setDisabled] = useState(true);
    const [weight, setWeight] = useState('0');
    const [bodyFat, setBodyFat] = useState('0');
    const [waistLine, setWaistLine]=useState('0');
    const navigate = useNavigate();

    //get latest measurement of user once there is a change in userID
    useEffect(() => {
        getLatestMeasurement(userID, setWeight, setBodyFat, setWaistLine);
    }, [userID]);

    return (
        <>
            <nav id='menu'>
                <ul className="menu_1">
                    <li tabIndex="3">
                        <Link to="/workouts" state={{userID: userID, username: username, deload: deload}} className='menu-link'>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li tabIndex="2">
                        <Link to="/profile" state={{userID: userID, username: username, deload: deload}} className='menu-link active'>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2">
                    <li tabIndex="1">
                        <Link to="/home" state={{userID: userID, username: username, deload: deload}} className='menu-link'>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li tabIndex="4" style={{float: "right"}}>
                        <Link to="/" className='menu-link'>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
            <form className='measurements-profile' onSubmit={(event) => update(event,buttonText,setText, setDisabled, userID, weight, bodyFat, waistLine)}>
                <fieldset>
                    <legend>Measurements</legend>
                    <div className="weight-profile">
                        <label id='label-profile' htmlFor="weight-profile">Weight (kg): </label>
                        <input type="number" id="weight-profile" disabled={disabled} value={weight} onChange={(e) => setWeight(e.target.value)} step={0.1}/>
                    </div>
                    <div className="bodyFat-profile">
                        <label id='label-profile' htmlFor="bodyFat-profile">Body Fat (%): </label>
                        <input type="number" id="bodyFat-profile" disabled={disabled} value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} step={0.1}/>
                    </div>
                    <div className="waistLine-profile">
                        <label id='label-profile' htmlFor="waistLine-profile">Waistline (cm): </label>
                        <input type="number" id="waistLine-profile" disabled={disabled} value={waistLine} onChange={(e) => setWaistLine(e.target.value)} step={0.1}/>
                    </div>
                </fieldset>
                <div className="btn-profile">
                <div>
                    <button id='edit-profile' type='submit'>{buttonText}</button>
                </div>
                <div>
                    <button id='cancel-profile' onClick={(event) => cancel(event, userID,username,deload, buttonText, setText, setDisabled, navigate)}>Cancel</button>
                </div>
            </div>
            </form>
            
        </>
    );
}

export default Profile;