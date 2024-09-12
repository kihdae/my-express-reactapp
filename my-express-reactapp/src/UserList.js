import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '' });
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => {
        console.log('data emulated:', data);
        setUsers(data);
      })
      .catch(error => console.error('fetching users did not work out:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value 
    }));
  }; // ANGELO'S GUIDANCE 

  const handleAddClick = () => {
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => [...prevUsers, data]);
        setNewUser({ name: '' });
        alert('success.');
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteAllClick = () => {
    fetch('http://localhost:3000/api/users', {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setUsers([]); // clears users in frontend
        alert('it is all gone.');
      })
      .catch(error => console.error('you could not delete users:', error));
  };

  

  return (
    <div className="user-list-container">
      <h1>Fitness Tracker </h1>
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-item">
            {user.name}
          </div>
        ))}
      </div>
      <input
        type="text"
        name="name"
        value={newUser.name}
        onChange={handleInputChange}
        placeholder="Enter new user name"
        className="input-field"
        />
        <button className="add-button" onClick={handleAddClick}>
          Add User
        </button>
        <button className="delete-button" onClick={handleDeleteAllClick}>
          Delete All Users
        </button>
      </div>
    );
  };

export default UserList;
