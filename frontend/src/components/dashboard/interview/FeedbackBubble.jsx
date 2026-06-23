export default function FeedbackBubble({ feedback, time = "Now" }) {
    return (
        <div className="flex items-start gap-4 w-full">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
            </div>
            <div className="flex flex-col gap-1 max-w-[80%]">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">Feedback</span>
                    <span className="text-xs text-gray-400">&bull; {time}</span>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-100 text-emerald-800 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm whitespace-pre-wrap text-sm">
                    {feedback}
                </div>
            </div>
        </div>
    );
}
