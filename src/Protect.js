import React from 'react';
import {jwtDecode} from 'jwt-decode';
import {Navigate, Outlet } from 'react-router-dom';

const isTokenValid = () => {
    //get token from localStorage
    const token = localStorage.getItem('token');

    //if no token
    if (!token) {
        return false;
    }

    //check if token expired
    try{
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        return !isExpired;
    }catch (error){
        return false;
    }
}

export const logout = (event) =>{
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
}

const Protected = () => {
    //only allow user to go to pages if token is valid, else go to cover page
    return isTokenValid()? <Outlet/> : <Navigate to="/"/>;
}

export default Protected;