import React, { useState, useEffect } from 'react';
import './NewExercise.css';
import { Link, useNavigate, } from 'react-router-dom';
import { addExercise, deleteExercise, getAllExercises } from '../../../../API/exerciseAPI';

const ExerciseTable = ({ userID, navigate }) => {
    const [exercises, setExercises] = useState([]);

    //get exercises only when there is a change in userID, i.e. on load
    useEffect(() => {
        getAllExercises(setExercises);
    }, []);

    //remove existing exercise
    const removeExercise = async (event, userID, exerciseID) => {
        event.preventDefault();

        //Delete exercise
        deleteExercise(userID, exerciseID, navigate);
    }

    return (
        <table id='exercise-newExercise'>
            <thead>
                <tr>
                    <th>Exercise ID</th>
                    <th>Exercise Name</th>
                    <th>Primary Muscle</th>
                    <th>Secondary Muscle</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise) => (
                    <tr key={exercise.exercise_id}>
                        <td>{exercise.exercise_id}</td>
                        <td>{exercise.exercise_name}</td>
                        <td>{exercise.primary_muscle}</td>
                        <td>{exercise.secondary_muscle}</td>
                        <td>
                            <button id='remove-newExercise' onClick={(e) => removeExercise(e, userID, exercise.exercise_id, navigate)}>Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const ExerciseForm = ({ userID, navigate }) => {
    //default values
    const [name, setName] = useState('');
    const [primary, setPrimary] = useState('');
    const [secondary, setSecondary] = useState('');

    //create new exercise of user
    const create = async (event) => {
        event.preventDefault();

        //set up data for api
        const data = { user_id: userID, exercise_name: name, primary_muscle: primary, secondary_muscle: secondary };

        //try to create new exercise
        addExercise(data, navigate);
    }
    return (
        <form id='form-newExercise' onSubmit={(e) => create(e, userID, name, primary, secondary, navigate)}>
            <fieldset className='field-newExercise'>
                <legend>New Exercise</legend>
                <div className='exerciseName-newExercise'>
                    <label id='label-newExercise' htmlFor='exerciseName-newExercise'>Exercise Name: </label>
                    <input type='text' id='exerciseName-newExercise' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='primary-newExercise'>
                    <label id='label-newExercise' htmlFor='primary-newExercise'>Primary Muscle: </label>
                    <input type='text' id='primary-newExercise' value={primary} onChange={(e) => setPrimary(e.target.value)} required />
                </div>
                <div className='secondary-newExercise'>
                    <label id='label-newExercise' htmlFor='secondary-newExercise'>Secondary Muscle: </label>
                    <input type='text' id='secondary-newExercise' value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                </div>
                <div className="btn-newExercise">
                    <div className='newExerciseBtn'>
                        <button id='add-newExercise' type='submit'>Add Exercise</button>
                    </div>
                    <div className='newExerciseBtn'>
                        <Link to={-1}>
                            <button id='done-newExercise'>Done</button>
                        </Link>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}

function NewExercise() {
    //get userID
    const userID = localStorage.getItem('userID');

    const navigate = useNavigate();

    return (
        <>
            <div className="header-newExercise" />
            <div>
                <ExerciseTable userID={userID} navigate={navigate} />
                <ExerciseForm userID={userID} navigate={navigate} />
            </div>
        </>
    );
}

export default NewExercise;