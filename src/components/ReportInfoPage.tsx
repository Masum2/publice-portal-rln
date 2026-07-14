import React from 'react';

interface ReportInfoPageProps {
  referralData?: {
    id: string;
    referralType: string;
    reporterName: string;
    reporterEmail: string;
    phone: string;
    addressTribe: string;
    incidentDate: string;
    status: string;
    submittedAt: string;
  };
}

export const ReportInfoPage: React.FC<ReportInfoPageProps> = ({ referralData }) => {
  // ডামি ডেটা (যদি প্রপস থেকে ডেটা না আসে)
  const data = referralData || {
    id: 'APS-2026-884219',
    referralType: 'Adult Protection',
    reporterName: 'John Doe',
    reporterEmail: 'john.doe@email.com',
    phone: '(555) 321-7654',
    addressTribe: 'Red Lake Nation Reservation',
    incidentDate: '2026-07-10',
    status: 'Under Review',
    submittedAt: '7/12/2026, 4:15:22 PM'
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-start relative bg-cover bg-center bg-no-repeat text-white"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(15, 32, 67, 0.85), rgba(2, 6, 23, 0.95)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1600')` 
      }}
    >
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/15 space-y-6">
        
        {/* হেডার সেকশন */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 gap-4">
          <div>
            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-500/30 uppercase tracking-widest">
              Internal Ledger
            </span>
            <h2 className="text-2xl font-black tracking-tight mt-1">📋 Report Information Details</h2>
          </div>
          <div className="bg-black/30 border border-white/10 px-4 py-2 rounded-xl text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Tracking ID</p>
            <p className="font-mono text-blue-400 font-extrabold text-sm">{data.id}</p>
          </div>
        </div>

        {/* মেইন গ্রিড লেআউট (সব ফিল্ড একসাথে ওপেন থাকবে) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
          
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Referral Type / Module</label>
            <input type="text" readOnly value={data.referralType} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-slate-200 focus:outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">System Intake Timestamp</label>
            <input type="text" readOnly value={data.submittedAt} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-slate-200 focus:outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reporter Full Identity</label>
            <input type="text" readOnly value={data.reporterName} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Secure Contact Email</label>
            <input type="text" readOnly value={data.reporterEmail} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Connectivity</label>
            <input type="text" readOnly value={data.phone} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Geographic Zone / Tribe affiliation</label>
            <input type="text" readOnly value={data.addressTribe} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Declared Incident Date</label>
            <input type="text" readOnly value={data.incidentDate} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Workflow Allocation Status</label>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-amber-400 uppercase tracking-wide bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">{data.status}</span>
            </div>
          </div>

        </div>

        {/* নিচের অ্যাকশন প্যানেল */}
        <div className="flex justify-end gap-3 pt-2">
          <button className="px-5 py-2 bg-white/5 border border-white/15 text-xs font-bold uppercase rounded-xl hover:bg-white/10 transition cursor-pointer">
            🖨️ Print Record
          </button>
          <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-bold uppercase rounded-xl shadow-md hover:opacity-90 transition cursor-pointer">
            📂 Assign Case Worker
          </button>
        </div>

      </div>
    </div>
  );
};