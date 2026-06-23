import { useAuth } from "@/hooks/useAuth";

export default function AnswerBubble({ answer, time = "11:22 AM" }) {
    const { user } = useAuth();

    return (
        <div className="flex items-start gap-4 w-full justify-end">
            <div className="flex flex-col gap-1 max-w-[80%] items-end">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">You</span>
                    <span className="text-xs text-gray-400">&bull; {time}</span>
                </div>
                <div className="bg-blue-50/80 border border-blue-100 text-gray-800 rounded-2xl rounded-tr-none px-5 py-3 shadow-sm">
                    {answer}
                </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden shrink-0 border border-blue-200">
                <img 
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.username || "Aman"}`} 
                    alt="avatar" 
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}