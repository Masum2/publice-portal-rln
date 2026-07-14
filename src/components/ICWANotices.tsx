import React, { useState } from 'react';
import type { DocumentFile, ICWACase } from '../types';

interface ICWANoticesProps {
  cases: ICWACase[];
  onAddNotice: (caseIndex: number, newDoc: DocumentFile) => void;
}

export const ICWANotices: React.FC<ICWANoticesProps> = ({ cases, onAddNotice }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);

  const handleAdditionalNoticeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newNotice: DocumentFile = {
        id: 'icwa-add-' + Date.now(),
        name: e.target.files[0].name,
        type: 'Additional Notice',
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      onAddNotice(selectedCaseIdx, newNotice);
    }
  };

  const totalInitialNotices = cases.length;
  const totalAdditionalNotices = cases.reduce((acc, curr) => acc + curr.additionalNoticesCount, 0);

  return (
    <div className="space-y-6 mt-4">
      {/* GLOSSY ANALYTIC BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 p-6 rounded-2xl shadow-md text-white border border-indigo-800/30">
          <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-widest">Unique Children Tracked</p>
          <p className="text-4xl font-extrabold mt-2 tracking-tight">{totalInitialNotices}</p>
          <span className="text-[10px] text-indigo-400 mt-1 block">Based on first unique notice response</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-[10px] text-amber-600 uppercase font-bold tracking-widest">Duplicate/Subsequent Notices</p>
          <p className="text-4xl font-extrabold mt-2 tracking-tight text-slate-800">{totalAdditionalNotices}</p>
          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2 font-medium">Logged & Counted in Reporting</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-widest">Total Notice Traffic Count</p>
          <p className="text-4xl font-extrabold mt-2 tracking-tight text-slate-800">{totalInitialNotices + totalAdditionalNotices}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Aggregate volume telemetry</span>
        </div>
      </div>

      {/* DUAL WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide mb-3">ICWA Tracked Registry</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {cases.map((c, idx) => (
              <div key={c.id} onClick={() => setSelectedCaseIdx(idx)} 
                   className={`w-full text-left p-4 rounded-xl border transition cursor-pointer ${selectedCaseIdx === idx ? 'bg-indigo-50/50 border-indigo-600 shadow-sm' : 'hover:bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">👶 {c.childName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.agencyName}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Additional Docs: {c.additionalNoticesCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/5 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h4 className="font-bold text-slate-800 text-sm">Notice Stream Audit</h4>
              <p className="text-xs text-slate-400">Target Profile: <span className="text-indigo-600 font-bold">{cases[selectedCaseIdx]?.childName}</span></p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">📥 Drop Subsequent Duplicate Notice File:</label>
              <input type="file" onChange={handleAdditionalNoticeUpload} className="block w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-slate-900 file:text-white hover:file:bg-indigo-600 cursor-pointer" />
              <p className="text-[10px] text-slate-400 mt-1.5">Uploading registers file under duplicate counter array for aggregate compliance auditing.</p>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">System Document Registry</span>
            <div className="max-h-44 overflow-y-auto space-y-1.5 text-xs bg-white p-3 rounded-xl border border-slate-200/60">
              {cases[selectedCaseIdx]?.documents.map(d => (
                <div key={d.id} className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center">
                  <span className="font-medium text-slate-700">📄 {d.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${d.type === 'Initial Notice' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{d.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};