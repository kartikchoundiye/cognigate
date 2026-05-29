import { Menu, Bell, CheckCircle2 } from "lucide-react";
import cognigateLogo from "@/assets/cognigate_logo_3.png";
import { useState, useRef, useEffect } from "react";

const Topbar = ({ setSidebarOpen }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const notificationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <header className="lg:hidden h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-30">
            {/* LEFT: MOBILE MENU */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors border border-gray-200"
            >
                <Menu size={20} />
            </button>

            {/* CENTER: LOGO */}
            <div className="flex items-center gap-2">
                <img src={cognigateLogo} alt="Cognigate Logo" className="w-6 h-6 object-contain" />
                <h1 className="text-lg font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Cognigate
                </h1>
            </div>

            {/* RIGHT: NOTIFICATIONS */}
            <div className="relative" ref={notificationRef}>
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 rounded-xl text-gray-600 transition-colors relative border ${showNotifications ? 'bg-gray-100 border-gray-200' : 'hover:bg-gray-50 border-transparent'}`}
                >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">Notifications</h3>
                            <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{unreadCount} New</span>
                        </div>
                        <div className="p-8 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                                <CheckCircle2 size={24} />
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">You're all caught up!</h4>
                            <p className="text-xs text-gray-500">No new notifications right now. We'll let you know when something arrives.</p>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Topbar;
