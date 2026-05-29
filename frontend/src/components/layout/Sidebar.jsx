import {
    LayoutDashboard, Mic, FileText, BarChart3, History, MessageSquare, Settings, LogOut, X, Menu, MoreVertical, PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import LogoutModal from "@/components/ui/LogoutModal";
import cognigateLogo from "@/assets/cognigate_logo_3.png";

function Sidebar({ mobile, closeSidebar, isExpanded = true, setIsExpanded }) {
    const { user, logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    // If mobile, we always treat it as expanded visually but handling its own drawer state.
    // For desktop, we use isExpanded.
    const expanded = mobile ? true : isExpanded;

    const navItems = [
        { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { title: "Interview", icon: Mic, path: "/interview" },
        { title: "Resume", icon: FileText, path: "/resume" },
        { title: "Analytics", icon: BarChart3, path: "/analytics" },
        { title: "History", icon: History, path: "/history" },
        { title: "Feedback", icon: MessageSquare, path: "/feedback" },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <aside className={`${expanded ? 'w-72 px-6' : 'w-20 px-4'} h-screen bg-white border-r border-gray-100 flex flex-col py-6 shadow-sm transition-all duration-300 relative`}>
            {/* LOGO AREA */}
            <div className={`mb-10 flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
                {expanded ? (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <img src={cognigateLogo} alt="Cognigate Logo" className="w-8 h-8 object-contain" />
                            <div>
                                <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Cognigate
                                </h1>
                            </div>
                        </div>
                        {!mobile && (
                            <div className="relative group">
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <PanelLeftClose size={20} />
                                </button>
                                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                    Collapse navigation
                                </div>
                            </div>
                        )}
                        {mobile && (
                            <button
                                onClick={closeSidebar}
                                className="p-2 bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                            >
                                <PanelLeftClose size={20} />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="relative group flex items-center justify-center w-full h-10">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="absolute inset-0 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-xl transition-colors z-10 opacity-0 group-hover:opacity-100"
                        >
                            <PanelLeftOpen size={24} />
                        </button>
                        <img
                            src={cognigateLogo}
                            alt="Cognigate Logo"
                            className="w-8 h-8 object-contain transition-opacity duration-200 group-hover:opacity-0"
                        />
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Expand navigation
                        </div>
                    </div>
                )}
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 space-y-2 relative">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.title}
                            to={item.path}
                            onClick={() => mobile && closeSidebar && closeSidebar()}
                            className={({ isActive }) =>
                                `relative group flex items-center ${expanded ? 'gap-3 px-4 py-3' : 'justify-center p-3'} rounded-xl transition-all duration-200 font-medium ${isActive
                                    ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={20} className={isActive ? "text-blue-600 shrink-0" : "text-gray-500 shrink-0"} />
                                    {expanded && <span className="truncate">{item.title}</span>}

                                    {!expanded && (
                                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                            {item.title}
                                        </div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* BOTTOM ACTIONS (SETTINGS & PROFILE) */}
            <div className="pt-4 border-t border-gray-100 mt-auto space-y-2">
                {/* Settings */}
                <NavLink
                    to="/settings"
                    onClick={() => mobile && closeSidebar && closeSidebar()}
                    className={({ isActive }) =>
                        `relative group flex items-center ${expanded ? 'gap-3 px-4 py-3' : 'justify-center p-3'} rounded-xl transition-all duration-200 font-medium ${isActive
                            ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Settings size={20} className={isActive ? "text-blue-600 shrink-0" : "text-gray-500 shrink-0"} />
                            {expanded && <span className="truncate">Settings</span>}

                            {!expanded && (
                                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                    Settings
                                </div>
                            )}
                        </>
                    )}
                </NavLink>

                {/* Profile */}
                <div className="relative" ref={profileMenuRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className={`w-full group flex items-center ${expanded ? 'gap-3 px-3 py-2' : 'justify-center p-2'} rounded-xl transition-all duration-200 hover:bg-gray-50 border border-transparent`}
                    >
                        <div className="w-9 h-9 shrink-0 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-gray-50">
                            {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        {expanded && (
                            <div className="flex-1 text-left min-w-0 flex items-center justify-between">
                                <div className="truncate">
                                    <p className="font-semibold text-gray-900 text-sm truncate">{user?.username || "User"}</p>
                                </div>
                                <MoreVertical size={16} className="text-gray-400" />
                            </div>
                        )}
                        {!expanded && (
                            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                Profile
                            </div>
                        )}
                    </button>

                    {/* Profile Popup */}
                    {showProfileMenu && (
                        <div className={`absolute bottom-full mb-2 ${expanded ? 'left-0 w-full' : 'left-full ml-4 w-56'} bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden`}>
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <p className="font-semibold text-gray-900 text-sm truncate">{user?.username || "User"}</p>
                                <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email || "Email"}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        setShowLogoutModal(true);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
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
