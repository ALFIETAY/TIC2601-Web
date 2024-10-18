import React from 'react';
import './Exercise.css';
import {Link,useNavigate} from 'react-router-dom';

function Exercise(){
    const navigate = useNavigate();
    function search(){
        console.log('search');
    };

    function reset(){
        console.log('reset');
    };

    function create(){
        navigate('/workout');

    };

    return (
        <>
            <nav id='menu-exercise'>
            <div className="header-exercise"></div>
                {/* <ul className="menu_1-exercise">
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
                <ul className="menu_2-exercise">
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
                </ul> */}

                <ul className="search-exercise">
                    <li className='searchBar-exercise'>
                        <input type="text" placeholder="Search..." tabIndex="5" id='searchBar-exercise'/>
                    </li>
                    <li tabIndex="8" id="add-exercise">
                        <Link to="/workout/exercise/new_exercise" className='menu-link' title='New Exercise'>
                            <i className="fa-solid fa-plus"/>
                        </Link>
                    </li>
                    <li tabIndex="6" id="searchBtn-exercise">
                        <Link to='#' title="Search" className='menu-link' onClick={search}>
                            <i className="fa-solid fa-magnifying-glass"/>
                        </Link>
                    </li>
                    <li tabIndex="7" id="searchBtn-exercise">
                        <Link to='#' type="reset" title="Reset" className='menu-link' onClick={reset}>
                            <i className="fa-solid fa-x"/>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="btn-exercise">
                <div className='exerciseBtn'>
                    <button id='done-exercise' onClick={create}>Done</button>
                </div>
                <div className='exerciseBtn'>
                    <Link to='/workout/new_workout'>
                        <button id='cancel-exercise'>Cancel</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Exercise;