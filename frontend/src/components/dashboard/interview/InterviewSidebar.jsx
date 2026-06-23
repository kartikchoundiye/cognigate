import { FileText, Briefcase, Gauge, Clock, HelpCircle, Lightbulb } from "lucide-react";
import useInterview from "@/hooks/useInterview";
import { useState, useEffect } from "react";
import { getMyResumes } from "@/services/resumeService";
import { useSearchParams } from "react-router-dom";

export default function InterviewSidebar() {
    const { selectedResume, setSelectedResume, roundType, setRoundType, startInterview, messages } = useInterview();

    const TOTAL_QUESTIONS = 5;
    const currentQuestionCount = messages ? messages.filter(m => m.type === "question").length : 0;
    const displayCount = Math.min(currentQuestionCount || 0, TOTAL_QUESTIONS);
    const progressPercentage = Math.round((displayCount / TOTAL_QUESTIONS) * 100) || 0;
    const [resumes, setResumes] = useState([]);
    const [searchParams] = useSearchParams();
    const urlResumeId = searchParams.get("resumeId");

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const data = await getMyResumes();
                if (data.resumes && data.resumes.length > 0) {
                    setResumes(data.resumes);
                    if (!selectedResume) {
                        const rId = urlResumeId ? parseInt(urlResumeId, 10) : null;
                        const match = rId ? data.resumes.find(r => r.id === rId || r.id.toString() === urlResumeId) : null;
                        setSelectedResume(match || data.resumes[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch resumes:", error);
            }
        };
        fetchResumes();
    }, [selectedResume, setSelectedResume, urlResumeId]);

    const handleResumeChange = (e) => {
        const val = e.target.value;
        const resume = resumes.find(r => r.id === parseInt(val, 10) || r.id.toString() === val);
        if (resume) {
            setSelectedResume(resume);
        }
    };

    const handleRoundChange = async (e) => {
        const newRound = e.target.value;
        setRoundType(newRound);

        let resumeId = selectedResume?.id;
        if (!resumeId) {
            try {
                const data = await getMyResumes();
                if (data.resumes && data.resumes.length > 0) {
                    resumeId = data.resumes[0].id;
                    setSelectedResume(data.resumes[0]);
                } else {
                    alert("Please upload a resume first.");
                    return;
                }
            } catch (error) {
                console.error("Failed to fetch resumes on round change:", error);
                alert("Error starting round. Did you upload a resume?");
                return;
            }
        }

        try {
            await startInterview(resumeId, newRound);
        } catch (error) {
            console.error("Failed to start round from sidebar:", error);
            alert("Failed to start the interview round.");
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full">

            {/* Interview Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="font-bold text-gray-900">Interview Overview</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-gray-400 mt-2 shrink-0" />
                        <div className="w-full">
                            <p className="text-xs text-gray-500 mb-1">Resume</p>
                            <select
                                value={selectedResume?.id || ""}
                                onChange={handleResumeChange}
                                className="w-full text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none"
                            >
                                {resumes.length === 0 && <option value="">No resumes found</option>}
                                {resumes.map(r => (
                                    <option key={r.id} value={r.id}>{r.title || "Untitled Resume"}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center mt-2 shrink-0">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-500 mb-1">Round</p>
                            <select
                                value={roundType || "aptitude"}
                                onChange={handleRoundChange}
                                className="w-full text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none capitalize"
                            >
                                <option value="aptitude">Aptitude Round</option>
                                <option value="technical">Technical Round</option>
                                <option value="hr">HR Round</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Gauge className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-600">Difficulty</span>
                        </div>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Medium</span>
                    </div>

                    <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="text-sm font-semibold text-gray-900">30-45 Minutes</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-600">Questions</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{displayCount} / {TOTAL_QUESTIONS}</span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-900">Progress</h3>
                    <span className="text-xs text-gray-500 font-medium">{displayCount} / {TOTAL_QUESTIONS} Questions</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="text-right text-xs font-bold text-gray-900">{progressPercentage}%</div>
            </div>

            {/* Skills Assessed */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Skills Assessed</h3>

                <div className="space-y-4">
                    <SkillBar name="React.js" percentage={80} color="bg-green-500" />
                    <SkillBar name="JavaScript" percentage={70} color="bg-green-500" />
                    <SkillBar name="HTML/CSS" percentage={90} color="bg-green-500" />
                    <SkillBar name="Problem Solving" percentage={60} color="bg-orange-500" />
                    <SkillBar name="Communication" percentage={75} color="bg-green-500" />
                </div>
            </div>

            {/* Interview Tips */}
            <div className="bg-[#FFF9E6] rounded-2xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                    <Lightbulb className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <h3 className="font-bold text-gray-900">Interview Tips</h3>
                </div>

                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4 marker:text-amber-400 flex-1">
                    <li>Speak clearly and confidently</li>
                    <li>Take your time to think</li>
                    <li>Provide specific examples</li>
                    <li>Ask for clarification if needed</li>
                </ul>
            </div>

        </div>
    );
}

function SkillBar({ name, percentage, color }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-700 w-24 truncate">{name}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-1.5 flex overflow-hidden">
                <div className={`${color} h-full rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="text-xs font-bold text-gray-900 w-8 text-right">{percentage}%</span>
        </div>
    );
}