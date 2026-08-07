// components/PublicPortal/SubmitTab.tsx
import React from 'react';
import { CheckCircle, Shield, AlertTriangle } from 'lucide-react';

interface SubmitTabProps {
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
  onAgreedChange: (value: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
  savedTabs: { [key: string]: boolean };
  error?: string | null;
}

export const SubmitTab: React.FC<SubmitTabProps> = ({
  isAgreed,
  setIsAgreed,
  onAgreedChange,
  onSubmit,
  isLoading,
  savedTabs,
  error,
}) => {
  const allTabsSaved = savedTabs?.referral && savedTabs?.casestudy;

  return (
    <div className="space-y-6">
      {/* শিরোনাম */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full shadow-lg mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Submit & Acknowledge</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please review all information before final submission
        </p>
      </div>

      {/* সেভ স্ট্যাটাস */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Section Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${savedTabs?.referral ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
            {savedTabs?.referral ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span className="text-sm font-medium">Referral {savedTabs?.referral ? '✅' : '⚠️'}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${savedTabs?.casestudy ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
            {savedTabs?.casestudy ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span className="text-sm font-medium">Case Study {savedTabs?.casestudy ? '✅' : '⚠️'}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${savedTabs?.documents ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
            {savedTabs?.documents ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span className="text-sm font-medium">Docs {savedTabs?.documents ? '✅' : '⚠️'}</span>
          </div>
        </div>
      </div>

      {/* Acknowledgement Checkbox */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="acknowledgement"
            checked={isAgreed}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsAgreed(checked);
              onAgreedChange(checked);
            }}
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="acknowledgement" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
            <span className="font-semibold text-gray-800">I confirm:</span>{' '}
            <span className="text-gray-600">
              All information provided in this report is true and accurate to the best of my knowledge.
            </span>
          </label>
        </div>
      </div>

      {/* ত্রুটি বার্তা */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-500 text-lg">⚠️</span>
          <p className="text-sm text-red-700 flex-1">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onSubmit}
          disabled={!isAgreed || !allTabsSaved || isLoading}
          className={`flex-1 px-6 py-3 rounded-xl text-white font-bold text-sm uppercase tracking-wider transition-all transform ${
            !isAgreed || !allTabsSaved || isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-lg hover:scale-[1.02]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            '🚀 Submit Report'
          )}
        </button>
      </div>

      {/* Help Text */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-700">
          <strong>⚠️ Note:</strong> Once submitted, this report will be visible in the Research Section.
        </p>
      </div>
    </div>
  );
};