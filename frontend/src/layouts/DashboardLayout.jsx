import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import Topbar from "@/components/layout/Topbar";

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className="h-screen overflow-hidden bg-[#F7F9FC] flex">
            {/* MOBILE SIDEBAR */}
            <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* DESKTOP SIDEBAR */}
            <div className="hidden lg:flex transition-all duration-300">
                <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <Topbar setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
