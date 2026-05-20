import Navbar from "@/components/layout/Navbar";


import { Outlet } from "react-router-dom";

function PublicLayout() {

    return (
        <div className="min-h-screen bg-[#F7F9FC]">

            {/* Navbar will come here later */}
            <Navbar />

            <main>
                <Outlet />
            </main>

            {/* Footer will come here later */}

        </div>
    );
}

export default PublicLayout;

