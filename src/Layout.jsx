import { Link, Outlet } from "react-router";
import { FaHome, FaGamepad, FaPlus, FaInfoCircle } from "react-icons/fa"; // Import icons

function Layout() {
    return (
        <>
            <header className="bg-blue-700 text-white py-6">
                <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 w-4/5">
                    {/* Links met plaatjes en titels */}
                    <div className="flex gap-6 items-center">
                        <Link to="/" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                            <FaGamepad size={40} />
                            <h1 className="text-4xl font-extrabold">Mijn Games Website</h1>
                        </Link>
                    </div>

                    {/* Rechterkant met Create */}
                    <div className="flex gap-8 text-lg font-medium">
                        <Link to="/Games/Create" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                            <FaPlus size={20} />
                            Create Game
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="p-8 bg-gray-50 min-h-screen w-4/5 mx-auto">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
