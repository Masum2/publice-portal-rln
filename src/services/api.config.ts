// services/api.config.ts

import type { ApiResponse } from '../types';

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  baseUrl: '/beratenApi/public-portal',
};

// API রেসপন্স অ্যাডাপ্টার
export const adaptApiResponse = <T>(response: any): ApiResponse<T> => {
  if (response.Data !== undefined && response.Status !== undefined) {
    return {
      isSuccess: response.Status >= 200 && response.Status < 300,
      data: response.Data,
      message: response.Message || 'Success',
      errors: response.Status >= 400 ? [response.Message || 'Error'] : undefined,
    };
  }
  
  if (response.isSuccess !== undefined) {
    return response;
  }
  
  return {
    isSuccess: true,
    data: response,
    message: 'Success',
  };
};

// HTTP কল হ্যান্ডেলার
export const handleApiCall = async <T>(
  url: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    console.log('═══════════════════════════════════════');
    console.log('📤 REQUEST DETAILS:');
    console.log('URL:', url);
    console.log('Method:', options?.method || 'GET');
    if (options?.body) {
      console.log('Body:', options.body);
    }
    console.log('═══════════════════════════════════════');
    
    const response = await fetch(url, {
      ...API_CONFIG,
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options?.headers,
      },
    });

    console.log('📥 RESPONSE Status:', response.status);

    const responseText = await response.text();
    console.log('📄 Raw Response:', responseText.substring(0, 500));

    if (!responseText || responseText.trim() === '') {
      throw new Error('Server returned empty response');
    }

    const isHtml = responseText.trim().startsWith('<!DOCTYPE') || 
                   responseText.trim().startsWith('<html') ||
                   responseText.includes('Microsoft.') ||
                   responseText.includes('HTTP Error') ||
                   responseText.includes('Runtime Error');

    if (isHtml) {
      console.error('❌ Server returned HTML instead of JSON');
      throw new Error('Server returned HTML instead of JSON');
    }

    let result;
    try {
      result = JSON.parse(responseText);
      console.log('✅ Parsed JSON Response:', result);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      throw new Error(`Invalid JSON response from server`);
    }

    if (!response.ok) {
      const errorMsg = result.message || result.Message || result.title || `HTTP ${response.status}`;
      throw new Error(errorMsg);
    }

    return adaptApiResponse<T>(result);
  } catch (error) {
    console.error('❌ API Call Error:', error);
    throw error;
  }
};