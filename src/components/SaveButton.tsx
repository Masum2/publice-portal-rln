// shared/SaveButton.tsx
import React from 'react';
import { Save, Loader, Check } from 'lucide-react';

interface SaveButtonProps {
  isLoading?: boolean;
  onSave: () => void;
  label?: string;
  disabled?: boolean;
  isSaved?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  isLoading = false,
  onSave,
  label = 'Save',
  disabled = false,
  isSaved = false,
}) => {
  return (
    <button
      onClick={onSave}
      disabled={isLoading || disabled}
      className={`px-8 py-3 text-white text-sm font-bold uppercase rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
        isSaved
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl'
          : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl'
      }`}
    >
      {isLoading ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : isSaved ? (
        <Check className="w-4 h-4" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      {isSaved ? `${label} ✓` : label}
    </button>
  );
};