import React, { useState, useEffect } from 'react';
import './UserList.css'; // Import CSS for styling

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your Express server
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddClick = () => {
    // Future functionality for adding users
    alert('Add button clicked!');
  };

  return (
    <div className="user-list-container">
      <h1>Users</h1>
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-item">
            {user.name}
          </div>
        ))}
      </div>
      <button className="add-button" onClick={handleAddClick}>
        Add
      </button>
    </div>
  );
};

export default UserList;
