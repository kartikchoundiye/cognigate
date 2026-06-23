import InterviewHeader
    from "@/components/dashboard/interview/InterviewHeader";

import PlasmaSphere
    from "@/components/dashboard/interview/PlasmaSphere";

import InterviewConversation
    from "@/components/dashboard/interview/InterviewConversation";

import InterviewControls
    from "@/components/dashboard/interview/InterviewControls";

import InterviewSidebar
    from "@/components/dashboard/interview/InterviewSidebar";

import useMicrophone from "@/hooks/useMicrophone";

import {
    InterviewProvider,
}
    from "@/context/InterviewContext";

function InterviewPage() {
    const {
        volume,
        isListening,
        startListening,
        stopListening,
    } = useMicrophone();

    return (
        <div className="h-[calc(100vh-64px)] lg:h-screen w-[calc(100%+32px)] md:w-[calc(100%+48px)] -m-4 md:-m-6 flex flex-col bg-[#F7F9FC] text-gray-800">
            <InterviewHeader />

            <div className="flex flex-1 overflow-hidden pt-4 px-4 md:px-6 pb-4 md:pb-6 gap-6">

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 gap-4 min-w-0">
                    {/* Visual Banner */}
                    <div className="h-[220px] rounded-2xl bg-[#0f172a] shrink-0 overflow-hidden relative shadow-lg flex items-center justify-between px-12">
                        {/* Listening Indicator Overlay */}
                        <div className="z-10 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 flex flex-col items-center gap-3 w-[200px]">
                            <div className="flex items-center gap-2 text-green-400">
                                <div className="p-2 bg-green-500/20 rounded-full">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <span className="font-medium text-sm">Listening...</span>
                            </div>
                            <p className="text-slate-300 text-xs text-center">I'm listening to your response</p>
                            {/* Fake audio bars */}
                            <div className="flex gap-1 items-end h-8 mt-2">
                                {[30, 60, 45, 80, 50, 90, 70, 40, 85, 65, 35, 75].map((height, i) => (
                                    <div key={i} className="w-1.5 bg-green-400 rounded-t-sm" style={{ height: `${height}%` }}></div>
                                ))}
                            </div>
                        </div>

                        {/* 3D Sphere in background center */}
                        <div className="absolute inset-0 z-0">
                            <PlasmaSphere volume={volume} isSpeaking={isListening} />
                        </div>

                        {/* Voice Level Overlay */}
                        <div className="z-10 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 flex flex-col items-center gap-3 w-[200px]">
                            <p className="text-slate-300 text-sm font-medium">Voice Level</p>
                            <div className="text-3xl font-bold text-white">72%</div>
                            {/* Fake audio bars */}
                            <div className="flex gap-1 items-end h-8">
                                {[40, 85, 50, 95, 60, 100, 75, 55, 90, 65, 45, 80].map((height, i) => (
                                    <div key={i} className="w-1.5 bg-blue-500 rounded-t-sm" style={{ height: `${height}%` }}></div>
                                ))}
                            </div>
                            <p className="text-slate-400 text-xs mt-1">Speak clearly</p>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
                        <InterviewConversation />
                        <InterviewControls startListening={startListening} stopListening={stopListening} />
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="hidden xl:flex w-[350px] shrink-0 flex-col gap-6 overflow-y-auto pb-4">
                    <InterviewSidebar />
                </div>
            </div>
        </div>

    );
}

export default function InterviewPageWrapper() {

    return (

        <InterviewProvider>

            <InterviewPage />

        </InterviewProvider>

    );
}