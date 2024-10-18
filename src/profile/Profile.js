import React, {useState} from 'react';
import './Profile.css';
import {Link} from 'react-router-dom';

function Profile(){
    const [buttonText,setText] = useState('Edit');
    const [disabled,setDisabled] = useState(true);
    function handleButton (){
        if (buttonText === 'Save'){
            handleSave();
        }
        else{
            handleEdit();
        }
    };
    function handleSave(){
        setDisabled(true);
        setText('Edit');
    };
    function handleEdit(){
        setDisabled(false);
        setText('Save');
    };
    function handleCancel(){
        if (buttonText === 'Save'){
            setDisabled(true);
            setText('Edit');
        }
        else{
            window.location.href='/home';
        }
    }
    return (
        <>
            <nav id='menu'>
                <ul className="menu_1">
                    <li tabIndex="3">
                        <Link to="/workout" className='menu-link'>
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
                        <Link to="/" className='menu-link'>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
            <form className='measurements-profile'>
                <fieldset>
                    <legend>Measurements</legend>
                    <div className="weight-profile">
                        <label id='label-profile' htmlFor="weight-profile">Weight (kg): </label>
                        <input type="number" id="weight-profile" disabled={disabled}/>
                    </div>
                    <div className="bodyFat-profile">
                        <label id='label-profile' htmlFor="bodyFat-profile">Body Fat (%): </label>
                        <input type="number" id="bodyFat-profile" disabled={disabled}/>
                    </div>
                    <div className="waistLine-profile">
                        <label id='label-profile' htmlFor="waistLine-profile">Waistline (cm): </label>
                        <input type="number" id="waistLine-profile"disabled={disabled}/>
                    </div>
                </fieldset>
            </form>
            <div className="btn-profile">
                <div>
                    <button id='edit-profile' onClick={handleButton}>{buttonText}</button>
                </div>
                <div>
                    {/* <Link to='cover'> */}
                    <button id='cancel-profile' onClick={handleCancel}>Cancel</button>
                    {/* </Link> */}
                </div>
            </div>
        </>
    );
}

export default Profile;