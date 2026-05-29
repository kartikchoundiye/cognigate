import api from "@/services/api";

// GET ALL RESUMES
export const getMyResumes = async () => {
    const response = await api.get("/api/resume/my-resumes");
    return response.data;
};

// UPLOAD RESUME
export const uploadResume = async (data) => {
    const response = await api.post("/api/resume/upload-resume", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

// RENAME RESUME
export const renameResume = async (resumeId, data) => {
    const response = await api.put(`/api/resume/rename-resume/${resumeId}`, data);
    return response.data;
};

// DELETE RESUME
export const deleteResume = async (resumeId) => {
    const response = await api.delete(`/api/resume/delete-resume/${resumeId}`);
    return response.data;
};

// DOWNLOAD RESUME
export const downloadResume = async (resumeId) => {
    const response = await api.get(`/api/resume/download-resume/${resumeId}`, {
        responseType: 'blob',
    });
    return response.data;
};

// GET CHUNKS
export const getResumeChunks = async (resumeId) => {
    const response = await api.get(`/api/resume/chunks/${resumeId}`);
    return response.data;
};
