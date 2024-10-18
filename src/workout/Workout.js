import React from 'react';
import './Workout.css';
import {Link} from 'react-router-dom';

function search(event){
    event.preventDefault();
    console.log('search');
};

function reset(event){
    event.preventDefault();
    console.log('reset');
}

function Workout(){
    return (
        <>
            <nav id='menu-workout'>
                <ul className="menu_1-workout">
                    <li>
                        <Link to="/workout" className='menu-link active' tabIndex={3}>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className='menu-link' tabIndex={2}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2-workout">
                    <li>
                        <Link to="/home" className='menu-link' tabIndex={1}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li style={{float: "right"}}>
                        <Link to="/" className='menu-link' tabIndex={4}>
                            Log out
                        </Link>
                    </li>
                </ul>
                <ul className="search-workout">
                    <li className='searchBar-workout'>
                        <input type="text" placeholder="Search..." tabIndex="5" id='searchBar-workout'/>
                    </li>
                    <li tabIndex="8" id="add-workout">
                        <Link to="/workout/new_workout" className='menu-link' title='New Workout'>
                            <i className="fa-solid fa-plus"/>
                        </Link>
                    </li>
                    <li tabIndex="6" id="searchBtn-workout">
                        <Link to='#' title="Search" className='menu-link' 
                        onClick={search}>
                            <i className="fa-solid fa-magnifying-glass"/>
                        </Link>
                    </li>
                    <li tabIndex="7" id="searchBtn-workout">
                        <Link to='#' type="reset" title="Reset" className='menu-link' 
                        onClick={reset}>
                            <i className="fa-solid fa-x"/>
                        </Link>
                    </li>
                </ul>
                
            </nav>
            
        </>
    );
}

export default Workout;