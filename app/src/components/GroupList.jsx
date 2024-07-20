import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNavbar from './AppNavbar';
import { useCookies } from "react-cookie";
import '../css/GroupList.css';

function GroupList() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(['XSRF-TOKEN']); // Use cookies to get CSRF token

    useEffect(() => {
        setLoading(true);
        fetch('/api/groups', { credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const remove = async (id) => {
        try {
            const response = await fetch(`/api/groups/${id}`, {
                method: 'DELETE',
                credentials: 'include', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] // Include CSRF token in headers
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setGroups(groups.filter(group => group.id !== id));
        } catch (error) {
            setError(error.toString());
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const groupList = groups.map(group => {
        const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
        return (
            <tr key={group.id}>
                <td className="nowrap">{group.name}</td>
                <td>{address}</td>
                <td>
                    {group.events.map(event => {
                        const eventDetails = new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(event.date)) + `: ${event.title}`;
                        return (
                            <div key={event.id}>
                                {eventDetails}
                            </div>
                        );
                    })}
                </td>
                <td>
                    <div className="btn-group">
                        <Link to={"/groups/" + group.id} className="btn btn-primary btn-sm">Edit</Link>
                        <button onClick={() => remove(group.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <AppNavbar />
            <div className="container">
                <div className="float-end">
                    <Link to="/groups/new" className="btn btn-success">Add Group</Link>
                </div>
                <h3>My Java User Group Tour</h3>
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Location</th>
                            <th>Events</th>
                            <th width="10%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GroupList;
