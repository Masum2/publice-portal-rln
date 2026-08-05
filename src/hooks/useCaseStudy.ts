// hooks/useCaseStudy.ts

import { useState } from 'react';
import { caseStudyApi } from '../services/case-study.api';
import type { CreateCaseStudyRequest, ApiResponse } from '../types';

export const useCaseStudy = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [caseStudy, setCaseStudy] = useState<any | null>(null);

  // 📝 Create Case Study
  const createCaseStudy = async (data: CreateCaseStudyRequest): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Creating case study...');
      const response = await caseStudyApi.create(data);
      
      if (response.isSuccess && response.data) {
        setCaseStudy(response.data);
        console.log('✅ Case study created:', response.data);
      }
      
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to create case study';
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 📖 Get Case Study
  const getCaseStudy = async (id: number): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Fetching case study:', id);
      const response = await caseStudyApi.get(id);
      
      if (response.isSuccess && response.data) {
        setCaseStudy(response.data);
        console.log('✅ Case study loaded');
      }
      
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to fetch case study';
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✏️ Update Case Study
  const updateCaseStudy = async (id: number, data: CreateCaseStudyRequest): Promise<ApiResponse<any>> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📤 Updating case study:', id);
      const response = await caseStudyApi.update(id, data);
      
      if (response.isSuccess && response.data) {
        setCaseStudy(response.data);
        console.log('✅ Case study updated');
      }
      
      return response;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to update case study';
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    caseStudy,
    isLoading,
    error,
    createCaseStudy,
    getCaseStudy,
    updateCaseStudy,
  };
};