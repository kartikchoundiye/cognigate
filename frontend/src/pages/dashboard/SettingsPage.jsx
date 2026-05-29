import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { deleteAccount, changeUsername, changePassword } from "@/services/authService";
import DeleteAccountModal from "@/components/ui/DeleteAccountModal";
import { User, Lock, Trash2, Save, ShieldCheck, ChevronDown, ChevronUp, Settings, ShieldAlert, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SettingsPage() {
    const { logout, user, updateUser } = useAuth();

    // Tab State
    const [activeTab, setActiveTab] = useState('general'); // 'general' | 'security' | 'account'

    // Username State
    const [newUsername, setNewUsername] = useState("");
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameSuccess, setUsernameSuccess] = useState("");
    const [usernameError, setUsernameError] = useState("");

    // Password State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Delete Account State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const handleUpdateUsername = async (e) => {
        e.preventDefault();
        if (!newUsername.trim()) return;

        try {
            setUsernameLoading(true);
            setUsernameError("");
            setUsernameSuccess("");

            await changeUsername({ new_username: newUsername });
            setUsernameSuccess("Username updated successfully!");

            // Update realtime user context
            updateUser({ username: newUsername });

            setNewUsername("");
        } catch (err) {
            setUsernameError(err.response?.data?.detail || "Failed to update username");
        } finally {
            setUsernameLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) return;

        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirm password must be same.");
            return;
        }

        try {
            setPasswordLoading(true);
            setPasswordError("");
            setPasswordSuccess("");

            await changePassword({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });

            setPasswordSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordError(err.response?.data?.detail || "Failed to change password");
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleDeleteAccount = async (confirmText, password) => {
        try {
            setDeleteLoading(true);
            setDeleteError("");

            await deleteAccount({
                confirm_text: confirmText,
                password: password,
            });

            setIsDeleteModalOpen(false);
            logout();
        } catch (err) {
            setDeleteError(err.response?.data?.detail || "Failed to delete account");
        } finally {
            setDeleteLoading(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: User },
        { id: 'security', label: 'Security', icon: KeyRound },
        { id: 'account', label: 'Account Management', icon: ShieldAlert },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* PAGE HEADER */}
            <div className="mb-8 sm:mb-10 relative px-2 sm:px-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-2 sm:p-2.5 bg-gray-900 text-white rounded-lg sm:rounded-xl shadow-md border border-gray-700 shrink-0">
                        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500 tracking-tight whitespace-nowrap">
                        Account Settings
                    </h1>
                </div>
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-500 leading-relaxed">
                    Personalize your experience, update security preferences, and manage your data all in one place.
                </p>
                <div className="absolute -bottom-4 sm:-bottom-5 left-0 w-full h-[1px] bg-linear-to-r from-gray-200 via-gray-100 to-transparent"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* SIDEBAR NAVIGATION */}
                <div className="lg:w-1/4">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            // Color mapping for active states
                            let colorClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
                            if (isActive) {
                                if (tab.id === 'account') colorClasses = "bg-red-50 text-red-700 ring-1 ring-red-200";
                                else if (tab.id === 'security') colorClasses = "bg-purple-50 text-purple-700 ring-1 ring-purple-200";
                                else colorClasses = "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
                            }

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${colorClasses}`}
                                >
                                    <Icon size={18} className={isActive ? "" : "text-gray-400"} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="lg:w-3/4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm"
                        >
                            {/* GENERAL TAB */}
                            {activeTab === 'general' && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900">General Information</h2>
                                        <p className="text-gray-500 mt-1">Update your display name across the platform.</p>
                                    </div>

                                    <form onSubmit={handleUpdateUsername} className="max-w-md space-y-5">
                                        {usernameSuccess && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                                                <ShieldCheck size={18} />
                                                {usernameSuccess}
                                            </div>
                                        )}
                                        {usernameError && (
                                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                                {usernameError}
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                            <input
                                                type="text"
                                                placeholder="Enter new username"
                                                value={newUsername}
                                                onChange={(e) => setNewUsername(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={usernameLoading || !newUsername.trim()}
                                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all disabled:opacity-50 font-medium text-sm shadow-md"
                                        >
                                            <Save size={18} />
                                            {usernameLoading ? "Saving..." : "Save Changes"}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* SECURITY TAB */}
                            {activeTab === 'security' && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
                                        <p className="text-gray-500 mt-1">Ensure your account is using a long, random password.</p>
                                    </div>

                                    <form onSubmit={handleUpdatePassword} className="max-w-md space-y-5">
                                        {passwordSuccess && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                                                <ShieldCheck size={18} />
                                                {passwordSuccess}
                                            </div>
                                        )}
                                        {passwordError && (
                                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                                {passwordError}
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter current password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900 bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900 bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900 bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all disabled:opacity-50 font-medium text-sm shadow-md shadow-purple-200"
                                        >
                                            <Lock size={18} />
                                            {passwordLoading ? "Updating..." : "Update Password"}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* ACCOUNT MANAGEMENT TAB */}
                            {activeTab === 'account' && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
                                        <p className="text-gray-500 mt-1">Manage your account lifecycle and data.</p>
                                    </div>

                                    <div className="p-6 bg-red-50/50 border border-red-100 rounded-2xl max-w-2xl">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-red-100 text-red-600 rounded-xl shrink-0">
                                                <Trash2 size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-red-700 mb-2">Delete Account</h3>
                                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                                    Permanently delete your account, active sessions, and all associated data. This action is strictly irreversible. Please proceed with caution.
                                                </p>
                                                <button
                                                    onClick={() => setIsDeleteModalOpen(true)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all text-sm shadow-md shadow-red-200"
                                                >
                                                    Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* DELETE ACCOUNT MODAL */}
            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteError(""); // clear error when closing
                }}
                onConfirm={handleDeleteAccount}
                loading={deleteLoading}
                error={deleteError}
            />
        </div>
    );
}

export default SettingsPage;