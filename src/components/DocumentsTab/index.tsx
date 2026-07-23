// DocumentsTab/index.tsx
import React from 'react';
import { Save, Loader } from 'lucide-react';


import type { DocumentFile } from '../../types';
import { SaveButton } from '../SaveButton';

interface DocumentsTabProps {
  docs: DocumentFile[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (id: string) => void;
  onSave: () => void;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  docs,
  onFileUpload,
  onRemoveFile,
  onSave,
}) => {
  return (
    <>
      <div className="space-y-6">
        <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer group">
          <input
            type="file"
            onChange={onFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-5xl mb-3 group-hover:scale-110 transition">📁</div>
          <p className="text-base font-bold text-gray-700">Drop files here or click to browse</p>
          <p className="text-sm text-gray-500 mt-1">Supported: PDF, JPG, PNG (Max 10MB each)</p>
        </div>

        {docs.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Uploaded Files ({docs.length})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {docs.map((d) => (
                <div
                  key={d.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between group hover:border-gray-300 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl">📄</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{d.name}</p>
                      <p className="text-[10px] text-gray-500">{d.uploadedAt}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveFile(d.id)}
                    className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <SaveButton onSave={onSave} label="Save Documents" />
      </div>
    </>
  );
};