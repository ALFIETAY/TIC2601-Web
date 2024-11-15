import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Cover from './cover/Cover';
import Signup from './signup/Signup';
import Login from './login/Login';
import ForgetPassword from './login/forget_password/ForgetPassword'
import Home from './home/Home';
import Profile from './profile/Profile';
import Workouts from './workouts/Workouts';
import Workout from './workouts/workout/Workout';
import Exercise from './workouts/exercise/Exercise';
import NewExercise from './workouts/exercise/new_exercise/NewExercise';
import CreateProfile from './signup/create_profile/CreateProfile';
import Protected from './Protect';

function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Cover/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='/login/forget_password' element={<ForgetPassword/>}/>
                <Route element={<Protected/>}>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/workouts' element={<Workouts/>}/>
                    <Route path='/workouts/workout' element={<Workout/>}/>
                    <Route path='/workouts/exercise' element={<Exercise/>}/>
                    <Route path='/workouts/exercise/new_exercise' element={<NewExercise/>}/>
                </Route>
                <Route path='/signup/create_profile' element={<CreateProfile/>}/>
            </Routes>
        </Router>
        
    );
}

export default AppRoutes;