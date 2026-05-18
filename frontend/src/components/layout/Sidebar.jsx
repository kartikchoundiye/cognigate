import {
    LayoutDashboard, Mic, FileText, BarChart3, History, MessageSquare, Settings, LogOut, X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import LogoutModal from "@/components/ui/LogoutModal";

function Sidebar({ mobile, closeSidebar }) {
    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navItems = [
        { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { title: "Interview", icon: Mic, path: "/interview" },
        { title: "Resume", icon: FileText, path: "/resume" },
        { title: "Analytics", icon: BarChart3, path: "/analytics" },
        { title: "History", icon: History, path: "/history" },
        { title: "Feedback", icon: MessageSquare, path: "/feedback" },
        { title: "Settings", icon: Settings, path: "/settings" },
    ];

    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col p-6 shadow-sm">
            {/* LOGO */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Cognigate
                    </h1>
                    <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">
                        AI Interview Platform
                    </p>
                </div>
                {mobile && (
                    <button
                        onClick={closeSidebar}
                        className="p-2 bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.title}
                            to={item.path}
                            onClick={() => mobile && closeSidebar && closeSidebar()}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
                                    ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-500"} />
                                    <span>{item.title}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* LOGOUT */}
            <div className="pt-6 border-t border-gray-100 mt-auto">
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={() => {
                    setShowLogoutModal(false);
                    logout();
                }}
            />
        </aside>
    );
}

export default Sidebar;
