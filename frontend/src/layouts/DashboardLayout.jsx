import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import Topbar from "@/components/layout/Topbar";

function DashboardLayout() {

    const [openSidebar, setOpenSidebar] =
        useState(false);

    return (

        <div
            className="
                min-h-screen
                bg-[#F7F9FC]
                flex
            "
        >

            {/* MOBILE SIDEBAR */}

            <MobileSidebar
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
            />

            {/* DESKTOP SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div
                className="
                    flex-1
                    lg:ml-72
                    flex flex-col
                    min-h-screen
                "
            >

                {/* TOPBAR */}

                <Topbar
                    setOpenSidebar={setOpenSidebar}
                />

                {/* PAGE CONTENT */}

                <main
                    className="
                        flex-1
                        p-4 md:p-6
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;