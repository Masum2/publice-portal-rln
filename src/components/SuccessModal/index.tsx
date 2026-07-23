// SuccessModal/index.tsx
import React, { useEffect } from 'react';
import { Check, X, FileText, ClipboardList, Upload, Send, Sparkles } from 'lucide-react';

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
  onContinue?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  details = {},
  onContinue,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'referral':
        return <FileText className="w-8 h-8 text-emerald-600" />;
      case 'casestudy':
        return <ClipboardList className="w-8 h-8 text-purple-600" />;
      case 'documents':
        return <Upload className="w-8 h-8 text-cyan-600" />;
      case 'submission':
        return <Send className="w-8 h-8 text-blue-600" />;
      default:
        return <Check className="w-8 h-8 text-emerald-600" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'referral':
        return 'from-emerald-500 to-teal-500';
      case 'casestudy':
        return 'from-purple-500 to-indigo-500';
      case 'documents':
        return 'from-cyan-500 to-blue-500';
      case 'submission':
        return 'from-blue-500 to-indigo-600';
      default:
        return 'from-emerald-500 to-teal-500';
    }
  };

  const getEmoji = () => {
    switch (type) {
      case 'referral':
        return '📋';
      case 'casestudy':
        return '📝';
      case 'documents':
        return '📎';
      case 'submission':
        return '🎉';
      default:
        return '✅';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'referral':
        return 'bg-emerald-50 border-emerald-200';
      case 'casestudy':
        return 'bg-purple-50 border-purple-200';
      case 'documents':
        return 'bg-cyan-50 border-cyan-200';
      case 'submission':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50  animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200 animate-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        </button>

        {/* Icon */}
        <div className={`w-20 h-20 bg-gradient-to-br ${getGradient()} rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg border-4 ${getBgColor()}`}>
          {getEmoji()}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">{title}</h2>
        
        {/* Message */}
        <p className="text-gray-600 text-center mt-2 leading-relaxed">{message}</p>

        {/* Details */}
        {details.id && (
          <div className={`mt-4 p-4 rounded-xl border ${getBgColor()}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {type === 'referral' ? 'Referral ID' : 
                 type === 'casestudy' ? 'Case Study ID' : 
                 type === 'submission' ? 'Reference Token' : 'ID'}
              </span>
              <span className="font-mono font-bold text-gray-800 text-sm bg-white px-3 py-1 rounded-lg border border-gray-200">
                {details.id}
              </span>
            </div>
          </div>
        )}

        {details.documentCount !== undefined && (
          <div className={`mt-4 p-4 rounded-xl border ${getBgColor()}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Documents Uploaded
              </span>
              <span className="font-bold text-gray-800 text-lg">
                {details.documentCount} file(s)
              </span>
            </div>
          </div>
        )}

        {/* Success Checkmark Animation */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Saved successfully</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue || onClose}
          className={`mt-6 w-full px-6 py-3 bg-gradient-to-r ${getGradient()} text-white text-sm font-bold uppercase rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] flex items-center justify-center gap-2`}
        >
          <Check className="w-4 h-4" />
          {type === 'submission' ? 'View Dashboard' : 'Continue'}
        </button>

        {/* Footer Text */}
        <p className="text-[10px] text-gray-400 text-center mt-4">
          {type === 'submission' 
            ? 'An email confirmation has been sent to the reporter' 
            : 'All information has been securely stored'}
        </p>
      </div>
    </div>
  );
};