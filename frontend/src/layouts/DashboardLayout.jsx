// function DashboardLayout() {
// return ( <div>DashboardLayout</div>
// );
// }

// export default DashboardLayout;




import { Outlet } from "react-router-dom";

function DashboardLayout() {

    return (
        <div className="min-h-screen flex bg-[#F7F9FC]">

            {/* Sidebar */}

            <div className="hidden lg:flex w-72 bg-white border-r border-gray-200">

                <div className="p-6">
                    Sidebar
                </div>

            </div>

            {/* Main Content */}

            <div className="flex-1">

                {/* Topbar */}

                <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6">

                    Topbar

                </div>

                {/* Page Content */}

                <main className="p-6">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;