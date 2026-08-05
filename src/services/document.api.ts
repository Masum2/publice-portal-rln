// services/document.api.ts

import type { DocumentFile, ApiResponse } from '../types';
import { API_CONFIG } from './api.config';

export const documentApi = {
  // 📤 একাধিক ডকুমেন্ট আপলোড
  uploadMultiple: async (docs: DocumentFile[], publicReferralId: number): Promise<ApiResponse<any>> => {
    console.log('📤 Uploading multiple documents:', {
      publicReferralId,
      count: docs.length,
      documents: docs.map(d => ({ name: d.fileName, size: d.file?.size }))
    });

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

        console.log(`📄 Processing document ${i + 1}: ${doc.fileName}`);

        formData.append(`request[${i}].fileData`, doc.file, doc.file.name);
        formData.append(`request[${i}].id`, '0');
        formData.append(`request[${i}].recordedBy`, '105');
        formData.append(`request[${i}].recordedOn`, new Date().toISOString());
        formData.append(`request[${i}].createdBy`, '105');
        formData.append(`request[${i}].createdOn`, new Date().toISOString());
        formData.append(`request[${i}].documentDate`, doc.documentDate ? new Date(doc.documentDate).toISOString() : new Date().toISOString());
        formData.append(`request[${i}].fileType`, doc.file.type || 'application/octet-stream');
        formData.append(`request[${i}].fileName`, doc.fileName || doc.file.name);
        formData.append(`request[${i}].documentName`, doc.documentName || 'Document');
        formData.append(`request[${i}].publicReferralId`, String(publicReferralId));
        formData.append(`request[${i}].documentType`, String(doc.documentType || 1));
        formData.append(`request[${i}].comments`, doc.comments || '');
      }

      console.log('📦 FormData entries:');
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`  ${pair[0]}: ${pair[1].name} (${pair[1].size} bytes, ${pair[1].type})`);
        } else {
          console.log(`  ${pair[0]}: ${pair[1]}`);
        }
      }

      const url = `${API_CONFIG.baseUrl}/documents`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
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

      return result;
    } catch (error: any) {
      console.error('❌ Upload Multiple Documents Error:', error);
      throw error;
    }
  },

  // 📤 একক ডকুমেন্ট আপলোড
  uploadSingle: async (doc: DocumentFile, publicReferralId: number): Promise<ApiResponse<any>> => {
    console.log('📤 Uploading single document:', {
      publicReferralId,
      documentName: doc.documentName,
      fileName: doc.fileName,
      fileSize: doc.file?.size,
      fileType: doc.file?.type
    });

    if (!doc.file || !(doc.file instanceof File)) {
      console.error('❌ Invalid file object:', doc.file);
      throw new Error('Invalid file object. Please select a valid file.');
    }

    const formData = new FormData();
    
    formData.append('request[0].fileData', doc.file, doc.file.name);
    formData.append('request[0].id', '0');
    formData.append('request[0].recordedBy', '105');
    formData.append('request[0].recordedOn', new Date().toISOString());
    formData.append('request[0].createdBy', '105');
    formData.append('request[0].createdOn', new Date().toISOString());
    formData.append('request[0].documentDate', doc.documentDate ? new Date(doc.documentDate).toISOString() : new Date().toISOString());
    formData.append('request[0].fileType', doc.file.type || 'application/octet-stream');
    formData.append('request[0].fileName', doc.fileName || doc.file.name);
    formData.append('request[0].documentName', doc.documentName || 'Document');
    formData.append('request[0].publicReferralId', String(publicReferralId));
    formData.append('request[0].documentType', String(doc.documentType || 1));
    formData.append('request[0].comments', doc.comments || '');

    console.log('📦 FormData entries:');
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(`  ${pair[0]}: ${pair[1].name} (${pair[1].size} bytes)`);
      } else {
        console.log(`  ${pair[0]}: ${pair[1]}`);
      }
    }

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/documents`, {
        method: 'POST',
        body: formData,
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

      return result;
    } catch (error: any) {
      console.error('❌ Upload Portal Document Error:', error);
      throw error;
    }
  },
};