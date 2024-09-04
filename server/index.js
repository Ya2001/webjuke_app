// index.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // This should allow requests from both http://localhost:3000 and http://localhost:3000/dashboard
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

app.use(cors({
  origin: "http://localhost:3000", // Allow requests from http://localhost:3000 and its paths
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// Your search route
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
