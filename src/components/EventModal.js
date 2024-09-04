import React, { useState } from 'react';

const EventModal = ({ onClose, onCreate }) => {
  const [eventName, setEventName] = useState('');

  const handleCreate = () => {
    if (eventName.trim()) {
      onCreate(eventName);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Event</h2>
        <input
          type="text"
          placeholder="Enter event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button onClick={handleCreate}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EventModal;
