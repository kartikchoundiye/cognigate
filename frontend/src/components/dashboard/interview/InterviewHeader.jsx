import { useAuth } from "@/hooks/useAuth";
import { Clock, Sun } from "lucide-react";

function InterviewHeader() {
    const { user } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            {/* Left side */}
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">
                    AI Interview Session
                </h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium border border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Live
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>00:18:42</span>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Sun className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{user?.username || "Aman Verma"}</div>
                        <div className="text-xs text-gray-500">Student</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border border-gray-200">
                        {/* Placeholder avatar */}
                        <img 
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.username || "Aman"}`} 
                            alt="avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default InterviewHeader;