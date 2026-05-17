import {
    LayoutDashboard,
    Mic,
    FileText,
    BarChart3,
    History,
    MessageSquare,
    Settings,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import LogoutModal from "@/components/ui/LogoutModal";

const Sidebar = () => {

    const navItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },

        {
            title: "Interview",
            icon: Mic,
            path: "/interview",
        },

        {
            title: "Resume",
            icon: FileText,
            path: "/resume",
        },

        {
            title: "Analytics",
            icon: BarChart3,
            path: "/analytics",
        },

        {
            title: "History",
            icon: History,
            path: "/history",
        },

        {
            title: "Feedback",
            icon: MessageSquare,
            path: "/feedback",
        },

        {
            title: "Settings",
            icon: Settings,
            path: "/settings",
        },
    ];

    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);


    return (

        <aside
            className="
                hidden lg:flex
                fixed left-0 top-0
                h-screen w-64
                bg-white
                border-r border-gray-200
                flex-col
                z-50
            "
        >

            {/* LOGO */}
            <div className="h-20 flex items-center px-6 border-b border-gray-200">

                <h1 className="text-2xl font-bold text-blue-600">

                    Cognigate

                </h1>

            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 p-4 space-y-2">

                {navItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                                flex items-center gap-3
                                px-4 py-3
                                rounded-xl
                                transition-all duration-200
                                ${isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                                `
                            }
                        >

                            <Icon size={25} />

                            <span className="font-medium">

                                {item.title}

                            </span>

                        </NavLink>
                    );
                })}
            </nav>

            {/* LOGOUT */}
            <div className="p-4 border-t border-gray-200">

                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="
                        w-full
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        text-red-500
                        hover:bg-red-50
                        transition-all
                    "
                >

                    <LogOut size={25} />

                    Logout

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
};

export default Sidebar;
