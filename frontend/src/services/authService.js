import api from "@/services/api";

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

// LOGIN
export const loginUser = async (data) => {
    const response = await api.post("/api/auth/login", data);
    return response.data;
};

// LOGOUT
export const logoutUser = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await api.post("/api/auth/logout", { refresh_token: refreshToken });
    return response.data;
};

// DELETE ACCOUNT
export const deleteAccount = async (data) => {
    const response = await api.delete("/api/auth/delete-account", {
        data,
    });
    return response.data;
};

// CHANGE USERNAME
export const changeUsername = async (data) => {
    const response = await api.put("/api/auth/change-username", data);
    return response.data;
};

// CHANGE PASSWORD
export const changePassword = async (data) => {
    const response = await api.post("/api/auth/change-password", data);
    return response.data;
};
// FORGOT PASSWORD - SEND OTP
export const forgotPasswordSendOTP = async (data) => {
    const response = await api.post("/api/auth/forgot-password/send-otp", data);
    return response.data;
};

// FORGOT PASSWORD - VERIFY OTP
export const forgotPasswordVerifyOTP = async (data) => {
    const response = await api.post("/api/auth/forgot-password/verify-otp", data);
    return response.data;
};

// RESET PASSWORD
export const resetPassword = async (data) => {
    const response = await api.post("/api/auth/forgot-password/reset", data);
    return response.data;
};
