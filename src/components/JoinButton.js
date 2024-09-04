import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard'); // Navigates to the Dashboard component
  };

  return <button onClick={handleLogin}>Join An Event</button>;
};

export default JoinButton;