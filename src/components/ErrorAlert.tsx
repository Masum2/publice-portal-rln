// shared/ErrorAlert.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  error: string | null;
  onDismiss: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm whitespace-pre-wrap">
      <AlertCircle className="w-4 h-4 inline mr-2" />
      {error}
      <button
        onClick={onDismiss}
        className="ml-4 text-red-600 hover:text-red-800 underline"
      >
        Dismiss
      </button>
    </div>
  );
};