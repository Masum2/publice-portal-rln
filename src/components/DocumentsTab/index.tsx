// DocumentsTab/index.tsx
import React, { useState } from 'react';
import type { DocumentFile } from '../../types';
import { SaveButton } from '../SaveButton';

interface DocumentsTabProps {
  docs: DocumentFile[];
  onFileUpload: (fileData: Omit<DocumentFile, 'id' | 'uploadedAt'>) => void;
  onRemoveFile: (id: string) => void;
  onSave: () => void;
  isReferralSaved: boolean;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  docs,
  onFileUpload,
  onRemoveFile,
  onSave,
  isReferralSaved,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState<number>(1);
  const [documentDate, setDocumentDate] = useState(new Date().toISOString().split('T')[0]);
  const [comments, setComments] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('Max file size allowed is 10MB');
        return;
      }
      setSelectedFile(file);
      // ডিফল্টভাবে ফাইলের নাম ডকুমেন্ট নেম হিসেবে সেট করে দিতে পারেন
      if (!documentName) {
        setDocumentName(file.name.split('.')[0]);
      }
    }
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }
    if (!documentName) {
      alert('Document Name is required.');
      return;
    }
    if (!documentDate) {
      alert('Document Date is required.');
      return;
    }

    onFileUpload({
      file: selectedFile,
      fileName: selectedFile.name,
      documentName,
      documentType: Number(documentType),
      documentDate,
      comments,
      name: '',
      type: ''
    });

    // ফর্ম রিসেট
    setSelectedFile(null);
    setDocumentName('');
    setComments('');
  };

  return (
    <>
      <div className="space-y-6">
        {!isReferralSaved && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm">
            ⚠️ Please save the <strong>Referral Info</strong> tab first before uploading documents (Required for PublicReferralId).
          </div>
        )}

        {/* File Add Form */}
        <form onSubmit={handleAddDocument} className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Upload New Document</h3>
          
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-white hover:bg-gray-50 transition cursor-pointer">
            <input
              type="file"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-3xl mb-2">📁</div>
            <p className="text-sm font-bold text-gray-700">
              {selectedFile ? `Selected: ${selectedFile.name}` : 'Drop file here or click to browse'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Supported: PDF, JPG, PNG (Max 10MB)</p>
          </div>

          {selectedFile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Document Name *</label>
                <input
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder="e.g. Medical Report"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Document Type *</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>Supporting Doc</option>
                  <option value={2}>Medical Record</option>
                  <option value={3}>Identification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Document Date *</label>
                <input
                  type="date"
                  value={documentDate}
                  onChange={(e) => setDocumentDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Comments (Max 1000 chars)</label>
                <input
                  type="text"
                  maxLength={1000}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Optional comments..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase rounded-lg transition"
                >
                  Add to List
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Uploaded Files List */}
        {docs.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Ready to Upload ({docs.length})
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
                      <p className="text-sm font-medium text-gray-700 truncate">{d.documentName}</p>
                      <p className="text-[10px] text-gray-500">{d.fileName} ({d.documentDate})</p>
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