// services/api.ts
import type {
  CreateReferralRequest,
  CreateCaseStudyRequest,
  ApiResponse,
  DocumentFile,
} from '../types';

const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const adaptApiResponse = <T>(response: any): ApiResponse<T> => {
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

const handleApiCall = async <T>(
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

    const isHtml =
      responseText.trim().startsWith('<!DOCTYPE') ||
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
      const errorMsg =
        result.message || result.Message || result.title || `HTTP ${response.status}`;
      throw new Error(errorMsg);
    }

    return adaptApiResponse<T>(result);
  } catch (error) {
    console.error('❌ API Call Error:', error);
    throw error;
  }
};

export const api = {
  // ✅ CREATE Referral - POST
  createReferral: async (data: CreateReferralRequest): Promise<ApiResponse<any>> => {
    console.log('📤 Creating new referral...');
    const url = `/beratenApi/public-portal/referrals`;
    return handleApiCall<any>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // ✅ GET Referral by ID - GET
  getReferralById: async (referralId: number | string): Promise<ApiResponse<any>> => {
    console.log('📤 Fetching referral for ID:', referralId);
    const url = `/beratenApi/public-portal/referrals/${referralId}`;
    return handleApiCall<any>(url, {
      method: 'GET',
    });
  },

  // ✅ UPDATE Referral - PUT
updateReferral: async (
  referralId: number | string,
  data: CreateReferralRequest
): Promise<ApiResponse<any>> => {
  console.log('📤 Updating referral ID:', referralId);
  console.log('📤 Update Data:', JSON.stringify(data, null, 2));
  
  // ✅ নিশ্চিত করুন ডাটাতে Id আছে
  const updateData = {
    ...data,
    Id: Number(referralId), // 👈 স্পষ্টভাবে Id যোগ করুন
  };
  
  const url = `/beratenApi/public-portal/referrals/${referralId}`;
  return handleApiCall<any>(url, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
},

  // ✅ CREATE Case Study - POST
  createCaseStudy: async (data: CreateCaseStudyRequest): Promise<ApiResponse<any>> => {
    console.log('📤 Creating case study...');
    const url = `/beratenApi/public-portal/case-studies`;
    return handleApiCall<any>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
// ✅ GET Case Study by Referral ID
  getCaseStudyByReferralId: async (referralId: number | string): Promise<ApiResponse<any>> => {
    console.log('📤 Fetching case study for referral ID:', referralId);
    const url = `/beratenApi/public-portal/case-studies/${referralId}`;
    return handleApiCall<any>(url, {
      method: 'GET',
    });
  },

  // ✅ UPDATE Case Study - PUT
updateCaseStudy: async (
  publicReferralId: number | string,  
  data: CreateCaseStudyRequest
): Promise<ApiResponse<any>> => {
  console.log('📤 Updating case study for publicReferralId:', publicReferralId);
  console.log('📤 Update Data:', JSON.stringify(data, null, 2));
  
  // URL  publicReferralId 
  const url = `/beratenApi/public-portal/case-studies/${publicReferralId}`;
  return handleApiCall<any>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
},
  // ✅ Upload Documents - POST
  uploadMultiplePortalDocuments: async (
    docs: DocumentFile[],
    publicReferralId: number
  ): Promise<ApiResponse<any>> => {
    console.log('📤 Uploading documents...');

    if (!docs || docs.length === 0) {
      throw new Error('No documents to upload');
    }

    try {
      const formData = new FormData();

      for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];

        if (!doc.file || !(doc.file instanceof File)) {
          throw new Error(`Invalid file object for ${doc.fileName}`);
        }

        formData.append(`request[${i}].fileData`, doc.file, doc.file.name);
        formData.append(`request[${i}].id`, '0');
        formData.append(`request[${i}].recordedBy`, '105');
        formData.append(`request[${i}].recordedOn`, new Date().toISOString());
        formData.append(`request[${i}].createdBy`, '105');
        formData.append(`request[${i}].createdOn`, new Date().toISOString());
        formData.append(
          `request[${i}].documentDate`,
          doc.documentDate ? new Date(doc.documentDate).toISOString() : new Date().toISOString()
        );
        formData.append(`request[${i}].fileType`, doc.file.type || 'application/octet-stream');
        formData.append(`request[${i}].fileName`, doc.fileName || doc.file.name);
        formData.append(`request[${i}].documentName`, doc.documentName || 'Document');
        formData.append(`request[${i}].publicReferralId`, String(publicReferralId));
        formData.append(`request[${i}].documentType`, String(doc.documentType || 1));
        formData.append(`request[${i}].comments`, doc.comments || '');
      }

      const url = `/beratenApi/public-portal/documents`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      console.log('📄 Raw Response:', responseText);

      let result;
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = { message: responseText };
      }

      if (!response.ok) {
        const errorDetail =
          result.Message || result.message || result.title || `HTTP error! status: ${response.status}`;
        throw new Error(errorDetail);
      }

      return adaptApiResponse(result);
    } catch (error: any) {
      console.error('❌ Upload Documents Error:', error);
      throw error;
    }
  },
};