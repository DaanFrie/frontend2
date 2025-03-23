import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

function Game() {
    const { id } = useParams(); // Haalt de game-id op uit de route-parameter
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGameDetails() {
            try {
                const response = await fetch(`http://145.24.223.37:8000/games/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP-fout: ${response.status}`);
                }

                const data = await response.json();
                setGame(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchGameDetails();
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    if (!game) {
        return <p className="text-center text-gray-500">Game niet gevonden.</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">{game.name}</h1>
            <p className="text-lg text-gray-700"><strong>Genre:</strong> {game.genre}</p>
            <p className="text-lg text-gray-700"><strong>Platform:</strong> {game.platform}</p>
        </div>
    );
}

export default Game;
