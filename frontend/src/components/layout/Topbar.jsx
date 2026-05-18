import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Topbar = ({ setSidebarOpen }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                {/* MOBILE MENU */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2.5 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors border border-gray-200"
                >
                    <Menu size={20} />
                </button>

                {/* TITLE */}
                <h2 className="text-xl font-bold text-gray-800 hidden sm:block">Dashboard</h2>
            </div>

            {/* USER SECTION */}
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">{user?.username || "User"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user?.email || "Email"}</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-200 border-2 border-white ring-2 ring-gray-50">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
