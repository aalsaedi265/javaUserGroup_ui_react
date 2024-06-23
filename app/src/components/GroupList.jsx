
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNavbar from './AppNavbar';


function GroupList() {

        const [groups, setGroups] = useState([]);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true);

            fetch('api/groups')
            .then(response => response.json())
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
        }, []);

        const remove = async (id) => {
            await fetch(`/api/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            }).then(() => {
            let updatedGroups = [...groups].filter(i => i.id !== id);
            setGroups(updatedGroups);
            });
        }

        if (loading) {
            return <p>Loading...</p>;
        }


  /**
   * Maps each group to a table row with its details and actions.
   *
   * @returns {Array} - The list of table rows for each group.
   */
    const groupList = groups.map(group => {
    // Create the address string by concatenating the address, city, and state/province.
    const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;

    return (
      <tr key={group.id}>
        {/* Render the group name */}
        <td className="nowrap">{group.name}</td>
        {/* Render the address */}
        <td>{address}</td>
        {/* Render the events for the group */}
        <td>
          {group.events.map(event => {
            // Format the event date and create the event details.
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
        {/* Render the action buttons */}
        <td>
          <div className="btn-group">
            {/* Render the edit button */}
            <Link to={"/groups/" + group.id} className="btn btn-primary btn-sm">Edit</Link>
            {/* Render the delete button */}
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
};


export default GroupList;