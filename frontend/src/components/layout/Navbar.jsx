import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, PanelLeftClose, Layout, Info, LogIn, UserPlus, Home } from "lucide-react";
import logo from "@/assets/cognigate_logo.jpeg";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

                {/* NAVBAR CONTAINER */}
                <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm px-4 md:px-6 py-4 relative flex items-center justify-between">

                    {/* LEFT: MOBILE MENU TOGGLE OR DESKTOP LOGO */}
                    <div className="flex items-center">
                        <button
                            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-black focus:outline-none z-10"
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="hidden md:flex items-center gap-3">
                            <div className="h-11 w-11 overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
                                <img src={logo} alt="Cognigate" className="h-full w-full object-cover" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">Cognigate</span>
                        </div>
                    </div>

                    {/* CENTER: MOBILE BRAND NAME ONLY */}
                    <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900 tracking-tight">Cognigate</span>
                    </div>

                    {/* CENTER: DESKTOP NAV LINKS (Perfectly Centered) */}
                    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
                        <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? "bg-gray-100 text-black shadow-sm" : "text-gray-600 hover:text-black hover:bg-gray-50"}`}>Home</NavLink>
                        <NavLink to="/features" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? "bg-gray-100 text-black shadow-sm" : "text-gray-600 hover:text-black hover:bg-gray-50"}`}>Features</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? "bg-gray-100 text-black shadow-sm" : "text-gray-600 hover:text-black hover:bg-gray-50"}`}>About</NavLink>
                    </nav>

                    {/* RIGHT: BUTTONS OR MOBILE REGISTER ICON */}
                    <div className="flex items-center">

                        {/* RIGHT BUTTONS (DESKTOP) */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/login" className="text-gray-700 hover:text-black transition">Login</Link>
                            <Link to="/signup" className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition">Get Started</Link>
                        </div>

                        {/* MOBILE REGISTER ICON (RIGHT) */}
                        <Link
                            to="/signup"
                            className="md:hidden p-2 -mr-2 text-gray-600 hover:text-black focus:outline-none z-10"
                            onClick={closeMenu}
                            aria-label="Register"
                        >
                            <UserPlus size={24} />
                        </Link>
                    </div>

                </div>

                {/* MOBILE SIDEBAR OVERLAY */}
                {isMenuOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                        onClick={closeMenu}
                    />
                )}

                {/* MOBILE SIDEBAR DRAWER */}
                <div className={`md:hidden fixed inset-y-0 left-0 w-[80vw] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

                    {/* SIDEBAR HEADER */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
                                <img src={logo} alt="Cognigate" className="h-full w-full object-cover" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">Cognigate</span>
                        </div>
                        <button
                            onClick={closeMenu}
                            className="p-2 text-gray-500 hover:text-black bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <PanelLeftClose size={20} />
                        </button>
                    </div>

                    {/* SIDEBAR LINKS */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? "bg-gray-100 text-black shadow-sm" : "text-gray-700 hover:text-black hover:bg-gray-50"}`}
                            onClick={closeMenu}
                        >
                            {({ isActive }) => (
                                <>
                                    <Home size={20} className={isActive ? "text-black" : "text-gray-400"} />
                                    Home
                                </>
                            )}
                        </NavLink>
                        <NavLink
                            to="/features"
                            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? "bg-gray-100 text-black shadow-sm" : "text-gray-700 hover:text-black hover:bg-gray-50"}`}
                            onClick={closeMenu}
                        >
                            {({ isActive }) => (
                                <>
                                    <Layout size={20} className={isActive ? "text-black" : "text-gray-400"} />
                                    Features
                                </>
                            )}
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? "bg-gray-100 text-black shadow-sm" : "text-gray-700 hover:text-black hover:bg-gray-50"}`}
                            onClick={closeMenu}
                        >
                            {({ isActive }) => (
                                <>
                                    <Info size={20} className={isActive ? "text-black" : "text-gray-400"} />
                                    About
                                </>
                            )}
                        </NavLink>
                    </nav>

                    {/* SIDEBAR FOOTER */}
                    <div className="p-6 border-t border-gray-100">
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-3 w-full bg-gray-50 hover:bg-gray-100 text-gray-900 py-3 rounded-xl transition-colors font-medium border border-gray-200"
                            onClick={closeMenu}
                        >
                            <LogIn size={20} className="text-gray-500" />
                            Login
                        </Link>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Navbar;