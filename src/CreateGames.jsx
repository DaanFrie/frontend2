import React, { useState } from 'react';

function CreateGames() {
    const [gameData, setGameData] = useState({
        name: '',
        genre: '',
        platform: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Functie om de input in de state bij te werken
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGameData({
            ...gameData,
            [name]: value,
        });
    };

    // Functie om het formulier te versturen
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Verander dit naar 'application/json' als dat vereist is
                },
                body: JSON.stringify(gameData),
            });



            if (!response.ok) {
                throw new Error('Er is iets misgegaan bij het toevoegen van de game');
            }

            setSuccess(true);  // Melding van succes
            setGameData({
                name: '',
                genre: '',
                platform: '', // Reset platform naar lege waarde
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto bg-gray-50 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Create a New Game</h1>

            {success && <p className="text-green-500 text-center mb-4">Game toegevoegd!</p>}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={gameData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Game Name"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={gameData.genre}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Game Genre"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Platform</label> {/* Platform label */}
                    <input
                        type="text"
                        name="platform"
                        value={gameData.platform}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Game Platform (e.g., PC, PlayStation)"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {loading ? 'Adding...' : 'Add Game'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateGames;
