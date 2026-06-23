import api from "@/services/api";

// --- Aptitude Round ---
export const startAptitudeRound = async (data) => {
    // data: { resume_id: string }
    const response = await api.post("/api/interview/aptitude/start", data);
    return response.data;
};

export const answerAptitudeQuestion = async (data) => {
    // data: { session_id: string, answer: string }
    const response = await api.post("/api/interview/aptitude/answer", data);
    return response.data;
};

// --- HR Round ---
export const startHrRound = async (data) => {
    // data: { resume_id: string }
    const response = await api.post("/api/interview/hr/start", data);
    return response.data;
};

export const answerHrQuestion = async (data) => {
    // data: { session_id: string, answer: string }
    const response = await api.post("/api/interview/hr/answer", data);
    return response.data;
};

// --- Technical Round ---
export const startTechnicalRound = async (data) => {
    // data: { resume_id: string }
    const response = await api.post("/api/interview-session/start", data);
    return response.data;
};

export const answerTechnicalQuestion = async (data) => {
    // data: { session_id: string, answer: string }
    const response = await api.post("/api/interview-session/answer", data);
    return response.data;
};

// --- Get Interview Sessions ---
export const getInterviewSessions = async () => {
    const response = await api.get("/api/interview-session/sessions");
    return response.data;
};
