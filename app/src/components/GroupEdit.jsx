import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import '../css/GroupEdit.css';

function GroupEdit() {
    const initialFormState = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: ''
    };
    
    const [group, setGroup] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/groups/${id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => setGroup(data))
                .catch(error => console.error('There was a problem with the fetch operation:', error));
        }
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setGroup({ ...group, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = id !== 'new' ? 'PUT' : 'POST';
        const url = `/api/groups${id !== 'new' ? `/${id}` : ''}`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(group)
            });

            if (response.ok) {
                setGroup(initialFormState);
                navigate('/groups');
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const title = <h2>{id !== 'new' ? 'Edit Group' : 'Add Group' }</h2>;

    return (
        <div>
            <AppNavbar />
            <div className="container">
                {title}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={group.name || ''}
                            onChange={handleChange} autoComplete="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" value={group.address || ''}
                            onChange={handleChange} autoComplete="address-level1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" value={group.city || ''}
                            onChange={handleChange} autoComplete="address-level1" />
                    </div>
                    <div className="row">
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="stateOrProvince">State/Province</label>
                            <input type="text" name="stateOrProvince" id="stateOrProvince" value={group.stateOrProvince || ''}
                                onChange={handleChange} autoComplete="address-level1" />
                        </div>
                        <div className="form-group col-md-5 mb-3">
                            <label htmlFor="country">Country</label>
                            <input type="text" name="country" id="country" value={group.country || ''}
                                onChange={handleChange} autoComplete="address-level1" />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input type="text" name="postalCode" id="postalCode" value={group.postalCode || ''}
                                onChange={handleChange} autoComplete="address-level1" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Save</button>{' '}
                        <Link to="/groups" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GroupEdit;
