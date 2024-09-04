const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS options
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent and received
  },
});

const socket = io('http://localhost:5000', {
  transports: ['websocket'] // Ensure this is correctly configured
});

socket.on('connect', () => {
  console.log('WebSocket connected');
});

socket.on('disconnect', () => {
  console.log('WebSocket disconnected');
});


app.use(cors({
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent and received
}));

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});


app.use(express.json());

app.set('spotifyAccessToken', 'your_access_token');



app.get('/search', async (req, res) => {
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;
  console.log('Access Token:', accessToken); 

});

app.get('/search', async (req, res) => {
  const accessToken = app.get('spotifyAccessToken');
  const query = req.query.query;

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 10,
      },
    });

    res.json(response.data.tracks.items);
  } catch (error) {
    console.error('Error searching tracks:', error);
    res.status(500).send('Error searching tracks');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
