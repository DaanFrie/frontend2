import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router";

const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(null);
    const [name, setName] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`http://145.24.223.37:8000/games/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGame(data);
                    setName(data.name);
                    setPlatform(data.platform);
                    setGenre(data.genre);
                } else {
                    setError('Game not found or server error.');
                }
            } catch (error) {
                console.error('Error:', error.message);
                setError('Failed to fetch game data.');
            }
        };

        fetchGame();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !platform || !genre) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch(`http://145.24.223.37:8000/games/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    platform,
                    genre,
                }),
            });

            if (response.ok) {

                navigate(`/game/${id}`);
            } else {
                setError('Error updating the game.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="mx-auto p-8">
            <h1 className="text-2xl mb-4">Edit Game</h1>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            {game ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block">Game Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="platform" className="block">Platform</label>
                        <input
                            type="text"
                            id="platform"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block">Genre</label>
                        <input
                            type="text"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Update Game
                    </button>

                    <div className="mt-4">
                        <Link to={`/`} className="text-blue-500 underline">
                            Cancel & go back
                        </Link>
                    </div>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditGame;
