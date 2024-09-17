import React, { useState, useEffect } from 'react';
import './UserList.css';
import JournalEntryForm from './journalForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '' });
  const [newJournalEntry, setNewJournalEntry] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        setUsers(data);
        console.log(users)
      } catch (error) {
        console.error('Error fetching users:', error); 
  
      }
    };
  
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value 
    }));
  };

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
        alert('User added successfully!');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteAllClick = () => {
    fetch('http://localhost:3000/api/users', {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setUsers([]); // clears users in frontend
        alert(`Poof`);
      })
      .catch(error => console.error('Error deleting users:', error));
  };

  // const renderJournalEntries = (user) => {
  //   if (!user) return null; 
  //   if (!user.journalEntries) return null; 
  //   return user.journalEntries.map((entry, index) => (
  //     <div key={index}>
  //       {entry.content}
  //     </div>
  //   ));
  // };


  const handleAddJournalEntry = async (userId) => {
    const url = ('http://localhost:3000/api/journal');

    try {
      const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newJournalEntry, userId}),
    });

      const data = await response.json();
      console.log('journal entry added:', data);
      
      //clear input field after
      setNewJournalEntry('');
      alert(`Journal entry`); 
    } catch(error){
      console.error('bru:', error);
      alert(`Ugh!`); 
    }
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
        <JournalEntryForm onSubmit={handleAddJournalEntry} />
      </div>
    );
  };

export default UserList;
