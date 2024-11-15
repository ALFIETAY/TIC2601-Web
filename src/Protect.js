import React from 'react';
import jwtDecode from 'jwt-decode';
import {Navigate, Outlet, } from 'react-router-dom';

const authenticate = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try{
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        return !isExpired;
    }catch (error){
        return false;
    }
}


function Protected(){
    return authenticate()? <Outlet/> : <Navigate to="/"/>;
}

export default Protected;