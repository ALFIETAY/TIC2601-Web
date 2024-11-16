import React, { useEffect, useState } from 'react';
import {logout} from "../../Protect";
import './Workouts.css';
import { addWorkout, deleteWorkout, getAllWorkouts } from '../../API/workoutAPI';
import {Link, useLocation, useNavigate} from 'react-router-dom';


//delete workout of user
const removeWorkout = async (event,userID, workoutID, token, navigate) =>{
    event.preventDefault();

    deleteWorkout(userID, workoutID, token, navigate);
};

//table data for workouts
const AllWorkouts = ({userID, token}) =>{
    const navigate = useNavigate();
    
    //default value
    const [workouts, setWorkouts] = useState([]);

    //get all workouts when there is change in userID, i.e. on load
    useEffect (()=>{
        getAllWorkouts(userID, token, setWorkouts);
    }, [userID]);

    return (
                <tbody>
                    {workouts.map((workout) => (
                        <tr key={workout.workout_id}>
                            <td>{workout.workout_date}</td>
                            <td>{workout.workout_time}</td>
                            <td>{workout.fatigue_rating}</td>
                            <td><u>{workout.deload? 'ACTIVE':'INACTIVE'}</u></td>
                            <td>
                                <Link to={`/workouts/workout/${workout.workout_id}`}>
                                    <button id='btn-workouts'>View</button>
                                </Link>
                            </td>
                            <td>
                                <button id='btn-workouts' onClick={(e) => removeWorkout(e,userID, workout.workout_id, token, navigate)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            
    );
};

//create new workout
const newWorkout = async(event, userID, token, navigate) =>{
    event.preventDefault();

    //set up data for api
    const data = {user_id: userID};

    //try to create new workout
    addWorkout(data,token,navigate);
};

function Workouts(){
    const location = useLocation();
    const navigate = useNavigate();

    //get userID and deload status from previous page
    // const information = location.state || {};
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    
    return (
        <>
            <nav id='menu'>
                <ul className="menu_1">
                    <li>
                        <Link to="/workouts" className='menu-link active' tabIndex={3}>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className='menu-link' tabIndex={2}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2">
                    <li>
                        <Link to="/home" className='menu-link' tabIndex={1}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li style={{float: "right"}}>
                        <Link to="/" className='menu-link' tabIndex={4} onClick={(e)=>logout(e)}>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
            <div id='table-workouts'>
                <table id='workouts-workouts'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Fatigue Rating</th>
                            <th>Deload</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <AllWorkouts userID={userID} token={token}/>
                </table>
            </div>
            <div className='add-workouts'>
                    <button id='add-workouts' onClick={(e)=> newWorkout(e,userID, token,navigate)}>New Workout</button>
            </div>
        </>
    );
}

export default Workouts;
