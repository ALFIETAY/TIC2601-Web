import axios from "axios";

//get all workouts of user
export const getAllWorkouts = async (userID, setWorkouts) => {
    axios.get(`/workouts/schedule/${userID}`)
        .then(response => {
            setWorkouts(response.data.workouts);
        })
        .catch(error => {
            console.error(error);
        });
};

//Add workout
export const addWorkout = async (data, navigate) => {
    axios.post(`/workouts/add_workout`, data)
        .then(
            navigate(0)
        )
        .catch(error => {
            console.error(error);
            alert('Error adding workout');
        });
}

//delete workout
export const deleteWorkout = async (userID, workoutID, navigate) => {
    axios.delete(`/workouts/${userID}/${workoutID}`)
        .then(() => {
            alert('Workout deleted');
            navigate(0);
        })
        .catch(error => {
            console.error(error);
        });
}

//get exercises of workout
export const getWorkoutExercises = async (workoutID, setValue) => {
    axios.get(`/workouts/exercises/${workoutID}`)
        .then(response => {
            setValue(response.data.exercises)
        })
        .catch(error => {
            console.log('No exercises found in workout');
        });
};

//update fatigue rating
export const updateFatigueRating = async (workoutID, data) => {
    axios.put(`/workouts/fatigue_rating/${workoutID}`, data)
        .then(
            alert('Fatigue rating updated')
        )
        .catch(error => {
            console.error(error);
        });
}

//delete exercises in workout
export const deleteWorkoutExercises = async (ID, navigate) => {
    axios.delete(`/workouts/workout_exercises/${ID}`)
        .then(() => {
            alert('Exercises removed');
            navigate(0);
        })
        .catch(error => {
            console.error(error);
            alert('Error removing exercise from workout');
        });
}
