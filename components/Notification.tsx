
import React from 'react';

interface NotificationProps {
    message: string;
    type: 'error' | 'info';
    onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <div className={`relative flex items-center justify-between ${bgColor} text-white p-3 rounded-lg shadow-xl animate-slide-down`}>
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <style>{`
                @keyframes slide-down {
                    0% { transform: translateY(-100%); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-down {
                    animation: slide-down 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
