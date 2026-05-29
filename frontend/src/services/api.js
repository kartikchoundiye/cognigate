import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",

    headers: {
        "Content-Type": "application/json",
    },
});

// =========================
// REQUEST INTERCEPTOR
// =========================

api.interceptors.request.use(
    (config) => {

        // Get access token
        const access_token = localStorage.getItem("access_token");

        // Attach token to headers
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================

api.interceptors.response.use(

    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response) {

            // Unauthorized (Access Token Expired)
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = localStorage.getItem("refresh_token");

                    if (refreshToken) {
                        // Attempt to get a new access token
                        const response = await axios.post(`http://127.0.0.1:8000/api/auth/refresh?refresh_token=${refreshToken}`);
                        
                        const newAccessToken = response.data.access_token;
                        
                        // Save the new token
                        localStorage.setItem("access_token", newAccessToken);
                        
                        // Update the failed request header with the new token
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        
                        // Retry the original request
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.log("Refresh token expired or invalid - redirecting to login");
                    
                    // Clear tokens
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("user");

                    // Redirect user
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }

                console.log("Unauthorized - no refresh token available");

                // Clear tokens
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");

                // Redirect user
                window.location.href = "/login";
            }

            // Server error
            if (error.response.status === 500) {
                console.log("Internal server error");
            }
        }

        return Promise.reject(error);
    }
);

export default api;