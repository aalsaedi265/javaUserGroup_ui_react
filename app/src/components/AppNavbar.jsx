
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/AppNavbar.css';

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    

    return (
          <div className="navbar">
            <Link className="navbar-brand" to="/">Home</Link>
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

export default Navbar