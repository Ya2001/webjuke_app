import React from 'react';

const Playlist = ({ playlist }) => {
    return (
        <div>
            <h2>Queued Songs</h2>
            <ul>
                {playlist.map((track, index) => (
                    <li key={index}>
                        <strong>{track.name}</strong> by {track.artists.map(artist => artist.name).join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
