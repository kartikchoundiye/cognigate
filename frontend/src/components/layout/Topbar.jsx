import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Topbar = ({ setOpenSidebar }) => {

    const { user } = useAuth();

    return (

        <header
            className="
                sticky top-0
                bg-white/80
                backdrop-blur-md
                border-b border-gray-200
                z-40
            "
        >

            <div
                className="
                    h-20
                    flex items-center justify-between
                    px-4 md:px-6
                "
            >

                {/* MOBILE MENU */}
                <button
                    onClick={() => setOpenSidebar(true)}
                    className="
                        lg:hidden
                        p-2 rounded-lg
                        hover:bg-gray-100
                    "
                >

                    <Menu size={24} />

                </button>

                {/* TITLE */}
                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Dashboard

                    </h2>

                </div>

                {/* USER */}
                <div
                    className="
                        flex items-center gap-3
                    "
                >

                    <div className="text-right hidden sm:block">

                        <p className="font-semibold text-gray-800">

                            {user?.username || "User"}

                        </p>

                        <p className="text-sm text-gray-500">

                            Candidate

                        </p>

                    </div>

                    <div
                        className="
                            w-11 h-11
                            rounded-full
                            bg-blue-100
                            flex items-center justify-center
                            text-blue-600
                            font-bold
                        "
                    >

                        {user?.username?.charAt(0)?.toUpperCase() || "U"}

                    </div>

                </div>

            </div>

        </header>
    );
};

export default Topbar;