// hooks/useReferral.ts

import { useState } from 'react';
import { api } from '../services/api';
import type { CreateReferralRequest, CreateCaseStudyRequest, DocumentFile, ApiResponse } from '../types';

export const useReferral = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitReferral = async (data: CreateReferralRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Submitting referral...');
      const response = await api.createReferral(data);
      console.log('✅ Referral submitted successfully:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to submit referral';
      console.error('❌ Submit referral error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitCaseStudy = async (data: CreateCaseStudyRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Submitting case study...');
      const response = await api.createCaseStudy(data);
      console.log('✅ Case study submitted successfully:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to submit case study';
      console.error('❌ Submit case study error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ আপডেটেড uploadDocuments - সরাসরি ফাইল পাঠান
  const uploadDocuments = async (docs: DocumentFile[], publicReferralId: number): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📤 Uploading documents via hook:', {
        count: docs.length,
        publicReferralId,
        documentNames: docs.map(d => d.fileName)
      });

      // ✅ ভ্যালিডেশন: প্রতিটি ডকুমেন্টে file আছে কিনা চেক করুন
      const invalidDocs = docs.filter(d => !d.file || !(d.file instanceof File));
      if (invalidDocs.length > 0) {
        console.error('❌ Invalid documents found:', invalidDocs.map(d => d.fileName));
        throw new Error(`${invalidDocs.length} document(s) have no valid file object. Please remove and re-add them.`);
      }

      // ✅ API কল - সরাসরি ফাইল পাঠান (Base64 conversion করা যাবে না)
      const response = await api.uploadMultiplePortalDocuments(docs, publicReferralId);
      
      console.log('✅ Documents uploaded successfully:', {
        isSuccess: response.isSuccess,
        message: response.message,
        data: response.data
      });
      
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to upload documents';
      console.error('❌ Upload documents error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsLoading(false);
  };

  return {
    submitReferral,
    submitCaseStudy,
    uploadDocuments,
    isLoading,
    error,
    reset,
  };
};