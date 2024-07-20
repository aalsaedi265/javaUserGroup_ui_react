import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import { useCookies } from "react-cookie";
import '../css/Home.css';

function Home() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        setLoading(true);
        fetch('/api/user', { 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                    setAuthenticated(false);
                } else {
                    setUser(JSON.parse(body));
                    setAuthenticated(true);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            });
    }, []);

    const message = user ? 
        <h2>Welcome, {user.name}!</h2> : 
        <p>Log in to Manage Tours</p>;

    function logout() {
        fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] }
        })
            .then(res => res.json())
            .then(response => {
                window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
                    + `&post_logout_redirect_uri=${window.location.origin}`;
            });
    }

    function login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') { 
            port = ':8080';
        }
        window.location.href = `//${window.location.hostname}${port}/api/private`;
    }

    const button = authenticated ? 
        <div>
            <button className="link-button"><Link to="/groups">Manage Tour</Link></button>
            <br/>
            <button className="link-button" onClick={logout}>Logout</button>
        </div> :
        <button className="primary-button" onClick={login}>Login</button>;

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <AppNavbar/>
            <div className="container">
                {message}
                {button}
            </div>
        </div>
    );
}

export default Home;
