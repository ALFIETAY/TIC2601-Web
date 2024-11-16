
const serverPort = 3001;

//get all workouts of user
export const getAllWorkouts = async (userID, token, setWorkouts) => {
    //try to get all workouts of user
    try{
        const response= await fetch(`http://localhost:${serverPort}/api/workouts/schedule/${userID}`,{
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
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

//Add workout
export const addWorkout = async (data, token, navigate) =>{
    try{
        const response = await fetch (`http://localhost:${serverPort}/api/workouts/add_workout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
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
}

//delete workout
export const deleteWorkout = async (userID, workoutID, token, navigate) =>{
    //try to delete workout
    try{
        const response = await fetch(`http://localhost:${serverPort}/api/workouts/${userID}/${workoutID}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`
            }
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
}

//get exercises of workout
export const getWorkoutExercises = async (workoutID, token, set) => {
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

//update fatigue rating
export const updateFatigueRating = async (workoutID, data, token) =>{
    try{
        const response = await fetch(`http://localhost:${serverPort}/api/workouts/fatigue_rating/${workoutID}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        //if successful, give an alert
        if (response.status === 200){
            const message = await response.json();
            alert(message.message);
        }
    }
    catch(error){
        console.error(error);
    }
}

//delete exercises in workout
export const deleteWorkoutExercises = async(ID, token, navigate) => {
    try{
        const response = await fetch(`http://localhost:${serverPort}/api/workouts/workout_exercises/${ID}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        //if successful, give an alert and refresh page
        if (response.status === 200){
            alert('Exercise removed successfuly');
            navigate(0);
        }
    }
    catch(error){
        console.error(error);
    }
}
