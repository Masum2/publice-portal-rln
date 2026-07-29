// services/api.ts

import type { 
  CreateReferralRequest, 
  CreateCaseStudyRequest,
  ApiResponse, 
  Referral
} from '../types';



const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// API রেসপন্স অ্যাডাপ্টার
const adaptApiResponse = <T>(response: any): ApiResponse<T> => {
  // যদি আপনার API রেসপন্সে Data, Status, Message থাকে
  if (response.Data !== undefined && response.Status !== undefined) {
    return {
      isSuccess: response.Status >= 200 && response.Status < 300,
      data: response.Data,
      message: response.Message || 'Success',
      errors: response.Status >= 400 ? [response.Message || 'Error'] : undefined,
    };
  }
  
  // যদি আপনার API রেসপন্সে isSuccess থাকে
  if (response.isSuccess !== undefined) {
    return response;
  }
  
  // ডিফল্ট
  return {
    isSuccess: true,
    data: response,
    message: 'Success',
  };
};

const handleApiCall = async <T>(
  url: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    console.log('═══════════════════════════════════════');
    console.log('📤 REQUEST DETAILS:');
    console.log('URL:', url);
    console.log('Method:', options?.method || 'GET');
    console.log('Headers:', {
      ...API_CONFIG.headers,
      ...options?.headers,
    });
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

    console.log('═══════════════════════════════════════');
    console.log('📥 RESPONSE DETAILS:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', [...response.headers]);
    console.log('═══════════════════════════════════════');

    // প্রথমে text হিসেবে পড়ুন
    const responseText = await response.text();
    console.log('📄 Raw Response (first 500 chars):', responseText.substring(0, 500));

    // যদি response খালি হয়
    if (!responseText || responseText.trim() === '') {
      throw new Error('Server returned empty response');
    }

    // চেক করুন response টি HTML কিনা
    const isHtml = responseText.trim().startsWith('<!DOCTYPE') || 
                   responseText.trim().startsWith('<html') ||
                   responseText.includes('Microsoft.') ||
                   responseText.includes('HTTP Error') ||
                   responseText.includes('Runtime Error');

    if (isHtml) {
      console.error('❌ Server returned HTML instead of JSON');
      console.error('Full HTML Response:', responseText);
      
      let errorMessage = 'Server returned HTML instead of JSON.\n\n';
      
      const titleMatch = responseText.match(/<title>(.*?)<\/title>/);
      if (titleMatch) {
        errorMessage += `Error: ${titleMatch[1]}\n\n`;
      }
      
      const h1Match = responseText.match(/<h1>(.*?)<\/h1>/);
      if (h1Match) {
        errorMessage += `Details: ${h1Match[1]}\n\n`;
      }
      
      errorMessage += `This usually means:\n`;
      errorMessage += `1. The endpoint URL might be wrong\n`;
      errorMessage += `2. Server is returning an error page\n`;
      errorMessage += `3. Authentication is required\n`;
      errorMessage += `4. Server-side error occurred\n\n`;
      errorMessage += `Response preview: ${responseText.substring(0, 300)}...`;
      
      throw new Error(errorMessage);
    }

    // JSON parse করার চেষ্টা করুন
    let result;
    try {
      result = JSON.parse(responseText);
      console.log('✅ Parsed JSON Response:', result);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 100)}...`);
    }

    // যদি response.ok না হয়
    if (!response.ok) {
      const errorMsg = result.message || result.Message || result.title || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    // API রেসপন্স অ্যাডাপ্ট করুন
    const adaptedResponse = adaptApiResponse<T>(result);
    console.log('✅ Adapted Response:', adaptedResponse);
    
    return adaptedResponse;
  } catch (error) {
    console.error('❌ API Call Error:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        '❌ Network Error: Unable to connect to server.\n' +
        'Please check:\n' +
        '1. Backend is running on https://localhost:44310\n' +
        '2. Proxy is configured in vite.config.js\n' +
        '3. CORS is properly configured in backend\n' +
        '4. No firewall blocking the connection'
      );
    }
    
    throw error;
  }
};

export const api = {
  // Create Referral
  createReferral: async (data: CreateReferralRequest): Promise<ApiResponse<Referral>> => {
    console.log('📤 Sending referral data:', JSON.stringify(data, null, 2));
    
    const url = `/beratenApi/aps/public-referrals/create`;
    return handleApiCall<Referral>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Create Case Study
  createCaseStudy: async (data: CreateCaseStudyRequest): Promise<ApiResponse<any>> => {
    console.log('📤 Sending case study data:', JSON.stringify(data, null, 2));
    
    // URL আপডেট করা হয়েছে
    const url = `/beratenApi/aps/public-case-studies/create`;
    return handleApiCall<any>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get Lookups
  getStates: async (): Promise<ApiResponse<any[]>> => {
    const url = `/beratenApi/lookups/states`;
    return handleApiCall<any[]>(url);
  },

  getCommunities: async (): Promise<ApiResponse<any[]>> => {
    const url = `/beratenApi/lookups/communities`;
    return handleApiCall<any[]>(url);
  },

  getCounties: async (): Promise<ApiResponse<any[]>> => {
    const url = `/beratenApi/lookups/counties`;
    return handleApiCall<any[]>(url);
  },

  getRelationships: async (): Promise<ApiResponse<any[]>> => {
    const url = `/beratenApi/lookups/relationships`;
    return handleApiCall<any[]>(url);
  },
};