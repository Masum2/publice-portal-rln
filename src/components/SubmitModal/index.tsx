// SubmitModal/index.tsx
import React from 'react';
import { AlertCircle, Send, Loader, Check } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
  error: string | null;
  reporterName: string;
  victimName: string;
  incidentDate: string;
  documentCount: number;
  savedTabs: { [key: string]: boolean };
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isAgreed,
  setIsAgreed,
  error,
  reporterName,
  victimName,
  incidentDate,
  documentCount,
  savedTabs,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-gray-200 transform animate-in fade-in zoom-in duration-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto border border-blue-200">
            📋
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Submit Referral</h2>
          <p className="text-sm text-gray-500 mt-1">Please review and confirm before submitting</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Reporter:</span>
                <p className="font-medium text-gray-800">{reporterName || 'Not set'}</p>
              </div>
              <div>
                <span className="text-gray-500">Victim:</span>
                <p className="font-medium text-gray-800">{victimName || 'Not set'}</p>
              </div>
              <div>
                <span className="text-gray-500">Incident Date:</span>
                <p className="font-medium text-gray-800">{incidentDate || 'Not set'}</p>
              </div>
              <div>
                <span className="text-gray-500">Documents:</span>
                <p className="font-medium text-gray-800">{documentCount} file(s)</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.entries(savedTabs).map(([key, value]) => (
              <span
                key={key}
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  value ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {value ? '✅' : '❌'} {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <input
              type="checkbox"
              id="disclaimer-modal"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            />
            <label htmlFor="disclaimer-modal" className="text-xs text-gray-600 select-none cursor-pointer leading-relaxed">
              <span className="font-bold text-amber-600">⚠️ Disclaimer:</span> I confirm that the information provided is accurate to the best of my knowledge.
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm whitespace-pre-wrap">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold uppercase rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!isAgreed || isLoading}
            className={`flex-1 px-4 py-3 text-white text-sm font-bold uppercase rounded-xl shadow-lg transition transform hover:scale-105 ${
              isAgreed && !isLoading
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl'
                : 'bg-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <Loader className="w-4 h-4 inline animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 inline mr-2" />
            )}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};