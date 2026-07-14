import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { mockReferrals, mockClients, mockICWACases } from './data/mockData';

import { PublicPortal } from './components/PublicPortal';
import { APSDashboard } from './components/APSDashboard';
import { ICWANotices } from './components/ICWANotices';

// 🆕 নতুন দুটি পেজ ইম্পোর্ট করুন
import { ReportInfoPage } from './components/ReportInfoPage';
import { CaseStudyPage } from './components/CaseStudyPage';

import type { Client, DocumentFile, Referral } from './types';

// AdminLayout কম্পোনেন্ট আগের মতোই থাকবে...
function AdminLayout({ referrals, clients, icwaCases, handleUpdateReferral, handleCreateClient, handleAddNotice }: any) {
  const [adminTab, setAdminTab] = useState<'aps' | 'icwa'>('aps');
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-slate-900 text-white px-6 py-4 shadow-xl border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h1 className="text-lg font-black tracking-wider text-slate-100 flex items-center gap-2">TRIBAL AUTOMATION HUB <span className="text-xs font-normal text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">INTERNAL v2.1</span></h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Developer Ledger: Masum Billah (RLN & Foster Care Automation Lead)</p>
          </div>
        </div>
        
        {/* কুইক নেভিগেশন লিংক - আপনার টেস্টিং সুবিধার জন্য */}
        <div className="flex gap-2 text-xs">
          <Link to="/report-info" className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md text-white transition">📄 Report Info</Link>
          <Link to="/case-study" className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md text-white transition">🔬 Case Study</Link>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setAdminTab('aps')} className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition duration-150 ${adminTab === 'aps' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Adult Protective Services</button>
          <button onClick={() => setAdminTab('icwa')} className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition duration-150 ${adminTab === 'icwa' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>ICWA Compliance Tracker</button>
        </div>

        <Link to="/" className="text-xs font-bold border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-slate-300 transition flex items-center gap-1">
          ← Public Portal View
        </Link>
      </nav>

      <div className="p-6 max-w-7xl mx-auto">
        {adminTab === 'aps' ? (
          <APSDashboard referrals={referrals} clients={clients} onUpdateReferral={handleUpdateReferral} onCreateClient={handleCreateClient} />
        ) : (
          <ICWANotices cases={icwaCases} onAddNotice={handleAddNotice} />
        )}
      </div>
    </div>
  );
}

function App() {
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [icwaCases, setIcwaCases] = useState(mockICWACases);

  const handleAddReferral = (newRef: Referral) => setReferrals([newRef, ...referrals]);
  const handleUpdateReferral = (updatedRef: Referral) => {
    setReferrals(referrals.map(r => r.id === updatedRef.id ? updatedRef : r));
  };
  const handleCreateClient = (name: string, dob: string): Client => {
    const newClient: Client = {
      id: 'CLI-' + Math.floor(1000 + Math.random() * 9000),
      name,
      dob,
      caseNumber: 'APS-2026-' + Math.floor(100 + Math.random() * 900)
    };
    setClients([...clients, newClient]);
    return newClient;
  };
  const handleAddNotice = (caseIndex: number, newDoc: DocumentFile) => {
    const updated = [...icwaCases];
    updated[caseIndex].documents.push(newDoc);
    updated[caseIndex].additionalNoticesCount += 1;
    setIcwaCases(updated);
  };

  return (
    <Router>
      <Routes>
        {/* 💻 পাবলিক গেটওয়ে */}
        <Route path="/" element={<PublicPortal onAddReferral={handleAddReferral} />} />
        
        {/* 🏢 মেইন ড্যাশবোর্ড */}
        <Route path="/admin" element={<AdminLayout referrals={referrals} clients={clients} icwaCases={icwaCases} handleUpdateReferral={handleUpdateReferral} handleCreateClient={handleCreateClient} handleAddNotice={handleAddNotice} />} />
        
        {/* 🆕 নতুন রাউট: Report Info Page দেখতে */}
        <Route path="/report-info" element={<ReportInfoPage />} />
        
        {/* 🆕 নতুন রাউট: Case Study Page দেখতে */}
        <Route path="/case-study" element={<CaseStudyPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;