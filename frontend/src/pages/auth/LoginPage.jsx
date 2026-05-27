import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/cognigate_logo.jpeg";

function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    // REUSABLE STYLES
    const inputStyles = ` w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 `;
    const labelStyles = ` block mb-2 text-sm font-semibold text-slate-700 `;
    const errorStyles = ` mt-1.5 text-sm text-red-500 font-medium `;
    const buttonStyles = ` w-full rounded-xl bg-slate-900 py-3.5 text-white font-semibold shadow-md shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/30 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none `;


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
        <div className="w-full max-w-md relative group">
            {/* Glowing gradient effect behind the border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-[2.2rem] blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative w-full bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 sm:p-12">

                {/* TITLE */}
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm">
                            <img src={logo} alt="Cognigate Logo" className="w-8 h-8 object-cover rounded-lg" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Login
                        </h1>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Welcome back
                    </h2>
                    <p className="text-slate-500 mt-2 text-sm">
                        Enter your credentials to access your account.
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
                        <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
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
                <p className="text-center text-slate-500 mt-8 text-sm">
                    Don&apos;t have an account?
                    <Link to="/signup" className="ml-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;