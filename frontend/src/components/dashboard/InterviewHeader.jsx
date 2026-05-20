import { Timer, BrainCircuit } from "lucide-react";

function InterviewHeader() {

    return (
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

            {/* LEFT */}

            <div>

                <h1 className="text-lg font-semibold text-gray-800">
                    AI Technical Interview
                </h1>

                <p className="text-sm text-gray-500">
                    Resume-based adaptive interview
                </p>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-4">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <Timer size={18} />

                    12:45

                </div>

                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    <BrainCircuit size={16} />

                    AI Active

                </div>

            </div>

        </div>
    );
}

export default InterviewHeader;