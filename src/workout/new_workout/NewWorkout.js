import React from 'react';
import './NewWorkout.css';
import {Link} from 'react-router-dom';

function NewWorkout(){
    return (
        <>
            <div className="header-newWorkout">
            </div>
            <div className="btn-newWorkout">
                <div className='newWorkoutBtn'>
                    <Link to='/workout/exercise'>
                    <button id='done-newWorkout'>Done</button>
                    </Link>
                </div>
                <div className='newWorkoutBtn'>
                    <Link to='/workout'>
                    <button id='cancel-newWorkout'>Cancel</button></Link>
                </div>
            </div>
        </>
    );
}

export default NewWorkout;