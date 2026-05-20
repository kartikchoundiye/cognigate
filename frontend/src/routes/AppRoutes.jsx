import { Routes, Route } from "react-router-dom";

// PUBLIC PAGES
import HomePage from "@/pages/public/HomePage";
import FeaturesPage from "@/pages/public/FeaturesPage";
import AboutPage from "@/pages/public/AboutPage";

// AUTH PAGES
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

// DASHBOARD PAGES
import DashboardPage from "@/pages/dashboard/DashboardPage";
import InterviewPage from "@/pages/dashboard/InterviewPage";
import ResumePage from "@/pages/dashboard/ResumePage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import HistoryPage from "@/pages/dashboard/HistoryPage";
import FeedbackPage from "@/pages/dashboard/FeedbackPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";

// PROTECTED ROUTE
import ProtectedRoute from "@/utils/ProtectedRoute";

// LAYOUTS
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

function AppRoutes() {
    return (
        <Routes>

            {/* ========================= */}
            {/* PUBLIC ROUTES */}
            {/* ========================= */}

            <Route element={<PublicLayout />}>

                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/about" element={<AboutPage />} />

            </Route>

            {/* ========================= */}
            {/* AUTH ROUTES */}
            {/* ========================= */}

            <Route element={<AuthLayout />}>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            </Route>

            {/* ========================= */}
            {/* PROTECTED DASHBOARD ROUTES */}
            {/* ========================= */}

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/settings" element={<SettingsPage />} />

            </Route>

        </Routes>
    );
}

export default AppRoutes;