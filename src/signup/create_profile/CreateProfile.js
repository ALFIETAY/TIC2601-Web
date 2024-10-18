import React,{useState} from 'react';
import './CreateProfile.css';
import{Link} from 'react-router-dom';

function CreateProfile(){
    function create(){
        window.location.href='/home';
    }

    return (
        <>
            <div className="header-createProfile">
            </div>
            <form className='measurements-createProfile'>
                <fieldset>
                    <legend>Measurements</legend>
                    <div className="weight-createProfile">
                        <label id='label-createProfile' htmlFor="weight-createProfile">Weight (kg): </label>
                        <input type="number" id="weight-createProfile"/>
                    </div>
                    <div className="bodyFat-createProfile">
                        <label id='label-createProfile' htmlFor="bodyFat-createProfile">Body Fat (%): </label>
                        <input type="number" id="bodyFat-createProfile"/>
                    </div>
                    <div className="waistLine-createProfile">
                        <label id='label-createProfile' htmlFor="waistLine-createProfile">Waistline (cm): </label>
                        <input type="number" id="waistLine-createProfile"/>
                    </div>
                </fieldset>
            </form>
            <div className="btn-createProfile">
                <div>
                    <button id='create-createProfile' onClick={create}>Create</button>
                </div>
                <div>
                    <button id='cancel-createProfile' onClick={'/cover'}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default CreateProfile;