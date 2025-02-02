import React, { useState, useEffect } from 'react';

const FetchGames = () => {
    const [games, setGames] = useState([]); // Initialiseer als lege array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch('http://145.24.223.37:8000/games', {
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
                console.log("Games opgehaald:", data);

                // Controleer of data.items bestaat en een array is
                if (data.items && Array.isArray(data.items)) {
                    setGames(data.items);
                } else {
                    throw new Error('Onverwacht dataformaat: geen array ontvangen.');
                }
            } catch (error) {
                console.error("Error:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchGames();
    }, []);

    // Verwijder de game uit de lijst
    const deleteGame = async (gameId) => {
        try {
            const response = await fetch(`http://145.24.223.37:8000/games/${gameId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP-fout bij verwijderen: ${response.status}`);
            }

            // Verwijder de game uit de lokale status
            setGames(games.filter(game => game.id !== gameId));
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
        }
    };

    // Functie om naar de detailpagina van de geselecteerde game te navigeren
    const goToGameDetails = (gameId) => {
        window.location.href = `/game/${gameId}`;
    };

    // Functie om naar de bewerkingspagina van de geselecteerde game te navigeren
    const goToEditGame = (gameId) => {
        window.location.href = `/game/edit/${gameId}`;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!games.length) {
        return <p>Geen games gevonden.</p>;
    }

    return (
        <div className="mx-auto p-8">
            <div className="grid grid-cols-2 gap-4">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="p-4 border rounded shadow bg-blue-700 text-white flex flex-col items-center cursor-pointer hover:bg-blue-800 transition-colors"
                    >
                        <h2 className="font-bold text-xl" onClick={() => goToGameDetails(game.id)}>
                            {game.name}
                        </h2>
                        <div className="mt-4 space-x-2">
                            {/* Voeg een Delete-knop toe */}
                            <button
                                onClick={() => deleteGame(game.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                            >
                                Delete
                            </button>
                            {/* Voeg een Edit-knop toe */}
                            <button
                                onClick={() => goToEditGame(game.id)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchGames;
