import React, { useEffect, useState } from 'react';
import './Workout.css';
import {Link, useParams} from 'react-router-dom';
import { getWorkoutExercises, updateFatigueRating } from '../../../API/workoutAPI';

//get all exercises in workout
const AllWorkoutExercises = ({workoutID, token}) =>{
    //default data for table (empty)
    const [workoutExercises, setWorkoutExercises] = useState([]);

    //get all exercises in workout when workoutID change, i.e. on load
    useEffect (()=>{
        getWorkoutExercises(workoutID,token,setWorkoutExercises);
    }, [workoutID]);

    return (
                <tbody>
                    {workoutExercises.map((workoutExercise) => (
                        <tr key={workoutExercise.id}>
                            <td>{workoutExercise.id}</td>
                            <td>{workoutExercise.exercise_name}</td>
                            <td>{workoutExercise.set_number}</td>
                            <td>{workoutExercise.reps}</td>
                            <td>{workoutExercise.weight}</td>
                            <td>{workoutExercise.primary_muscle}</td>
                            <td>{workoutExercise.secondary_muscle}</td>
                            <td>{workoutExercise.superset_id}</td>
                        </tr>
                    ))}
                </tbody>
            
    );
};

//update fatigue rating
const updateFatigue = async (event,token, workoutID, fatigue) =>{
    event.preventDefault();

    //set up data for api
    const data = {fatigue_rating: fatigue};

    //try to update fatigue rating
    updateFatigueRating(workoutID, data, token);
};

function Workout(){
    //get workoutID from previous page
    const  {workoutID} = useParams();

    //get token from localStorage
    const token = localStorage.getItem('token');

    //default value
    const [fatigue, setFatigue] = useState('');
    
    return (
        <>
            <div className="header-workout"/>
            <div id='container-workout'>
                <fieldset className='field-workout'>
                    <legend>Fatigue Rating</legend>
                    <div>
                        <label id='label-workout'  htmlFor='fatigue-workout'>Fatigue Rating: </label>
                        <select id='fatigue-workout' value={fatigue} onChange={(e) => setFatigue(e.target.value)}>
                            <option> </option>
                            <option value={1}>1 - Least Fatigue</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10 - Most Fatigue</option>
                        </select>
                        <button onClick={(e) => updateFatigue(e, token, workoutID, fatigue)} id='update-workout'>Update</button>
                    </div>
                </fieldset>
                <table id='workout-workout'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Exercise Name</th>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Primary Muscle</th>
                            <th>Secondary Muscle</th>
                            <th>Superset ID</th>
                        </tr>
                    </thead>
                    <AllWorkoutExercises workoutID={workoutID} token = {token}/>
                </table>
                <div className="btn-workout">
                <div className='workoutBtn'>
                </div>
                    <div className='workoutBtn'>
                        <Link to='/workouts/exercise' state={{workoutID: workoutID}}>
                            <button id='update-workout'>Edit Workout</button>
                        </Link>
                    </div>
                    <div className='workoutBtn'>
                        <Link to='/workouts'>
                            <button id='done-workout'>Done</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Workout;