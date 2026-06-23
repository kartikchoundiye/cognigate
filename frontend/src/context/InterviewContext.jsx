import { createContext, useContext, useState } from "react";
import {
    startAptitudeRound, answerAptitudeQuestion,
    startHrRound, answerHrQuestion,
    startTechnicalRound, answerTechnicalQuestion
} from "@/services/interviewService";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
    const [status, setStatus] = useState("idle");
    const [messages, setMessages] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedResume, setSelectedResume] = useState(null);

    // API State
    const [sessionId, setSessionId] = useState(null);
    const [roundType, setRoundType] = useState("technical"); // 'aptitude', 'technical', 'hr'

    const startInterview = async (resumeId, round) => {
        try {
            setStatus("thinking");
            setRoundType(round);
            let res;
            const rId = parseInt(resumeId, 10);
            if (round === "aptitude") {
                res = await startAptitudeRound({ resume_id: rId });
            } else if (round === "hr") {
                res = await startHrRound({ resume_id: rId });
            } else {
                res = await startTechnicalRound({ resume_id: rId });
            }

            setSessionId(res.session_id);
            if (res.question) {
                setMessages([{ type: "question", text: res.question }]);
                setCurrentQuestion(res.question);
            }
            setStatus("listening");
        } catch (error) {
            console.error("Failed to start interview:", error);
            setStatus("idle");
        }
    };

    const submitAnswer = async (answerText) => {
        if (!sessionId) return;

        // Add user answer to chat
        setMessages(prev => [...prev, { type: "answer", text: answerText }]);
        setStatus("thinking");

        try {
            let res;
            const sId = parseInt(sessionId, 10);
            if (roundType === "aptitude") {
                res = await answerAptitudeQuestion({ session_id: sId, answer: answerText });
            } else if (roundType === "hr") {
                res = await answerHrQuestion({ session_id: sId, answer: answerText });
            } else {
                res = await answerTechnicalQuestion({ session_id: sId, answer: answerText });
            }

            const nextQ = res.question || res.next_question;
            const feedback = res.evaluation;

            setMessages(prev => {
                const newMessages = [...prev];
                if (feedback) {
                    newMessages.push({ type: "feedback", text: feedback });
                }
                if (nextQ) {
                    newMessages.push({ type: "question", text: nextQ });
                } else if (res.message) {
                    newMessages.push({ type: "question", text: res.message });
                }
                return newMessages;
            });

            if (nextQ) {
                setCurrentQuestion(nextQ);
                setStatus("listening");
            } else {
                setStatus("idle");
            }
        } catch (error) {
            console.error("Failed to submit answer:", error);
            setStatus("listening");
        }
    };

    const value = {
        status, setStatus,
        messages, setMessages,
        currentQuestion, setCurrentQuestion,
        selectedResume, setSelectedResume,
        sessionId, roundType,
        startInterview, submitAnswer
    };

    return (
        <InterviewContext.Provider value={value}>
            {children}
        </InterviewContext.Provider>
    );
}

export function useInterviewContext() {
    return useContext(InterviewContext);
}