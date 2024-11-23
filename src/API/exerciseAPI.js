import { createSuperset } from "./supersetAPI";
import axios from "axios";

//add exercise
export const addExercise = async (data, navigate) => {
    axios.post(`/exercises/add_exercise`, data)
        .then(
            navigate(0)
        )
        .catch(error => {
            console.error(error);
            alert('Error adding exercise to library');
        });
}

//delete exercise
export const deleteExercise = async (userID, exerciseID, navigate) => {
    axios.delete(`/exercises/${userID}/${exerciseID}`)
        .then(() => {
            alert('Exercise deleted');
            navigate(0);
        })
        .catch(error => {
            console.error(error);
            alert('Error deleting exercise');
        });
}

//get history of exercises for the past 4 weeks
export const getExerciseHistory = async (setExerciseHistory, userID) => {
    axios.get(`/exercises/exercise_history/${userID}`)
        .then(response => {
            setExerciseHistory(response.data.muscle_group_breakdown);
        })
        .catch(error => {
            console.error(error);
            console.log('No exercise history found');
        });
}

//record workout exercises
export const addWorkoutExercises = async (data, navigate, superset) => {
    axios.post(`/exercises/record_workout_exercise`, data)
        .then(response => {
            const data = response.data;
            const id = data.workoutExercise.id;
            //if exercise is to be in a superset, create data for superset id creation
            if (superset) {
                const supersetData = { workout_id: data.workout_id, user_id: data.user_id, exercise_ids: [id, superset] };
                createSuperset(supersetData);
            }
            navigate(0);
        })
        .catch(error => {
            console.error(error);
            alert('Error adding exercise to workout.');
        });
}

//get all exercises
export const getAllExercises = async (setExercises) => {
    axios.get(`/exercises/all_exercise`)
        .then(response => {
            setExercises(response.data.exercises);
        })
        .catch(error => {
            console.error(error);
            console.log('No exercises found');
        });
};
