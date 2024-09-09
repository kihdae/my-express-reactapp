import React, { useState } from 'react';
import './UserList.css'; 

const UserForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // make a request to te Express server
    fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }), // send the user's name to the server
    })
      .then(response => response.json())
      .then(data => {
        console.log('User added:', data);
        setName('');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange = {change}
        placeholder="Enter name"
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
