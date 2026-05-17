import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    // REUSABLE STYLES

    const inputStyles = ` w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 outline-none transition focus:border-black `;

    const labelStyles = ` block mb-2 text-sm font-medium text-gray-700 `;

    const errorStyles = ` mt-2 text-sm text-red-500 `;

    const buttonStyles = ` w-full rounded-2xl bg-black py-4 text-white font-medium transition hover:opacity-90 disabled:opacity-50 `;


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // CLEAR FIELD ERROR
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    // VALIDATION

    const validateForm = () => {

        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };

    // SUBMIT

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {

            setLoading(true);

            // Authenticate directly with the backend
            const response = await loginUser(formData);

            // STORE TOKENS
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("refresh_token", response.refresh_token);

            // STORE USER
            login(response.user);

            // SUCCESS MESSAGE
            toast.success("Login successful");

            // REDIRECT
            navigate("/dashboard");

        } catch (error) {
            let message = "Login failed";

            const detail = error.response?.data?.detail;
            if (detail) {
                // If it's an array (like 422 Unprocessable Entity from FastAPI Pydantic validation)
                if (Array.isArray(detail)) {
                    message = detail[0].msg || "Validation error";
                } else {
                    // If it's a simple string (like 400 Bad Request)
                    message = detail;
                }
            }

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">

            {/* TITLE */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome Back
                </h1>

                <p className="text-gray-500 mt-3">
                    Login to continue your interview preparation journey.
                </p>

            </div>

            {/* FORM */}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* EMAIL */}

                <div>

                    <label className={labelStyles}>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={inputStyles}
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {
                        errors.email && (
                            <p className={errorStyles}>
                                {errors.email}
                            </p>
                        )
                    }

                </div>

                {/* PASSWORD */}

                <div>

                    <label className={labelStyles}>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className={inputStyles}
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {
                        errors.password && (
                            <p className={errorStyles}>
                                {errors.password}
                            </p>
                        )
                    }

                </div>

                {/* FORGOT PASSWORD */}

                <div className="flex justify-end">

                    <Link
                        to="/forgot-password"
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        Forgot Password?
                    </Link>

                </div>

                {/* BUTTON */}

                <button
                    type="submit"
                    disabled={loading}
                    className={buttonStyles}
                >

                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }

                </button>

            </form>

            {/* FOOTER */}

            <p className="text-center text-gray-500 mt-8">

                Don&apos;t have an account?

                <Link
                    to="/signup"
                    className="ml-2 text-black font-medium"
                >
                    Sign Up
                </Link>

            </p>

        </div>
    );
}

export default LoginPage;