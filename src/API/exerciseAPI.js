import { createSuperset } from "./supersetAPI";
const serverPort = 3001;

//add exercise
export const addExercise = async (data, token, navigate) =>{
    try{
        const response = await fetch (`http://localhost:${serverPort}/api/exercises/add_exercise`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        //if successful, refresh page to update table
        if (response.status === 200){
            navigate(0);
        }
    }catch(error){
        console.error(error);
    }
}

//delete exercise
export const deleteExercise = async (userID,exerciseID,token,navigate) => {
    try{
        const response = await fetch (`http://localhost:${serverPort}/api/exercises/${userID}/${exerciseID}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        if (response.status === 200){
            alert('Exercise deleted successfully');
            navigate(0);
        }
    }
    catch(error){
        console.error(error);
    }
}

//get history of exercises for the past 4 weeks
export const getExerciseHistory = async (setExerciseHistory, userID, token) => {
    try {
        const response = await fetch(`http://localhost:${serverPort}/api/exercises/exercise_history/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            setExerciseHistory(data.muscle_group_breakdown);
        }
    }
    catch (error) {
        console.error(error);
    }
}

//record workout exercises
export const addWorkoutExercises = async (data, token, navigate,superset) =>{
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
            const output = await response.json();
            const id = output.workoutExercise.id;
            if (superset){
                const supersetData = {workout_id: data.workout_id, user_id: data.user_id, exercise_ids:[id,superset]};
                createSuperset(supersetData, token);
            }
            navigate(0);
        }
    }
    catch(error){
        console.error(error);
    }
}

//get all exercises
export const getAllExercises = async (token,setExercises) =>{

    //try to get exercises
    try{
        const response= await fetch(`http://localhost:${serverPort}/api/exercises/all_exercise`,{
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
        //if successful, set as table data
        if(response.status === 200){
            const data = await response.json();
            setExercises(data.exercises);
        }
    }
    catch(error){
        console.error(error);
    }
};
