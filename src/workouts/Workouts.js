import React, { useEffect, useState } from 'react';
import './Workouts.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
// import { DATE } from 'sequelize';

//get all workouts of user
const getWorkouts = async (userID,setWorkouts) => {
    //try to get all workouts of user
    try{
        const response= await fetch(`http://localhost:5001/api/workouts/schedule/${userID}`,{
            method: 'GET',
        });

        //if successful, set data for table
        if(response.status === 200){
            const data = await response.json();
            setWorkouts(data.workouts);
        }
    }
    catch (error){
        console.error(error);
    }
};

//delete workout of user
const deleteWorkout = async (event,userID,workoutID,navigate) =>{
    event.preventDefault();

    //try to delete workout
    try{
        const response = await fetch(`http://localhost:5001/api/workouts/${userID}/${workoutID}`,{
            method: 'DELETE'
        });

        //if successful, give an alert and refresh page
        if (response.status === 200){
            const message = await response.json();
            alert(message.message);
            navigate(0);//refresh page
        }
    }
    catch (error){
        console.log(error);
    }
};

//table data for workouts
const AllWorkouts = ({userID, deload}) =>{
    const navigate = useNavigate();

    //default value
    const [workouts, setWorkouts] = useState([]);
    
    //get all workouts when there is change in userID, i.e. on load
    useEffect (()=>{
        getWorkouts(userID,setWorkouts);
    }, [userID]);

    return (
                <tbody>
                    {workouts.map((workout) => (
                        <tr key={workout.workout_id}>
                            <td>{workout.workout_id}</td>
                            <td>{workout.workout_date}</td>
                            <td>{workout.fatigue_rating}</td>
                            <td><u>{workout.deload? 'ACTIVE':'INACTIVE'}</u></td>
                            <td>
                                <Link to='/workouts/workout' state={{userID: userID, workoutID: workout.workout_id, deload: deload}}>
                                    <button id='btn-workouts'>View</button>
                                </Link>
                            </td>
                            <td>
                                <button id='btn-workouts' onClick={(e) => deleteWorkout(e,userID, workout.workout_id,navigate)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            
    );
};

//create new workout
const newWorkout = async(event, userID, navigate) =>{
    event.preventDefault();

    //set up data for api
    // const date = DATE();
    const data = {user_id: userID, workout_date: '2024-11-08'};

    //try to create new workout
    try{
        const response = await fetch (`http://localhost:5001/api/workouts/add_workout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        //if successful, refresh page
        if (response.status === 200){
            navigate(0);
        }
    }
    catch (error){
        console.error(error);
    }
};

function Workouts(){
    const location = useLocation();
    const navigate = useNavigate();

    //get userID and deload status from previous page
    const {userID, username, deload} = location.state || {};
    return (
        <>
            <nav id='menu-workouts'>
                <ul className="menu_1-workouts">
                    <li>
                        <Link to="/workouts" state={{userID: userID, username: username, deload: deload}} className='menu-link active' tabIndex={3}>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" state={{userID: userID, username:username, deload: deload}} className='menu-link' tabIndex={2}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2-workouts">
                    <li>
                        <Link to="/home" state={{userID: userID, username:username, deload: deload}} className='menu-link' tabIndex={1}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li style={{float: "right"}}>
                        <Link to="/" className='menu-link' tabIndex={4}>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
            <div id='table-workouts'>
                <table id='workouts-workouts'>
                    <thead>
                        <tr>
                            <th>Workout ID</th>
                            <th>Date</th>
                            <th>Fatigue Rating</th>
                            <th>Deload</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <AllWorkouts userID={userID} deload={deload}/>
                </table>
            </div>
            <div className='add-workouts'>
                    <button id='add-workouts' onClick={(e)=> newWorkout(e,userID,navigate)}>New Workout</button>
            </div>
        </>
    );
}

export default Workouts;