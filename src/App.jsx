import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Game from "./Game.jsx";
import CreateGames from "./CreateGames.jsx";
import FetchGames from "./FetchGames.jsx";
import EditGame from "./EditGame.jsx";

const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/Games',
            element: <FetchGames />
        },
        {
            path: '/Game/:id',
            element: <Game />
        },
        {
            path: '/game/edit/:id',
            element: <EditGame />
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
