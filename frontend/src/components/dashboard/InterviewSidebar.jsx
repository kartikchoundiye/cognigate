function InterviewSidebar() {

    return (
        <div className="w-full p-5 space-y-6">

            {/* PROGRESS */}

            <div className="bg-[#F7F9FC] rounded-2xl p-4">

                <h3 className="font-semibold text-gray-800 mb-3">
                    Interview Progress
                </h3>

                <div className="w-full h-3 bg-gray-200 rounded-full">

                    <div className="w-[40%] h-3 bg-blue-600 rounded-full"></div>

                </div>

            </div>

            {/* CURRENT TOPIC */}

            <div className="bg-[#F7F9FC] rounded-2xl p-4">

                <h3 className="font-semibold text-gray-800 mb-2">
                    Current Topic
                </h3>

                <p className="text-sm text-gray-600">
                    React Authentication Flow
                </p>

            </div>

            {/* AI ANALYSIS */}

            <div className="bg-[#F7F9FC] rounded-2xl p-4">

                <h3 className="font-semibold text-gray-800 mb-2">
                    AI Analysis
                </h3>

                <ul className="text-sm text-gray-600 space-y-2">

                    <li>✔ Communication clarity good</li>
                    <li>✔ Technical depth moderate</li>
                    <li>⚠ Add more architecture details</li>

                </ul>

            </div>

        </div>
    );
}

export default InterviewSidebar;