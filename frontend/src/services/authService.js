import api from "@/services/api";

// SIGNUP
export const signupUser = async (data) => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
};

// LOGIN
export const loginUser = async (data) => {
    const response = await api.post("/api/auth/login", data);
    return response.data;
};

// SEND OTP
export const sendOTP = async (data) => {
    const response = await api.post("/api/auth/send-otp", data);
    return response.data;
};

// VERIFY OTP
export const verifyOTP = async (data) => {
    const response = await api.post("/api/auth/verify-otp", data);
    return response.data;
};

// REGISTER
export const registerUser = async (data) => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
};