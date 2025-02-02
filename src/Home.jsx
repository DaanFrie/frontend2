import FetchGames from "./FetchGames.jsx";

function Home() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Homepage voor mijn games</h1>
            <FetchGames />
        </div>
    );
}

export default Home;
