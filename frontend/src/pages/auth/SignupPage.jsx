import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "@/services/authService";

function SignupPage() {

    const navigate = useNavigate();

    // REUSABLE STYLES

    const inputStyles = ` w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 outline-none transition focus:border-black `;

    const labelStyles = ` block mb-2 text-sm font-medium text-gray-700 `;

    const errorStyles = ` mt-2 text-sm text-red-500 `;

    const buttonStyles = ` w-full rounded-2xl bg-black py-4 text-white font-medium transition hover:opacity-90 disabled:opacity-50 `;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
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

    // VALIDATION

    const validateForm = () => {

        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must contain at least 6 characters";
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

            // console.log(formData);
            await registerUser(formData);

            toast.success(
                "Account created successfully"
            );

            navigate("/login");

            // API integration later

        } catch (error) {

            // console.log(error);
            const message =
                error.response?.data?.detail
                || "Signup failed";

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
                    Create Account
                </h1>

                <p className="text-gray-500 mt-3">
                    Start preparing smarter with AI-powered interviews.
                </p>

            </div>

            {/* FORM */}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* USERNAME */}

                <div>

                    <label className={labelStyles}>
                        Username
                    </label>

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        className={inputStyles}
                        value={formData.username}
                        onChange={handleChange}
                    />

                    {
                        errors.username && (
                            <p className={errorStyles}>
                                {errors.username}
                            </p>
                        )
                    }

                </div>

                {/* EMAIL */}

                <div>

                    <label className={labelStyles}>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
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
                        placeholder="Create password"
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

                {/* BUTTON */}

                <button
                    type="submit"
                    disabled={loading}
                    className={buttonStyles}
                >

                    {
                        loading
                            ? "Creating Account..."
                            : "Sign Up"
                    }

                </button>

            </form>

            {/* FOOTER */}

            <p className="text-center text-gray-500 mt-8">

                Already have an account?

                <Link
                    to="/login"
                    className="ml-2 text-black font-medium"
                >
                    Login
                </Link>

            </p>

        </div>
    );
}

export default SignupPage;