import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser, sendOTP, verifyOTP } from "@/services/authService";
import logo from "@/assets/cognigate_logo.jpeg";

function SignupPage() {
    const navigate = useNavigate();

    // REUSABLE STYLES
    const inputStyles = ` w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 `;
    const labelStyles = ` block mb-2 text-sm font-semibold text-slate-700 `;
    const errorStyles = ` mt-1.5 text-sm text-red-500 font-medium `;
    const buttonStyles = ` w-full rounded-xl bg-slate-900 py-3.5 text-white font-semibold shadow-md shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/30 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none `;

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        otp: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // HANDLE CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!formData.email.trim()) {
            setErrors({ email: "Email is required" });
            return;
        }

        try {
            setLoading(true);
            await sendOTP({ email: formData.email });
            toast.success("OTP sent to your email");
            setStep(2);
        } catch (error) {
            let message = "Failed to send OTP";
            const detail = error.response?.data?.detail;
            if (detail) {
                if (Array.isArray(detail)) {
                    message = detail[0].msg || "Validation error";
                } else {
                    message = detail;
                }
            }
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!formData.otp.trim()) {
            setErrors({ otp: "OTP is required" });
            return;
        }

        try {
            setLoading(true);
            await verifyOTP({ email: formData.email, otp: formData.otp });
            toast.success("Email verified successfully");
            setStep(3);
        } catch (error) {
            let message = "Invalid OTP";
            const detail = error.response?.data?.detail;
            if (detail) {
                if (Array.isArray(detail)) {
                    message = detail[0].msg || "Validation error";
                } else {
                    message = detail;
                }
            }
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }
        if (formData.password.length < 6) {
            newErrors.password = "Password must contain at least 6 characters";
        }
        if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password
            });
            toast.success("Account created successfully");
            navigate("/login");
        } catch (error) {
            let message = "Signup failed";
            const detail = error.response?.data?.detail;

            if (detail) {
                if (Array.isArray(detail)) {
                    message = detail[0].msg || "Validation error";
                } else {
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
                            Register
                        </h1>
                    </div>
                    <p className="text-slate-500 mt-2 text-sm">
                        Start preparing smarter with AI-powered interviews.
                    </p>
                </div>

                {/* FORM */}
                {step === 1 && (
                    <form onSubmit={handleSendOTP} className="space-y-6">
                        <div>
                            <label className={labelStyles}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                className={inputStyles}
                                value={formData.email}
                                onChange={handleChange}
                                spellCheck="false"
                            />
                            {errors.email && (
                                <p className={errorStyles}>{errors.email}</p>
                            )}
                        </div>
                        <button type="submit" disabled={loading} className={buttonStyles}>
                            {loading ? "Sending OTP..." : "Continue with Email"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="space-y-6">
                        <div>
                            <label className={labelStyles}>Enter OTP</label>
                            <p className="text-sm text-gray-500 mb-4">
                                We've sent a code to <span className="font-semibold text-black">{formData.email}</span>
                            </p>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter OTP code"
                                className={inputStyles}
                                value={formData.otp}
                                onChange={handleChange}
                                spellCheck="false"
                            />
                            {errors.otp && (
                                <p className={errorStyles}>{errors.otp}</p>
                            )}
                        </div>
                        <button type="submit" disabled={loading} className={buttonStyles}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-sm text-gray-600 hover:text-black mt-4"
                        >
                            Change Email
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className={labelStyles}>Email (Verified)</label>
                            <input
                                type="email"
                                className={inputStyles + " bg-gray-50 text-gray-500"}
                                value={formData.email}
                                disabled
                            />
                        </div>

                        <div>
                            <label className={labelStyles}>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                className={inputStyles}
                                value={formData.username}
                                onChange={handleChange}
                                spellCheck="false"
                            />
                            {errors.username && (
                                <p className={errorStyles}>{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label className={labelStyles}>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create password"
                                className={inputStyles}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className={errorStyles}>{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className={labelStyles}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm password"
                                className={inputStyles}
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />
                            {errors.confirm_password && (
                                <p className={errorStyles}>{errors.confirm_password}</p>
                            )}
                        </div>

                        <button type="submit" disabled={loading} className={buttonStyles}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>
                )}

                {/* FOOTER */}

                <p className="text-center text-slate-500 mt-8 text-sm">
                    Already have an account?
                    <Link to="/login" className="ml-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;