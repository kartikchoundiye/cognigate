import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, loading, error }) => {
    const [confirmText, setConfirmText] = useState("");
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(confirmText, password);
    };

    // Reset fields when closing
    const handleClose = () => {
        setConfirmText("");
        setPassword("");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3 text-red-600">
                        <div className="p-2 bg-red-50 rounded-full">
                            <AlertTriangle size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Delete Account</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-1.5"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    This action is <span className="font-bold text-red-600">permanent and cannot be undone</span>. 
                    All your data, settings, and active sessions will be permanently deleted.
                </p>

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type <span className="font-bold">DELETE MY ACCOUNT</span> to confirm
                        </label>
                        <input
                            type="text"
                            placeholder="DELETE MY ACCOUNT"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 text-sm"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enter your password
                        </label>
                        <input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 text-sm"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={loading || confirmText !== "DELETE MY ACCOUNT" || !password}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 active:bg-red-800 transition-colors shadow-sm shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Deleting..." : "Delete Account"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
