export default function QuestionBubble({ question, time = "11:21 AM" }) {
    return (
        <div className="flex items-start gap-4 w-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                <span className="text-blue-600 font-bold text-sm">AI</span>
            </div>
            <div className="flex flex-col gap-1 max-w-[80%]">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">AI Interviewer</span>
                    <span className="text-xs text-gray-400">&bull; {time}</span>
                </div>
                <div className="bg-[#F7F9FC] border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm">
                    {question}
                </div>
            </div>
        </div>
    );
}