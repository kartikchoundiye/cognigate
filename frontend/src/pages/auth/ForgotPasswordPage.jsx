import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPasswordSendOTP, forgotPasswordVerifyOTP, resetPassword } from "@/services/authService";

function ForgotPasswordPage() {
    const navigate = useNavigate();

    // REUSABLE STYLES
    const inputStyles = " w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 outline-none transition focus:border-black ";
    const labelStyles = " block mb-2 text-sm font-medium text-gray-700 ";
    const errorStyles = " mt-2 text-sm text-red-500 ";
    const buttonStyles = " w-full rounded-2xl bg-black py-4 text-white font-medium transition hover:opacity-90 disabled:opacity-50 ";

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        new_password: "",
        confirm_password: "",
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
            await forgotPasswordSendOTP({ email: formData.email });
            toast.success("OTP sent to your email");
            setStep(2);
        } catch (error) {
            let message = "Failed to send OTP";
            const detail = error.response?.data?.detail;
            if (detail) {
                if (Array.isArray(detail)) message = detail[0].msg || "Validation error";
                else message = detail;
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
            await forgotPasswordVerifyOTP({ email: formData.email, otp: formData.otp });
            toast.success("Email verified successfully");
            setStep(3);
        } catch (error) {
            let message = "Invalid OTP";
            const detail = error.response?.data?.detail;
            if (detail) {
                if (Array.isArray(detail)) message = detail[0].msg || "Validation error";
                else message = detail;
            }
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.new_password.trim()) {
            newErrors.new_password = "New password is required";
        } else if (formData.new_password.length < 6) {
            newErrors.new_password = "Password must contain at least 6 characters";
        }

        if (formData.new_password !== formData.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await resetPassword({
                email: formData.email,
                new_password: formData.new_password,
                confirm_password: formData.confirm_password
            });
            toast.success("Password reset successful");
            navigate("/login");
        } catch (error) {
            let message = "Failed to reset password";
            const detail = error.response?.data?.detail;
            if (detail) {
                if (Array.isArray(detail)) message = detail[0].msg || "Validation error";
                else message = detail;
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
                    Forgot Password
                </h1>
                <p className="text-gray-500 mt-3">
                    {step === 1 && "Enter your email address to receive an OTP."}
                    {step === 2 && "Enter the OTP sent to your email to verify your identity."}
                    {step === 3 && "Create a new secure password for your account."}
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
                            placeholder="Enter your email"
                            className={inputStyles}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className={errorStyles}>{errors.email}</p>
                        )}
                    </div>
                    <button type="submit" disabled={loading} className={buttonStyles}>
                        {loading ? "Sending..." : "Send OTP"}
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
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                        <label className={labelStyles}>Email</label>
                        <input
                            type="email"
                            className={inputStyles + " bg-gray-50 text-gray-500"}
                            value={formData.email}
                            disabled
                        />
                    </div>

                    <div>
                        <label className={labelStyles}>New Password</label>
                        <input
                            type="password"
                            name="new_password"
                            placeholder="Create new password"
                            className={inputStyles}
                            value={formData.new_password}
                            onChange={handleChange}
                        />
                        {errors.new_password && (
                            <p className={errorStyles}>{errors.new_password}</p>
                        )}
                    </div>

                    <div>
                        <label className={labelStyles}>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm new password"
                            className={inputStyles}
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />
                        {errors.confirm_password && (
                            <p className={errorStyles}>{errors.confirm_password}</p>
                        )}
                    </div>

                    <button type="submit" disabled={loading} className={buttonStyles}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            )}

            {/* FOOTER */}
            <p className="text-center text-gray-500 mt-8">
                Remember your password?
                <Link to="/login" className="ml-2 text-black font-medium">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default ForgotPasswordPage;
