import QuestionBubble from "./QuestionBubble";
import AnswerBubble from "./AnswerBubble";
import FeedbackBubble from "./FeedbackBubble";
import useInterview from "@/hooks/useInterview";
import { getMyResumes } from "@/services/resumeService";

function InterviewConversation() {
    const { messages, status, sessionId, startInterview, submitAnswer, selectedResume, setSelectedResume, roundType } = useInterview();

    const handleStart = async (round) => {
        try {
            let resumeId = selectedResume?.id;
            if (!resumeId) {
                const resumes = await getMyResumes();
                if (resumes && resumes.length > 0) {
                    resumeId = resumes[0].id;
                    setSelectedResume(resumes[0]);
                } else {
                    alert("Please upload a resume first.");
                    return;
                }
            }
            startInterview(resumeId, round);
        } catch (e) {
            console.error("Failed to start:", e);
            alert("Error starting interview. Did you upload a resume?");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            submitAnswer(e.target.value.trim());
            e.target.value = '';
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-100 shrink-0">
                <h2 className="text-lg font-bold text-gray-900">
                    Interview Conversation
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!sessionId ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👋</span>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold text-gray-900 mb-2">Ready for your interview?</h3>
                            <p className="text-gray-500 text-sm max-w-md">
                                Your interview consists of 3 rounds: Aptitude, Technical, and HR. We recommend starting with the Aptitude round first.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => handleStart("aptitude")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full transition-colors shadow-md shadow-blue-500/20 active:scale-95"
                            >
                                Start Aptitude Round
                            </button>
                            <button
                                onClick={() => handleStart("technical")}
                                className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 font-bold py-2.5 px-6 rounded-full transition-all active:scale-95"
                            >
                                Technical
                            </button>
                            <button
                                onClick={() => handleStart("hr")}
                                className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 font-bold py-2.5 px-6 rounded-full transition-all active:scale-95"
                            >
                                HR
                            </button>
                        </div>
                    </div>
                ) : messages.length === 0 ? (
                    <>
                        <QuestionBubble
                            question="Can you explain the difference between let, const, and var in JavaScript?"
                            time="11:21 AM"
                        />
                        <AnswerBubble
                            answer="Sure! var is function-scoped and can be re-declared. let is block-scoped and can be updated but not re-declared. const is also block-scoped but cannot be updated or re-declared."
                            time="11:22 AM"
                        />
                        <QuestionBubble
                            question="Great explanation! Can you give an example of useEffect in React?"
                            time="11:23 AM"
                        />
                    </>
                ) : (
                    messages.map((msg, index) => {
                        if (msg.type === "question") {
                            return <QuestionBubble key={index} question={msg.text} time="Now" />;
                        } else if (msg.type === "feedback") {
                            return <FeedbackBubble key={index} feedback={msg.text} time="Now" />;
                        } else {
                            return <AnswerBubble key={index} answer={msg.text} time="Now" />;
                        }
                    })
                )}
                {(status === "thinking" || status === "listening") && (
                    <div className="flex items-start gap-4 w-full">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                            <span className="text-blue-600 font-bold text-sm">AI</span>
                        </div>
                        <div className="flex flex-col gap-1 max-w-[80%]">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-sm">AI Interviewer</span>
                            </div>
                            <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm inline-flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}

                {sessionId && status === "idle" && messages.length > 0 && (
                    <div className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center gap-4 animate-fade-in shrink-0">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">Round Completed!</h3>
                            <p className="text-gray-500 text-sm mt-1">
                                You have successfully finished the {roundType === "aptitude" ? "Aptitude" : roundType === "technical" ? "Technical" : "HR"} round.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                            {roundType === "aptitude" && (
                                <>
                                    <button
                                        onClick={() => handleStart("technical")}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition-colors shadow-sm"
                                    >
                                        Start Technical Round
                                    </button>
                                    <button
                                        onClick={() => handleStart("hr")}
                                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-2 px-5 rounded-full transition-all"
                                    >
                                        Start HR Round
                                    </button>
                                </>
                            )}
                            {roundType === "technical" && (
                                <>
                                    <button
                                        onClick={() => handleStart("hr")}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition-colors shadow-sm"
                                    >
                                        Start HR Round
                                    </button>
                                    <button
                                        onClick={() => handleStart("aptitude")}
                                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-2 px-5 rounded-full transition-all"
                                    >
                                        Start Aptitude Round
                                    </button>
                                </>
                            )}
                            {roundType === "hr" && (
                                <>
                                    <a
                                        href="/analytics"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition-colors shadow-sm"
                                    >
                                        View Analytics
                                    </a>
                                    <button
                                        onClick={() => handleStart("aptitude")}
                                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-2 px-5 rounded-full transition-all"
                                    >
                                        Retake Aptitude
                                    </button>
                                    <button
                                        onClick={() => handleStart("technical")}
                                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-2 px-5 rounded-full transition-all"
                                    >
                                        Retake Technical
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default InterviewConversation;