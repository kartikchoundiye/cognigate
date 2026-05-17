import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { deleteAccount, changeUsername, changePassword } from "@/services/authService";
import DeleteAccountModal from "@/components/ui/DeleteAccountModal";
import { User, Lock, Trash2, Save, ShieldCheck, ChevronDown, ChevronUp, Settings } from "lucide-react";

function SettingsPage() {
    const { logout, user, updateUser } = useAuth();

    // Accordion State
    const [activeSection, setActiveSection] = useState(null); // 'username' | 'password' | 'delete'

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

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

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-12">
            {/* PAGE HEADER */}
            <div className="border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="mt-2 text-gray-600">
                    Manage your account details, security preferences, and data.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* PROFILE SETTINGS - ACCORDION */}
                <div className="bg-white border border-gray-100 rounded-3xl p-4 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="p-2.5 bg-gray-900 text-white rounded-xl shadow-sm">
                            <Settings size={22} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                    </div>

                    <div className="space-y-4">
                        {/* CHANGE USERNAME ROW */}
                        <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${activeSection === 'username' ? 'border-blue-200 ring-1 ring-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                            <button
                                onClick={() => toggleSection('username')}
                                className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <User size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Change Username</h3>
                                        <p className="text-sm text-gray-500 hidden sm:block">Update your display name across the platform</p>
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    {activeSection === 'username' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {activeSection === 'username' && (
                                <div className="p-5 bg-gray-50/50 border-t border-gray-100">
                                    <form onSubmit={handleUpdateUsername} className="max-w-md space-y-4">
                                        {usernameSuccess && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                                                {usernameSuccess}
                                            </div>
                                        )}
                                        {usernameError && (
                                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                                {usernameError}
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Username</label>
                                            <input
                                                type="text"
                                                placeholder="Enter new username"
                                                value={newUsername}
                                                onChange={(e) => setNewUsername(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={usernameLoading || !newUsername.trim()}
                                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 font-medium text-sm"
                                        >
                                            <Save size={18} />
                                            {usernameLoading ? "Saving..." : "Update Username"}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* CHANGE PASSWORD ROW */}
                        <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${activeSection === 'password' ? 'border-purple-200 ring-1 ring-purple-50' : 'border-gray-100 hover:border-gray-200'}`}>
                            <button
                                onClick={() => toggleSection('password')}
                                className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <Lock size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Change Password</h3>
                                        <p className="text-sm text-gray-500 hidden sm:block">Ensure your account is using a long, random password</p>
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    {activeSection === 'password' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {activeSection === 'password' && (
                                <div className="p-5 bg-gray-50/50 border-t border-gray-100">
                                    <form onSubmit={handleUpdatePassword} className="max-w-md space-y-4">
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter current password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 font-medium text-sm"
                                        >
                                            <Save size={18} />
                                            {passwordLoading ? "Updating..." : "Change Password"}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* DELETE ACCOUNT ROW */}
                        <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${activeSection === 'delete' ? 'border-red-200 ring-1 ring-red-50' : 'border-red-100 hover:border-red-200'}`}>
                            <button
                                onClick={() => toggleSection('delete')}
                                className="w-full flex items-center justify-between p-5 bg-white hover:bg-red-50/30 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                        <Trash2 size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-red-600">Delete Account</h3>
                                        <p className="text-sm text-gray-500 hidden sm:block">Permanently delete your account and all data</p>
                                    </div>
                                </div>
                                <div className="text-red-400">
                                    {activeSection === 'delete' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {activeSection === 'delete' && (
                                <div className="p-5 bg-red-50/30 border-t border-red-100">
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed max-w-2xl">
                                        Permanently delete your account, active sessions, and all associated data. This action is irreversible. Please be certain.
                                    </p>
                                    <button
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-6 py-2.5 rounded-xl font-medium transition-all text-sm"
                                    >
                                        Proceed to Delete Account
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
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