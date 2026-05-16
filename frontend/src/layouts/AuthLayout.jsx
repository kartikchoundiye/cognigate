// function AuthLayout() {
// return ( <div>AuthLayout</div>
// );
// }

// export default AuthLayout;




import { Outlet } from "react-router-dom";

function AuthLayout() {

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-linear-to-br from-blue-100 to-purple-100">

                <div className="max-w-md">

                    <h1 className="text-5xl font-bold text-gray-900">
                        Cognigate
                    </h1>

                    <p className="mt-6 text-lg text-gray-600">
                        AI-Powered Interview Preparation Platform
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex items-center justify-center p-6">

                <Outlet />

            </div>

        </div>
    );
}

export default AuthLayout;