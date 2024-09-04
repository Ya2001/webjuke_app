import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Search from './Search';
import Playlist from './Playlist';
import axios from 'axios';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'] 
});

const Dashboard = () => {
  const [playlist, setPlaylist] = useState([]);
  const [sessionCode] = useState('');

  useEffect(() => {
    socket.on('updateQueue', (song) => {
      setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
    });

    return () => {
      socket.off('updateQueue');
    };
  }, []);

  const searchTracks = async (query) => {
    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: { query },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error searching tracks:', error);
    }
  };

  return (
    <div>
      <header>
        <h1>My Event Dashboard</h1>
        <h2>Session Code: {sessionCode}</h2>
      </header>
      <Search onTrackSelect={searchTracks} />
      <Playlist playlist={playlist} />
    </div>
  );
};

export default Dashboard;
