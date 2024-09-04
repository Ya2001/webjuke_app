import React from 'react';
import AuthButton from '../components/AuthButton';
import JoinButton from '../components/JoinButton';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  return (
    <ErrorBoundary>
    <div>
      
      <h1>WebJuke</h1>
      <p> Welcome to webjuke, the app the allows everyone to DJ</p>
      <AuthButton />
      <JoinButton/>
      
    </div>
    </ErrorBoundary>
  );
};

export default Home;
