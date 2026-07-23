// hooks/useReferral.ts

import { useState, useCallback } from 'react';
import { api } from '../services/api';
import type { CreateReferralRequest, CreateCaseStudyRequest,  } from '../types';

export const useReferral = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReferral = useCallback(async (data: CreateReferralRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.createReferral(data);
      
      if (!response.isSuccess) {
        const errorMessage = response.errors?.join(', ') || response.message || 'Failed to create referral';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitCaseStudy = useCallback(async (data: CreateCaseStudyRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.createCaseStudy(data);
      
      if (!response.isSuccess) {
        const errorMessage = response.errors?.join(', ') || response.message || 'Failed to create case study';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    submitReferral,
    submitCaseStudy,
    isLoading,
    error,
    reset,
  };
};