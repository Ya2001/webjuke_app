require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/spotify/callback',
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // Here you would store the accessToken and profile in a database
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect('http://localhost:3000/dashboard');
  }
);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinSession', (sessionCode) => {
    socket.join(sessionCode);
  });

  socket.on('queueSong', (data) => {
    io.to(data.sessionCode).emit('updateQueue', data.song);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
