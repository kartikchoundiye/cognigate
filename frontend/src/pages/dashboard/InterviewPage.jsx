import InterviewHeader from "@/components/dashboard/InterviewHeader";
import InterviewChat from "@/components/dashboard/InterviewChat";
import InterviewSidebar from "@/components/dashboard/InterviewSidebar";
import InterviewInput from "@/components/dashboard/InterviewInput";
import VoiceControls from "@/components/dashboard/VoiceControls";

function InterviewPage() {

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col">

            {/* HEADER */}

            <InterviewHeader />

            {/* MAIN CONTENT */}

            <div className="flex flex-1 overflow-hidden">

                {/* CHAT AREA */}

                <div className="flex-1 flex flex-col bg-[#F7F9FC]">

                    <InterviewChat />

                    <InterviewInput />

                </div>

                {/* RIGHT SIDEBAR */}

                <div className="hidden xl:flex w-80 border-l border-gray-200 bg-white">

                    <InterviewSidebar />

                </div>

            </div>

            {/* FLOATING VOICE CONTROLS */}

            <VoiceControls />

        </div>
    );
}

export default InterviewPage;