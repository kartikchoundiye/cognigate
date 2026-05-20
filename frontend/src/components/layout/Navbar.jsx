import { Link } from "react-router-dom";
import logo from "@/assets/cognigate_logo.jpeg";

function Navbar() {

    return (
        <header className="fixed top-0 left-0 w-full z-50">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-3 transition-transform hover:opacity-80"
                    >
                        <div className="h-11 w-11 overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
                            <img src={logo} alt="Cognigate" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">Cognigate</span>
                    </Link>

                    {/* NAV LINKS */}

                    <nav className="hidden md:flex items-center gap-8">

                        <Link
                            to="/features"
                            className="text-gray-600 hover:text-black transition"
                        >
                            Features
                        </Link>

                        <Link
                            to="/about"
                            className="text-gray-600 hover:text-black transition"
                        >
                            About
                        </Link>

                    </nav>

                    {/* RIGHT BUTTONS */}

                    <div className="flex items-center gap-4">

                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-black transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Navbar;