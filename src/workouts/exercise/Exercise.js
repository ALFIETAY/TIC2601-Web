import React, {useEffect,useState} from 'react';
import './Exercise.css';
import {Link,useLocation,useNavigate} from 'react-router-dom';

const serverPort = 3001;
//remove exercise from workout
const removeExercise = async (event,token, ID, supersetID, navigate) => {
    event.preventDefault();

    //if exercise has a supersetID, delete the supersetID
    if (supersetID){
        //set up data for api
        const info = supersetID.split('-');
        const data = {workout_id:info[0], user_id:info[1], ids:[info[2],info[3]]};

        //try to remove supersetID
        try{
            const response = await fetch(`http://localhost:${serverPort}/api/superset/remove`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            //if not successful, give an alert
            if (response.status !== 200){
                alert('Error while deleting superset ID');
                return;
            }
        }catch (error){
            console.error(error);
        }
    }

    //try to remove exercise
    try{
        const response = await fetch(`http://localhost:${serverPort}/api/workouts/workout_exercises/${ID}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        //if successful, give an alert and refresh page
        if (response.status === 200){
            alert('Exercise removed successfuly')
            navigate(0);
        }
    }
    catch(error){
        console.error(error);
    }
    return;
};

//get exercises of workout
const getWorkoutExercises = async (workoutID, token, set) => {
    //try to get exercises of workout
    try{
        const response= await fetch(`http://localhost:${serverPort}/api/workouts/exercises/${workoutID}`,{
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        //if successful, set data for table
        if(response.status === 200){
            const data = await response.json();
            set(data.exercises);
        }
    }
    catch (error){
        console.error(error);
    }
};

//get exercises for dropdown
const getExercises = async (token, setExercises) =>{
    //try to get exercises of user
    try{
        const response= await fetch(`http://localhost:${serverPort}/api/exercises/all_exercise`,{
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        if(response.status === 200){
            const data = await response.json();
            setExercises(data.exercises);
        }
    }
    catch(error){
        console.error(error);
    }
};

//create superset
const createSuperset = async (workoutID,userID,exerciseID,superset, token) =>{
    try{
        const data = {workout_id:workoutID,user_id:userID, ids:[exerciseID,superset]};
        const response = await fetch (`http://localhost:${serverPort}/api/superset/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        //return creasted supersetID if successful
        if (response.status === 200){
            console.log(response);
            return response.superset_id;
        }
    }
    catch (error){
        console.log(error);
    }
}

//Add exercise to workout
const AddExercise = async (event, workoutID, userID, token, exerciseID, sets, reps, weight, superset, navigate) =>{
    event.preventDefault();

    //initialise supersetID
    let supersetID = '';
    
    //set up data for api
    const data = {workout_id: workoutID, user_id:userID, exercise_id: exerciseID, set_number: sets, reps: reps, weight: weight, superset_id: supersetID};
    
    //try to add exercise
    try{
        const response = await fetch (`http://localhost:${serverPort}/api/exercises/record_workout_exercise`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        //if successful, create supersetID if required
        if (response.status === 200){
            const data = await response.json();
            const id = data.workoutExercise.id;
            if (superset){
                supersetID = await createSuperset(workoutID,userID, id,superset);
            }
            navigate(0);
        }
    }
    catch(error){
        console.error(error);
    }
}

function Exercise(){
    const navigate = useNavigate();
    const location = useLocation();

    //get userID and workoutID from previous page
    const {workoutID} = location.state || '';
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');

    //default values
    const [exercises, setExercises] = useState([]);
    const [exerciseID, setExerciseID]  = useState(0);
    const [sets,setSets] = useState('');
    const [reps,setReps] = useState('');
    const [weight,setWeight] = useState('');
    const [primary,setPrimary] = useState('');
    const [secondary,setSecondary] = useState('');
    const [superset,setSuperset] = useState([]);
    const [supersetExerciseID,setSupersetExerciseID] = useState('');
    const [workoutExercises, setWorkoutExercises] = useState([]);

    //get all exercises of user when change in userID, i.e. on load
    useEffect(()=>{
        //for dropdown
        getExercises(token, setExercises);
    },[userID]);

    //get exercises in workout when there is change in workoutID, i.e. on load
    useEffect(()=>{
        //for table
        getWorkoutExercises(workoutID,token,setWorkoutExercises);

        //for dropdown
        getWorkoutExercises(workoutID,token,setSuperset);
    },[workoutID]);

    //set primary and secondary muscle on display as exerciseID change and exercises exist
    useEffect(()=>{
        if(exerciseID){
            const selected = exercises.find((exercise)=> String(exercise.exercise_id) === String(exerciseID));
            if (selected){
                setPrimary(selected.primary_muscle);
                setSecondary(selected.secondary_muscle);
            }
        }
        else{
            setPrimary('');
            setSecondary('');
        }
    },[exerciseID, exercises]);

    return (
        <>
            <div className="header-exercise"/>
            <div id='container-exercise'>
                <table id='workout-exercise'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Exercise Name</th>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Primary Muscle</th>
                            <th>Secondary Muscle</th>
                            <th>Superset</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
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
                            <td>{workoutExercise.superset_id || ''}</td>
                            <td>
                                <button id='remove-exercise' onClick={(e)=>removeExercise(e, token, workoutExercise.id, workoutExercise.superset_id, navigate)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div>
                <fieldset className='field-exercise'>
                        <legend>Add Exercise</legend>
                        <div>
                            <div>
                                <label id='label-exercise'  htmlFor='exerciseName-exercise'>Exercise Name: </label>
                                <select id='exerciseName-exercise' value={exerciseID} onChange={(e)=>setExerciseID(e.target.value)} >
                                    <option></option>
                                    {exercises.map((exercise)=>
                                        (<option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>))}
                                </select>
                                <Link to='/workouts/exercise/new_exercise' state={exercises}>
                                    <button id='new-exercise' >New Exercise</button>
                                </Link>
                            </div>
                            <div>
                                <label id='label-exercise' htmlFor='sets-exercise'>Sets: </label>
                                <input type='number' id='sets-exercise' value={sets} onChange={(e)=>setSets(e.target.value)} min={1}/>
                            </div>
                            <div>
                                <label id='label-exercise' htmlFor='reps-exercise'>Reps: </label>
                                <input type='number' id='reps-exercise' value={reps} onChange={(e)=>setReps(e.target.value)} min={1}></input>
                            </div>
                            <div>
                                <label id='label-exercise' htmlFor='weight-exercise'>Weight: </label>
                                <input type='number' id='weight-exercise' value={weight} onChange={(e) => setWeight(e.target.value)} min={0} step={0.5}></input>
                            </div>
                            <div>
                                <label id='label-exercise' htmlFor='primary-exercise'>Primary Muscle: </label>
                                <input type='text' id='primary-exercise' disabled value={primary}/>
                            </div>
                            <div>
                                <label id='label-exercise' htmlFor='secondary-exercise'>Secondary: </label>
                                <input type='text' id='secondary-exercise' disabled value={secondary}/>
                            </div>
                            <div>
                                <label id='label-exercise' htmlFor='superset-exercise'>Superset with: </label>
                                <select id='superset-exercise' value={supersetExerciseID} onChange={(e)=>setSupersetExerciseID(e.target.value)} >
                                    <option></option>
                                    {superset.map((exercise)=>
                                        (<option key={exercise.id} value={exercise.id}>{exercise.id}. {exercise.exercise_name}</option>))}
                                </select>
                            </div>
                        </div>
                    </fieldset>
            </div>
            <div className="btn-exercise">
                <div className='exerciseBtn'>
                        <button id='add-exercise' onClick={(e)=> AddExercise(e,workoutID, userID, token, exerciseID, sets, reps, weight, supersetExerciseID, navigate)}>Add to workout</button>
                </div>
                <div className='exerciseBtn'>
                    <Link to='/workouts/workout' state={{workoutID}}>
                        <button id='done-exercise'>Done</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Exercise;