// services/case-study.api.ts

import type { CreateCaseStudyRequest, ApiResponse } from '../types';
import { handleApiCall, API_CONFIG } from './api.config';

export const caseStudyApi = {
  // 📝 CREATE Case Study
  create: async (data: CreateCaseStudyRequest): Promise<ApiResponse<any>> => {
    console.log('📤 Creating case study:', JSON.stringify(data, null, 2));
    const url = `${API_CONFIG.baseUrl}/case-studies`;
    return handleApiCall<any>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 📖 GET Case Study by ID
  get: async (id: number): Promise<ApiResponse<any>> => {
    console.log('📤 Fetching case study ID:', id);
    const url = `${API_CONFIG.baseUrl}/case-studies/${id}`;
    return handleApiCall<any>(url, {
      method: 'GET',
    });
  },

  // ✏️ UPDATE Case Study
  update: async (id: number, data: CreateCaseStudyRequest): Promise<ApiResponse<any>> => {
    console.log('📤 Updating case study:', { id, data });
    const url = `${API_CONFIG.baseUrl}/case-studies/${id}`;
    return handleApiCall<any>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};