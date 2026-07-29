// SuccessModal.tsx
import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'referral' | 'casestudy' | 'documents' | 'submission';
  title: string;
  message: string;
  details?: {
    id?: string;
    documentCount?: number;
  };
  onContinue: () => void;  // ✅ Added onContinue prop
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  details,
  onContinue,
}) => {
  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case 'referral':
        return 'text-blue-600';
      case 'casestudy':
        return 'text-purple-600';
      case 'documents':
        return 'text-amber-600';
      case 'submission':
        return 'text-emerald-600';
      default:
        return 'text-green-600';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'referral':
        return 'bg-blue-600 hover:bg-blue-500';
      case 'casestudy':
        return 'bg-purple-600 hover:bg-purple-500';
      case 'documents':
        return 'bg-amber-600 hover:bg-amber-500';
      case 'submission':
        return 'bg-emerald-600 hover:bg-emerald-500';
      default:
        return 'bg-green-600 hover:bg-green-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200 text-center animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-20 h-20 ${getIconColor()} bg-opacity-10 rounded-full flex items-center justify-center text-4xl mx-auto mb-4`}>
          <CheckCircle className="w-12 h-12" />
        </div>

        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 mt-2 text-sm">{message}</p>

        {details?.id && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Reference ID</p>
            <p className="font-mono font-bold text-gray-700 text-sm">{details.id}</p>
          </div>
        )}

        {details?.documentCount !== undefined && details.documentCount > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Documents Uploaded</p>
            <p className="font-bold text-gray-700 text-sm">{details.documentCount} file(s)</p>
          </div>
        )}

        <button
          onClick={() => {
            onContinue();  // ✅ Call the onContinue callback
            onClose();
          }}
          className={`mt-6 px-8 py-3 ${getButtonColor()} text-white text-sm font-bold uppercase rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 w-full`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};