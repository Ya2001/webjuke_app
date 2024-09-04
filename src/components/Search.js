import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onTrackSelect }) => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/search', {
                params: { query },
            });
            setTracks(response.data);
        } catch (error) {
            console.error('Error searching tracks:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a song"
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {tracks.map((track) => (
                    <li key={track.id} onClick={() => onTrackSelect(track)}>
                        {track.name} by {track.artists[0].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
