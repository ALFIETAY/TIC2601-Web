import React from 'react';
import './NewExercise.css';
import {Link, useNavigate} from 'react-router-dom';

function create(){
    // event.preventDefault();
    // console.log('create');
    // navigate('/workout/exercise');
    window.location.href = '/workout/exercise';
}

function NewExercise(){
    const navigate=useNavigate();
    return (
        <>
            <div className="header-newExercise">
            </div>
            <div className="btn-newExercise">
                <div className='newExerciseBtn'>
                    {/* <Link to='/workout/exercise'  onClick={create(navigate)}> */}
                        <button id='done-newExercise' onClick={create}>Done</button>
                    {/* </Link> */}
                </div>
                <div className='newExerciseBtn'>
                    <Link to='/workout/exercise'>
                        <button id='cancel-newExercise'>Cancel</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default NewExercise;