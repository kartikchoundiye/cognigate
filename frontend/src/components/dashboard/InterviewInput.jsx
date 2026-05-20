import { Mic, SendHorizonal } from "lucide-react";

function InterviewInput() {

    return (
        <div className="bg-white border-t border-gray-200 p-4">

            <div className="flex items-center gap-3">

                <button
                    className="
                        w-12
                        h-12
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        text-blue-600
                    "
                >
                    <Mic size={20} />
                </button>

                <input
                    type="text"
                    placeholder="Type your answer..."
                    className="
                        flex-1
                        h-12
                        px-4
                        rounded-xl
                        border
                        border-gray-300
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

                <button
                    className="
                        w-12
                        h-12
                        rounded-full
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                    "
                >
                    <SendHorizonal size={18} />
                </button>

            </div>

        </div>
    );
}

export default InterviewInput;