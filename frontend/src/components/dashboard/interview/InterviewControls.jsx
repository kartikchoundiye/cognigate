import { useState } from "react";
import useInterview from "@/hooks/useInterview";
import { PhoneOff, Send } from "lucide-react";

function InterviewControls() {
    const { status, setStatus, sessionId, submitAnswer } = useInterview();
    const [textInput, setTextInput] = useState("");
    const isListening = status === "listening";

    const handleSend = () => {
        if (textInput.trim() && isListening) {
            submitAnswer(textInput.trim());
            setTextInput("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleEndInterview = () => {
        setStatus("idle");
        // Add any actual end interview cleanup here if needed
        alert("Interview Ended");
    };

    if (!sessionId) return null; // Don't show controls until interview starts

    return (
        <div className="bg-white border-t border-gray-100 p-4 shrink-0">
            <div className="flex items-center gap-4 max-w-4xl mx-auto">
                <button 
                    onClick={handleEndInterview}
                    className="flex shrink-0 items-center gap-2 px-5 py-3 rounded-full border border-red-200 text-red-500 hover:bg-red-50 font-medium text-sm transition-colors"
                >
                    <PhoneOff className="w-4 h-4" />
                    <span className="hidden sm:inline">End Interview</span>
                </button>

                <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-full px-2 py-1.5 focus-within:border-blue-400 focus-within:bg-white transition-all shadow-sm">
                    <input 
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!isListening}
                        placeholder={isListening ? "Type your response here..." : "Wait for the AI to finish speaking..."}
                        className="flex-1 bg-transparent px-4 py-1.5 text-sm outline-none disabled:opacity-50 text-gray-800 placeholder:text-gray-400"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!isListening || !textInput.trim()}
                        className="p-2 shrink-0 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InterviewControls;