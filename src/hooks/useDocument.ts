// hooks/useDocument.ts

import { useState } from 'react';
import { documentApi } from '../services/document.api';
import type { DocumentFile, ApiResponse } from '../types';

export const useDocument = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // 📤 Upload Multiple Documents
  const uploadDocuments = async (
    docs: DocumentFile[], 
    publicReferralId: number
  ): Promise<ApiResponse<any>> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      console.log('📤 Uploading documents:', {
        count: docs.length,
        publicReferralId,
      });

      // Validate documents
      const invalidDocs = docs.filter(d => !d.file || !(d.file instanceof File));
      if (invalidDocs.length > 0) {
        throw new Error(`${invalidDocs.length} document(s) have no valid file object`);
      }

      // Simulate progress (optional)
      setUploadProgress(50);
      
      const response = await documentApi.uploadMultiple(docs, publicReferralId);
      
      setUploadProgress(100);
      console.log('✅ Documents uploaded successfully');
      
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to upload documents';
      setError(errorMsg);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // 📤 Upload Single Document
  const uploadDocument = async (
    doc: DocumentFile, 
    publicReferralId: number
  ): Promise<ApiResponse<any>> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      console.log('📤 Uploading single document:', doc.fileName);
      
      if (!doc.file || !(doc.file instanceof File)) {
        throw new Error('Invalid file object');
      }

      setUploadProgress(50);
      
      const response = await documentApi.uploadSingle(doc, publicReferralId);
      
      setUploadProgress(100);
      console.log('✅ Document uploaded successfully');
      
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to upload document';
      setError(errorMsg);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setUploadProgress(0);
    setError(null);
    setIsUploading(false);
  };

  return {
    uploadDocuments,
    uploadDocument,
    isUploading,
    uploadProgress,
    error,
    reset,
  };
};