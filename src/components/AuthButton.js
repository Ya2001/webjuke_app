import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventModal from './EventModal';

const AuthButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateEvent = (eventName) => {
    const sessionCode = generateSessionCode();
    // Here you can also create the event on the server if needed
    navigate(`/dashboard`, { state: { eventName, sessionCode } });
  };

  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Create New Event</button>
      {isModalOpen && (
        <EventModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateEvent}
        />
      )}
    </div>
  );
};

export default AuthButton;
