// hooks/useReferral.ts
import { useState } from 'react';
import { api } from '../services/api';
import type {
  CreateReferralRequest,
  CreateCaseStudyRequest,
  DocumentFile,
  ApiResponse,
} from '../types';

export const useReferral = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ CREATE Referral
  const createReferral = async (data: CreateReferralRequest): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Creating new referral...');
      const response = await api.createReferral(data);
      console.log('✅ Referral created:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to create referral';
      console.error('❌ Create referral error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ GET Referral
  const getReferral = async (referralId: number | string): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Fetching referral for ID:', referralId);
      const response = await api.getReferralById(referralId);
      console.log('✅ Referral fetched:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to fetch referral';
      console.error('❌ Fetch referral error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATE Referral
  const updateReferral = async (
    referralId: number | string,
    data: CreateReferralRequest
  ): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Updating referral ID:', referralId);
      const response = await api.updateReferral(referralId, data);
      console.log('✅ Referral updated:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to update referral';
      console.error('❌ Update referral error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CREATE Case Study
  const createCaseStudy = async (data: CreateCaseStudyRequest): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Creating case study...');
      const response = await api.createCaseStudy(data);
      console.log('✅ Case study created:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to create case study';
      console.error('❌ Create case study error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
   // ✅ GET Case Study
  const getCaseStudy = async (referralId: number | string): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Fetching case study for referral ID:', referralId);
      const response = await api.getCaseStudyByReferralId(referralId);
      console.log('✅ Case study fetched:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to fetch case study';
      console.error('❌ Fetch case study error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATE Case Study
  const updateCaseStudy = async (
    referralId: number | string,
    data: CreateCaseStudyRequest
  ): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Updating case study for referral ID:', referralId);
      const response = await api.updateCaseStudy(referralId, data);
      console.log('✅ Case study updated:', response);
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to update case study';
      console.error('❌ Update case study error:', errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Upload Documents
  const uploadDocuments = async (
    docs: DocumentFile[],
    publicReferralId: number
  ): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('📤 Uploading documents...');

      const invalidDocs = docs.filter((d) => !d.file || !(d.file instanceof File));
      if (invalidDocs.length > 0) {
        throw new Error(
          `${invalidDocs.length} document(s) have no valid file object.`
        );
      }

      const response = await api.uploadMultiplePortalDocuments(docs, publicReferralId);
      console.log('✅ Documents uploaded:', response);
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

  // ✅ Reset Error
  const reset = () => {
    setError(null);
    setIsLoading(false);
  };

  return {
    createReferral,
    getReferral,
    updateReferral,
    createCaseStudy,
    getCaseStudy,
    updateCaseStudy,
    uploadDocuments,
    isLoading,
    error,
    reset,
  };
};