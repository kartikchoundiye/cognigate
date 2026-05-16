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

    (error) => {

        if (error.response) {

            // Unauthorized
            if (error.response.status === 401) {

                console.log("Unauthorized - redirecting to login");

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