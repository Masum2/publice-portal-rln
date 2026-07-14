import React, { useState } from 'react';

interface CaseStudyPageProps {
  initialReason?: string;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ initialReason }) => {
  const publicReason = initialReason || "The elder member lives alone in the Red Lake district and has been showing extreme signs of self-neglect. Neighbors noticed no power/electricity for 3 consecutive days. Medical prescriptions seem abandoned. Immediate wellness check requested.";
  
  // ইন্টারনাল অফিসারদের জন্য স্টেট
  const [riskLevel, setRiskLevel] = useState('High Risk');
  const [officerNotes, setOfficerNotes] = useState('');

  const handleSaveAssessment = () => {
    alert(`Case Assessment Saved!\nRisk Level: ${riskLevel}\nNotes Logged.`);
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-start relative bg-cover bg-center bg-no-repeat text-white"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(15, 32, 67, 0.85), rgba(2, 6, 23, 0.95)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1600')` 
      }}
    >
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/15 space-y-6">
        
        {/* হেডার */}
        <div className="border-b border-white/10 pb-4">
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">
            Clinical Investigation
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-1">🔬 Case Study & Risk Assessment</h2>
        </div>

        {/* সেকশন ১: পাবলিক পোর্টাল থেকে আসা মূল বিবরণ (Read Only) */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            🚨 Public Statement / Reported Concern (Source Material)
          </label>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 leading-relaxed shadow-inner">
            {publicReason}
          </div>
        </div>

        {/* সেকশন ২: ইন্টারনাল কেস অফিসার ইনপুট এরিয়া */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-white/5 pb-1">
            Officer Diagnostic Logging
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assessed Risk Severity</label>
              <select 
                value={riskLevel}
                onChange={e => setRiskLevel(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-white font-semibold"
              >
                <option>Low / Monitoring</option>
                <option>Medium / Secondary Priority</option>
                <option>High Risk / Immediate Dispatch</option>
                <option>Critical Threat / Law Enforcement Liaison</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ICWA Statutory Nexus / Determination</label>
              <input type="text" placeholder="e.g., Confirmed lineage to Band of Chippewa Indians" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Case Notes & Action Plan Details *</label>
            <textarea 
              rows={5}
              value={officerNotes}
              onChange={e => setOfficerNotes(e.target.value)}
              placeholder="Log interaction details, scheduled field-visits, or court petition updates here..."
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <span className="text-[10px] text-slate-400 font-medium">🔒 Authorised Encrypted Ledger Log</span>
          <button 
            type="button" 
            onClick={handleSaveAssessment}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold uppercase rounded-lg shadow-md hover:opacity-90 transition cursor-pointer"
          >
            💾 Save Case Assessment
          </button>
        </div>

      </div>
    </div>
  );
};