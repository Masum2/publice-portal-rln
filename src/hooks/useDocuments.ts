// hooks/useDocuments.ts
import { useState } from 'react';
import type { DocumentFile } from '../types';


export const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addDocument = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('Max file size allowed is 10MB');
      return false;
    }

    const newDoc: DocumentFile = {
      id: 'doc-' + Date.now(),
      name: file.name,
      type: 'Supporting Doc',
      uploadedAt: new Date().toLocaleDateString(),
    };

    setDocuments((prev) => [...prev, newDoc]);
    setError(null);
    return true;
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const clearDocuments = () => {
    setDocuments([]);
    setError(null);
  };

  return {
    documents,
    error,
    addDocument,
    removeDocument,
    clearDocuments,
  };
};