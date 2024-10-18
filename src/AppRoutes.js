import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Cover from './cover/Cover';
import Signup from './signup/Signup';
import Login from './login/Login';
import ForgetPassword from './login/forget_password/ForgetPassword'
import Home from './home/Home';
import Profile from './profile/Profile';
import Workout from './workout/Workout';
import Exercise from './workout/exercise/Exercise';
import NewWorkout from './workout/new_workout/NewWorkout';
import NewExercise from './workout/exercise/new_exercise/NewExercise';
import CreateProfile from './signup/create_profile/CreateProfile';


function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Cover/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/login/forget_password' element={<ForgetPassword/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/workout' element={<Workout/>}/>
                <Route path='/workout/exercise' element={<Exercise/>}/>
                <Route path='/workout/new_workout' element={<NewWorkout/>}/>
                <Route path='/workout/exercise/new_exercise' element={<NewExercise/>}/>
                <Route path='/signup/create_profile' element={<CreateProfile/>}/>
            </Routes>
        </Router>
        
    );
}

export default AppRoutes;