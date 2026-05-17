import { LogOut, X } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3 text-red-500">
                        <div className="p-2 bg-red-50 rounded-full">
                            <LogOut size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Logout</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-1.5"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Are you sure you want to log out of your account ?
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 active:bg-red-700 transition-colors shadow-sm shadow-red-500/20"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
