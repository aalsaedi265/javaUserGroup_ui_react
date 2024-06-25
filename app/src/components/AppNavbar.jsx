import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/AppNavbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [homeClicked, setHomeClicked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // if (location.pathname === '/groups') {
        //     setHomeClicked(true);
        // } else {
        //     setHomeClicked(false);
        // }
        // location.pathname
        setHomeClicked(location.pathname === '/groups');
    }, [location]);

    function handleHomeClick() {
        if (homeClicked) {
            navigate('/');
        } else {
            navigate('/groups');
        }
        setHomeClicked(!homeClicked);
    }

    return (
        <div className="navbar">
            <button className="navbar-brand" onClick={handleHomeClick}>
                {homeClicked ? 'Home' : 'Manage Tours'}
            </button>
            <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`navbar-collapse ${isOpen ? 'show' : ''}`}>
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="https://www.linkedin.com/in/ahmed-r-j-alsaedi/">Linkedin</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/aalsaedi265">Github</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
