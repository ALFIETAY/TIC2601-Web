import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home(){
    return (
        <>
            <nav id='menu'>
                <ul className="menu_1">
                    <li>
                        <Link to="/workout" className='menu-link' tabIndex={3}>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className='menu-link' tabIndex={2}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2">
                    <li>
                        <Link to="/home" className='menu-link active' tabIndex={1}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li style={{float: "right"}}>
                        <Link to="/" className='menu-link' tabIndex={4}>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Home;