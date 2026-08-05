// components/TestReferralGet.tsx - শুধু 2021 এর জন্য

import React, { useState, useEffect } from 'react';

export const TestReferralGet: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ শুধু 2021 ID দিয়ে ডেটা ফেচ করুন
  const fetchReferral = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const url = '/beratenApi/public-portal/referrals/2021'; // ✅ হার্ডকোডেড 2021
      console.log('📤 Fetching from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('📥 Status Code:', response.status);
      console.log('📥 Status Text:', response.statusText);

      const text = await response.text();
      console.log('📄 Raw Response:', text);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const json = JSON.parse(text);
      console.log('✅ Parsed JSON:', json);
      
      setData(json);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট লোড হলে অটোমেটিক ফেচ করুন
  useEffect(() => {
    fetchReferral();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-4">🔍 Referral Data Test (ID: 2021)</h2>
      
      {/* Status */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : data ? 'bg-green-500' : error ? 'bg-red-500' : 'bg-gray-300'}`}></div>
          <span className="text-sm font-medium">
            {loading ? 'Loading...' : data ? 'Loaded' : error ? 'Error' : 'Not Loaded'}
          </span>
        </div>
        <button
          onClick={fetchReferral}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
          <p className="font-semibold">❌ Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Data */}
      {data && (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-800">✅ Data Received Successfully!</p>
          </div>

          {/* Data Display */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700">📋 Referral Data (ID: 2021)</p>
            </div>
            <div className="p-4 overflow-auto max-h-96">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>

          {/* Key Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Victim Name</p>
              <p className="font-semibold">
                {data.victimFirstName || data.data?.victimFirstName || 'N/A'} 
                {data.victimLastName || data.data?.victimLastName || ''}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-600 font-medium">Reporter</p>
              <p className="font-semibold">
                {data.reporterFirstName || data.data?.reporterFirstName || 'N/A'}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600 font-medium">Email</p>
              <p className="font-semibold text-sm">
                {data.reporterEmail || data.data?.reporterEmail || 'N/A'}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-600 font-medium">Phone</p>
              <p className="font-semibold">
                {data.reporterPhone || data.data?.reporterPhone || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Data */}
      {!loading && !error && !data && (
        <div className="text-center py-8 text-gray-500">
          <p>No data loaded. Click refresh to fetch.</p>
        </div>
      )}
    </div>
  );
};