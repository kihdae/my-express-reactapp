import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '' });
  const [newJournalEntry, setNewJournalEntry] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
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
        alert('All users have been deleted.');
      })
      .catch(error => console.error('Error deleting users:', error));
  };

  const renderJournalEntries = (journalEntries) => {
    if (!journalEntries) return null;
    return journalEntries.map((entry, index) => (
      <div key={index}>
        {entry.content} 
      </div>
    ));
  };

  const handleJournalEntryChange = (event) => {
    setNewJournalEntry(event.target.value);
  };

  const handleAddJournalEntry = async (event) => {
    event.preventDefault();

    const url = ('http://localhost:3000/api/journal')

    try {
      const response = await fetch(url.replace('e, entry'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newJournalEntry})
    });
    // if (!response.ok) {
    //   throw new error('')
    // }
      const data = await response.json();
      console.log('journal entry added:', data);
      
      //clear input field after
      setNewJournalEntry('');
  } catch(error){
    console.error('bru:', error);
  }
      };
    //

  return (
    <div className="user-list-container">
      <h1>Fitness Tracker </h1>
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-item">
            {user.name}
            <div className="journal-entries">
            {renderJournalEntries(user.journalEntries)}
          </div>
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
        <div className="journal-entry-form">
        <textarea
          placeholder="journal?"
          value={newJournalEntry}
          onChange={handleJournalEntryChange}
        />
        <button onClick={handleAddJournalEntry}>Add entry</button>
      </div>
      </div>
    );
  };

export default UserList;
