import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cover from './pages/cover/Cover';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import ForgetPassword from './pages/login/forget_password/ForgetPassword'
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Workouts from './pages/workouts/Workouts';
import Workout from './pages/workouts/workout/Workout';
import Exercise from './pages/workouts/exercise/Exercise';
import NewExercise from './pages/workouts/exercise/new_exercise/NewExercise';
import CreateProfile from './pages/signup/create_profile/CreateProfile';
import Protected from './Protect';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Cover />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='login' element={<Login />} />
                <Route path='/login/forget_password' element={<ForgetPassword />} />
                <Route element={<Protected />}>
                    <Route path='/signup/create_profile' element={<CreateProfile />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/workouts' element={<Workouts />} />
                    <Route path='/workouts/workout/:workoutID' element={<Workout />} />
                    <Route path='/workouts/exercise' element={<Exercise />} />
                    <Route path='/workouts/exercise/new_exercise' element={<NewExercise />} />
                </Route>
            </Routes>
        </Router>

    );
}

export default AppRoutes;