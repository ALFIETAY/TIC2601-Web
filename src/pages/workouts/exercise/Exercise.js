import React, { useEffect, useState } from 'react';
import './Exercise.css';
import { removeSuperset } from '../../../API/supersetAPI';
import { addWorkoutExercises, getAllExercises } from '../../../API/exerciseAPI';
import { deleteWorkoutExercises, getWorkoutExercises } from '../../../API/workoutAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';

//remove exercise from workout
const removeExercise = async (event, ID, supersetID, navigate) => {
    event.preventDefault();

    //if exercise has a supersetID, delete the supersetID
    if (supersetID) {
        //set up data for api
        const info = supersetID.split('-');
        const data = { workout_id: info[0], user_id: info[1], exercise_ids: [info[2], info[3]] };

        //try to remove supersetID
        removeSuperset(data);
    }

    //try to remove exercise
    deleteWorkoutExercises(ID, navigate);
};

//Add exercise to workout
const AddExercise = async (event, workoutID, userID, exerciseID, sets, reps, weight, superset, navigate) => {
    event.preventDefault();
    if (!exerciseID) {
        alert('Choose an exercise to add.');
        return;
    }
    else if (!sets || !reps || !weight) {
        alert('Sets/Reps/Weight not specified.');
        return;
    }
    //set up data for api
    const data = { workout_id: workoutID, user_id: userID, exercise_id: exerciseID, set_number: sets, reps: reps, weight: weight, superset_id: '' };

    //try to add exercise
    addWorkoutExercises(data, navigate, superset);
}

const ExerciseTable = ({ workoutID, navigate }) => {
    const [workoutExercises, setWorkoutExercises] = useState([]);

    useEffect(() => {
        getWorkoutExercises(workoutID, setWorkoutExercises);
    }, []);

    return (
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
                            <button id='remove-exercise' onClick={(e) => removeExercise(e, workoutExercise.id, workoutExercise.superset_id, navigate)}>Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const ExerciseForm = ({ workoutID, navigate }) => {
    const userID = localStorage.getItem('userID');

    //default values
    const [exercises, setExercises] = useState([]);
    const [exerciseID, setExerciseID] = useState(0);
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [primary, setPrimary] = useState('');
    const [secondary, setSecondary] = useState('');
    const [superset, setSuperset] = useState([]);
    const [supersetExerciseID, setSupersetExerciseID] = useState(0);

    //get all exercises of user when change in userID, i.e. on load
    useEffect(() => {
        //for dropdown
        getAllExercises(setExercises);
        getWorkoutExercises(workoutID, setSuperset);
    }, []);

    //set primary and secondary muscle on display as exerciseID change and exercises exist
    useEffect(() => {
        if (exerciseID) {
            const selected = exercises.find((exercise) => Number(exercise.exercise_id) === Number(exerciseID));
            if (selected) {
                if (selected.primary_muscle) {
                    setPrimary(selected.primary_muscle);
                }
                if (selected.secondary_muscle) {
                    setSecondary(selected.secondary_muscle);
                }
            }
        }
        else {
            setPrimary('');
            setSecondary('');
        }
    }, [exerciseID, exercises]);

    return (
        <>
            <div>
                <fieldset className='field-exercise'>
                    <legend>Add Exercise</legend>
                    <div>
                        <div>
                            <label id='label-exercise' htmlFor='exerciseName-exercise'>Exercise Name: </label>
                            <select id='exerciseName-exercise' value={exerciseID} onChange={(e) => setExerciseID(e.target.value)} required>
                                <option></option>
                                {exercises.map((exercise) =>
                                    (<option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>))}
                            </select>
                            <Link to='/workouts/exercise/new_exercise' state={exercises}>
                                <button id='new-exercise' >New Exercise</button>
                            </Link>
                        </div>
                        <div>
                            <label id='label-exercise' htmlFor='sets-exercise'>Sets: </label>
                            <input type='number' id='sets-exercise' value={sets} onChange={(e) => setSets(e.target.value)} min={1} required />
                        </div>
                        <div>
                            <label id='label-exercise' htmlFor='reps-exercise'>Reps: </label>
                            <input type='number' id='reps-exercise' value={reps} onChange={(e) => setReps(e.target.value)} min={1} required></input>
                        </div>
                        <div>
                            <label id='label-exercise' htmlFor='weight-exercise'>Weight: </label>
                            <input type='number' id='weight-exercise' value={weight} onChange={(e) => setWeight(e.target.value)} min={0} step={0.5} required></input>
                        </div>
                        <div>
                            <label id='label-exercise' htmlFor='primary-exercise'>Primary Muscle: </label>
                            <input type='text' id='primary-exercise' disabled value={primary} />
                        </div>
                        <div>
                            <label id='label-exercise' htmlFor='secondary-exercise'>Secondary: </label>
                            <input type='text' id='secondary-exercise' disabled value={secondary} />
                        </div>
                        <div>
                            <label id='label-exercise' htmlFor='superset-exercise'>Superset with: </label>
                            <select id='superset-exercise' value={supersetExerciseID} onChange={(e) => setSupersetExerciseID(e.target.value)} >
                                <option></option>
                                {superset.map((exercise) =>
                                    (<option key={exercise.id} value={exercise.id}>{exercise.id}. {exercise.exercise_name}</option>))}
                            </select>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="btn-exercise">
                <div className='exerciseBtn'>
                    <button id='add-exercise' onClick={(e) => AddExercise(e, workoutID, userID, exerciseID, sets, reps, weight, supersetExerciseID, navigate)}>Add to workout</button>
                </div>
                <div className='exerciseBtn'>
                    <Link to={`/workouts/workout/${workoutID}`} state={{ workoutID }}>
                        <button id='done-exercise'>Done</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
function Exercise() {
    const navigate = useNavigate();
    const location = useLocation();

    //get workoutID from previous page
    const { workoutID } = location.state || '';

    return (
        <>
            <div className="header-exercise" />
            <div id='container-exercise'>
                <ExerciseTable workoutID={workoutID} navigate={navigate} />
            </div>
            <ExerciseForm workoutID={workoutID} navigate={navigate} />

        </>
    );
}

export default Exercise;