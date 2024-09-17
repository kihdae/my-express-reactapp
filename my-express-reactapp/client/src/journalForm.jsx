import React, { useState } from 'react';

const JournalEntryForm = ({ onSubmit, userId }) => {
  const [newJournalEntry, setNewJournalEntry] = useState('');

  const handleJournalEntryChange = (event) => {
    setNewJournalEntry(event.target.value);
  };

  const handleAddJournalEntry = async () => {
    const url = 'http://localhost:3000/api/journal'; 

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newJournalEntry, userId }),
      });

      const data = await response.json();
      console.log('entry added:', data);

      setNewJournalEntry('');

      //  passed down onSubmit function 
      if (onSubmit) {
        onSubmit(data); 
      }
    } catch (error) {
      console.error('Error adding journal entry:', error);
    }
  };

  return (
    <div className="journal-entry-form">
      <textarea
        placeholder="Journal entry"
        value={newJournalEntry}
        onChange={handleJournalEntryChange}
      />
      <button onClick={handleAddJournalEntry}>Add Entry</button>
    </div>
  );
};

export default JournalEntryForm;