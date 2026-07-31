// services/api.ts

import type { 
  CreateReferralRequest, 
  CreateCaseStudyRequest,
  ApiResponse, 
  Referral,
  DocumentFile
} from '../types';

const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// API রেসপন্স অ্যাডাপ্টার
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
    const url = `/beratenApi/aps/public-case-studies/create`;
    return handleApiCall<any>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // ✅ ডকুমেন্ট আপলোড - FormData সহ (একক বা একাধিক)
  uploadPortalDocument: async (doc: DocumentFile, publicReferralId: number): Promise<ApiResponse<any>> => {
    console.log('📤 Uploading document:', {
      publicReferralId,
      documentName: doc.documentName,
      fileName: doc.fileName,
      fileSize: doc.file.size,
      fileType: doc.file.type
    });

    const formData = new FormData();
    formData.append('PublicReferralId', String(publicReferralId));
    formData.append('DocumentType', String(doc.documentType || 1));
    formData.append('Comments', doc.comments || '');
    formData.append('DocumentDate', doc.documentDate ? new Date(doc.documentDate).toISOString() : new Date().toISOString());
    formData.append('FileName', doc.fileName || doc.file.name);
    formData.append('DocumentName', doc.documentName || 'Document');
    formData.append('FileType', doc.file.type || 'application/octet-stream');
    formData.append('File', doc.file);

    const url = `/beratenApi/aps/public-portal-documents/create`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // ❌ Content-Type header set করবেন না - browser নিজে set করে
      });

      console.log('📥 Response Status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Raw Response:', responseText);

      let result;
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = { message: responseText };
      }

      if (!response.ok) {
        const errorDetail = result.Message || result.message || result.title || `HTTP error! status: ${response.status}`;
        throw new Error(errorDetail);
      }

      return adaptApiResponse(result);
    } catch (error: any) {
      console.error('❌ Upload Portal Document Error:', error);
      throw error;
    }
  },

  // ✅ একাধিক ডকুমেন্ট আপলোড - একই endpoint ব্যবহার করে
  uploadMultiplePortalDocuments: async (docs: DocumentFile[], publicReferralId: number): Promise<ApiResponse<any>> => {
    console.log('📤 Uploading multiple documents:', {
      publicReferralId,
      count: docs.length
    });

    // প্রতিটি ডকুমেন্ট আলাদাভাবে আপলোড করুন
    let successCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      try {
        console.log(`📤 Uploading document ${i + 1}/${docs.length}: ${doc.fileName}`);
        const response = await api.uploadPortalDocument(doc, publicReferralId);
        if (response.isSuccess) {
          successCount++;
        } else {
          errors.push(`${doc.fileName}: ${response.message || 'Unknown error'}`);
        }
      } catch (error: any) {
        errors.push(`${doc.fileName}: ${error.message || 'Unknown error'}`);
        console.error(`❌ Failed to upload ${doc.fileName}:`, error);
      }
    }

    // সকল ডকুমেন্ট আপলোডের ফলাফল
    if (successCount === docs.length) {
      return {
        isSuccess: true,
        data: { uploadedCount: successCount },
        message: `All ${successCount} documents uploaded successfully`
      };
    } else if (successCount > 0) {
      return {
        isSuccess: false,
        data: { uploadedCount: successCount, totalCount: docs.length },
        message: `${successCount} out of ${docs.length} documents uploaded successfully`,
        errors: errors
      };
    } else {
      throw new Error(`Failed to upload any documents: ${errors.join('; ')}`);
    }
  },
};