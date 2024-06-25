
import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import '../css/Home.css';

function Home() {
    return (
        <div>
            <AppNavbar />
            <div className="container-fluid">
                {/* <button className="btn btn-link">
                    <Link to="/groups">Manage Tours</Link>
                </button> */}
                <h1>Home</h1>
            </div>
        </div>
    );
}

export default Home;