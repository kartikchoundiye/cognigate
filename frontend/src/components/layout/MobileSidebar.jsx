import Sidebar from "./Sidebar";

function MobileSidebar({ sidebarOpen, setSidebarOpen }) {
    return (
        <>
            {/* OVERLAY */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`
                    fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <Sidebar mobile closeSidebar={() => setSidebarOpen(false)} />
            </div>
        </>
    );
}

export default MobileSidebar;
