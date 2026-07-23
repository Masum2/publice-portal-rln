// shared/TabButton.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isSaved?: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  icon,
  label,
  isSaved = false,
}) => {
  const getActiveClasses = () => {
    if (isActive && label === 'Referral Info') {
      return 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm';
    }
    if (isActive && label === 'Case Study') {
      return 'bg-purple-100 text-purple-700 border border-purple-200 shadow-sm';
    }
    if (isActive && label === 'Documents') {
      return 'bg-cyan-100 text-cyan-700 border border-cyan-200 shadow-sm';
    }
    return 'text-gray-500 hover:text-gray-700 hover:bg-gray-100';
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${getActiveClasses()}`}
    >
      {icon}
      {label}
      {isSaved && <Check className="w-3.5 h-3.5 text-emerald-600" />}
    </button>
  );
};