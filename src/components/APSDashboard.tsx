import React, { useState } from 'react';
import type { Client, Referral } from '../types';


interface APSDashboardProps {
  referrals: Referral       [];
  clients: Client[];
  onUpdateReferral: (updated: Referral) => void;
  onCreateClient: (name: string, dob: string) => Client;
}

export const APSDashboard: React.FC<APSDashboardProps> = ({ referrals, clients, onUpdateReferral, onCreateClient }) => {
  const [selectedRef, setSelectedRef] = useState<Referral | null>(null);
  const [linkMode, setLinkMode] = useState(false);
  const [newClientMode, setNewClientMode] = useState(false);
  
  const [ncName, setNcName] = useState('');
  const [ncDob, setNcDob] = useState('');

  const startReview = (ref: Referral) => {
    onUpdateReferral({
      ...ref,
      status: 'In Review',
      reviewStartedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  const rejectReferral = (ref: Referral) => {
    onUpdateReferral({ ...ref, status: 'Rejected' });
    setSelectedRef(null);
  };

  const handleLinkClient = (clientId: string) => {
    if (selectedRef) {
      onUpdateReferral({
        ...selectedRef,
        status: 'Accepted',
        linkedClientId: clientId
      });
      setSelectedRef(null);
      setLinkMode(false);
    }
  };

  const handleCreateAndLink = () => {
    if(!ncName) return;
    const newClient = onCreateClient(ncName, ncDob);
    handleLinkClient(newClient.id);
    setNewClientMode(false);
    setNcName(''); setNcDob('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
      
      {/* COLUMN 1: NEW INTENTION INTAKE */}
      <div className="bg-slate-900/5 p-4 rounded-2xl border border-slate-200/60 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
          <h3 className="font-bold text-sm uppercase text-blue-900 tracking-wider flex items-center gap-2">📥 Incoming Submissions</h3>
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{referrals.filter(r => r.status === 'Submitted').length}</span>
        </div>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {referrals.filter(r => r.status === 'Submitted').map(r => (
            <div key={r.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition duration-200">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mb-1"><span>{r.id}</span><span>{r.submittedAt}</span></div>
              <p className="font-bold text-slate-800 text-sm">{r.clientName}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.details}</p>
              <button onClick={() => startReview(r)} className="mt-3 w-full text-xs font-bold bg-slate-900 text-white py-2 rounded-lg hover:bg-blue-600 transition shadow-sm">
                Acknowledge & Review
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMN 2: IN REVIEW HOLD BUCKET */}
      <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-200/50">
        <div className="flex justify-between items-center mb-4 border-b border-amber-200 pb-2">
          <h3 className="font-bold text-sm uppercase text-amber-800 tracking-wider flex items-center gap-2">⏳ Active Review Box</h3>
          <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{referrals.filter(r => r.status === 'In Review').length}</span>
        </div>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {referrals.filter(r => r.status === 'In Review').map(r => (
            <div key={r.id} onClick={() => { setSelectedRef(r); setLinkMode(false); setNewClientMode(false); }} 
                 className={`p-4 rounded-xl shadow-sm border cursor-pointer transition ${selectedRef?.id === r.id ? 'bg-amber-100/70 border-amber-400 ring-2 ring-amber-400/20' : 'bg-white border-slate-100 hover:border-amber-300'}`}>
              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-1"><span>{r.id}</span><span className="text-amber-600">Opened: {r.reviewStartedAt}</span></div>
              <p className="font-bold text-slate-800 text-sm">{r.clientName}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMN 3: DECISION ROOM ARCHIVE */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm uppercase text-slate-400 tracking-wider border-b pb-2 mb-4">⚙️ Command Action Panel</h3>
          
          {selectedRef ? (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-extrabold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Selected Case</span>
                <p className="font-bold text-base text-slate-800 mt-1">{selectedRef.clientName}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100">{selectedRef.details}</p>
                {selectedRef.documents.length > 0 && (
                  <div className="mt-2 text-xs text-blue-600 font-semibold">📎 Attached: {selectedRef.documents[0].name}</div>
                )}
              </div>

              {!linkMode && !newClientMode && (
                <div className="flex gap-2">
                  <button onClick={() => setLinkMode(true)} className="flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-xl hover:bg-emerald-700 transition shadow-sm text-xs uppercase">Accept & Link</button>
                  <button onClick={() => rejectReferral(selectedRef)} className="flex-1 bg-rose-500 text-white font-bold py-2.5 rounded-xl hover:bg-rose-600 transition shadow-sm text-xs uppercase">Reject & Archive</button>
                </div>
              )}

              {linkMode && (
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-3">
                  <p className="font-bold text-xs text-emerald-800 uppercase">Link with Existing Database Client:</p>
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {clients.map(c => (
                      <button key={c.id} onClick={() => handleLinkClient(c.id)} className="w-full text-left p-3 text-xs bg-white border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/30 flex justify-between items-center transition">
                        <div><p className="font-bold text-slate-700">{c.name}</p><p className="text-[10px] text-slate-400">DOB: {c.dob}</p></div>
                        <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded text-[10px]">{c.id}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => { setNewClientMode(true); setLinkMode(false); }} className="w-full text-xs font-bold text-indigo-600 underline text-center block pt-1">User missing? Create New Profile</button>
                </div>
              )}

              {newClientMode && (
                <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200 space-y-3">
                  <p className="font-bold text-xs text-indigo-900 uppercase">Initialize New Client Master Record:</p>
                  <input type="text" placeholder="Full Identity Name" value={ncName} onChange={e => setNcName(e.target.value)} className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <input type="date" value={ncDob} onChange={e => setNcDob(e.target.value)} className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <div className="flex gap-2 pt-1">
                    <button onClick={handleCreateAndLink} className="flex-1 bg-indigo-600 text-white font-bold text-xs py-2 rounded-lg hover:bg-indigo-700 transition">Save Ledger & Link</button>
                    <button onClick={() => setNewClientMode(false)} className="text-xs font-semibold text-slate-500 px-2">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 border border-dashed rounded-xl bg-slate-50">
              <p className="text-sm italic">Select any case profile from Active Box to execute actions.</p>
            </div>
          )}
        </div>

        {/* REJECTED / ARCHIVED LEDGER LIST */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <h4 className="font-bold text-[10px] uppercase text-slate-400 tracking-wider mb-2">History Logs & Resolutions</h4>
          <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs pr-1">
            {referrals.filter(r => r.status === 'Accepted' || r.status === 'Rejected').map(r => (
              <div key={r.id} className={`p-2.5 rounded-lg flex justify-between items-center ${r.status === 'Accepted' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                <span className="font-semibold">{r.clientName}</span>
                <span className="font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wide bg-white/80 shadow-sm">
                  {r.status === 'Accepted' ? `Linked ${r.linkedClientId}` : 'Archived'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};