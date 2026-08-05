// services/referral.api.ts

import type { CreateReferralRequest, Referral, ApiResponse } from '../types';

// ✅ সঠিক বেস URL
const API_BASE_URL = '/beratenApi/public-portal';

export const referralApi = {
  // 📝 CREATE
  create: async (data: CreateReferralRequest): Promise<ApiResponse<Referral>> => {
    console.log('📤 Creating referral:', data);
    
    try {
      const response = await fetch(`${API_BASE_URL}/referrals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const text = await response.text();
      console.log('📥 Create Response:', text);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const json = JSON.parse(text);
      console.log('✅ Create Response JSON:', json);
      
      // ✅ Data প্রপার্টি চেক করুন (বড় D)
      const responseData = json.Data || json.data || json;
      
      return {
        isSuccess: true,
        data: responseData,
        message: json.Message || json.message || 'Success',
      };
    } catch (error) {
      console.error('❌ Create error:', error);
      throw error;
    }
  },

  // 📖 GET - সঠিক URL
  get: async (id: number): Promise<ApiResponse<Referral>> => {
    console.log('📤 Fetching referral ID:', id);
    const url = `${API_BASE_URL}/referrals/${id}`;
    console.log('📤 Full URL:', url);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      console.log('📥 Response Status:', response.status);

      const text = await response.text();
      console.log('📄 Raw Response Text:', text);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      if (!text || text.trim() === '') {
        throw new Error('Empty response from server');
      }

      const json = JSON.parse(text);
      console.log('✅ Parsed JSON:', json);

      // ✅ Data প্রপার্টি চেক করুন (বড় D)
      if (json.Data) {
        console.log('✅ Found Data property:', json.Data);
        return {
          isSuccess: true,
          data: json.Data,
          message: json.Message || 'Success',
        };
      } else if (json.data) {
        console.log('✅ Found data property:', json.data);
        return {
          isSuccess: true,
          data: json.data,
          message: json.message || 'Success',
        };
      } else if (json.id !== undefined || json.publicReferralId !== undefined) {
        console.log('✅ Direct referral object:', json);
        return {
          isSuccess: true,
          data: json,
          message: 'Success',
        };
      } else {
        console.warn('⚠️ Unexpected response structure:', json);
        return {
          isSuccess: false,
          data: null as any,
          message: 'Unexpected response structure',
          errors: ['Invalid response format'],
        };
      }
    } catch (error) {
      console.error('❌ Get error:', error);
      throw error;
    }
  },

  // ✏️ UPDATE - সঠিক URL
  update: async (id: number, data: CreateReferralRequest): Promise<ApiResponse<Referral>> => {
    console.log('📤 Updating referral:', { id, data });
    const url = `${API_BASE_URL}/referrals/${id}`;
    console.log('📤 Full URL:', url);
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const text = await response.text();
      console.log('📥 Update Response:', text);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const json = JSON.parse(text);
      console.log('✅ Update Response JSON:', json);
      
      // ✅ Data প্রপার্টি চেক করুন (বড় D)
      const responseData = json.Data || json.data || json;
      
      return {
        isSuccess: true,
        data: responseData,
        message: json.Message || json.message || 'Success',
      };
    } catch (error) {
      console.error('❌ Update error:', error);
      throw error;
    }
  },

  // 🗑️ DELETE
  delete: async (id: number): Promise<ApiResponse<void>> => {
    console.log('📤 Deleting referral ID:', id);
    const url = `${API_BASE_URL}/referrals/${id}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return {
        isSuccess: true,
        data: undefined as any,
        message: 'Deleted successfully',
      };
    } catch (error) {
      console.error('❌ Delete error:', error);
      throw error;
    }
  },
};