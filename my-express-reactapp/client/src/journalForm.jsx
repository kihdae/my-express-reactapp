import React, { useState } from 'react';

const JournalEntryForm = ({ onSubmit }) => {
  const [newJournalEntry, setNewJournalEntry] = useState('');

  const handleJournalEntryChange = (event) => {
    setNewJournalEntry(event.target.value);
  };

  const handleAddJournalEntry = async () => {
    const url = ('http://localhost:3000/api/journal'); // Use a different endpoint

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newJournalEntry }),
      });

      if (!response.ok) {
        throw new Error('Failed to add journal entry');
      }

      const data = await response.json();
      console.log('Journal entry added:', data);

      // Clear input field after successful submission
      setNewJournalEntry('');

      // Call the passed-down onSubmit function (if provided)
      if (onSubmit) {
        onSubmit(data); // Pass the added entry data
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