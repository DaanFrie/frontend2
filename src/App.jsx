import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Games from "./Games.jsx";
import Game from "./Game.jsx";
import CreateGames from "./CreateGames.jsx";
import FetchGames from "./FetchGames.jsx";
import EditGame from "./EditGame.jsx"; // Vergeet niet de EditGame component in te voegen

const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <Home />,
        },

        {
            path: '/Games',
            element: <Games />
        },
        {
            path: '/Game/:id',
            element: <Game />
        },
        {
            path: '/game/edit/:id', // Voeg hier de route toe voor het bewerken van een game
            element: <EditGame /> // De component voor de editpagina
        },
        {
            path: '/Games/Create',
            element: <CreateGames />
        },
    ]
}]);

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;
