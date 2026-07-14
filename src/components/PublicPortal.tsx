import React, { useState } from 'react';
import type { Referral, DocumentFile } from '../types';

interface PublicPortalProps {
  onAddReferral: (referral: Referral) => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onAddReferral }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [referralType, setReferralType] = useState('Adult Protection');
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressTribe, setAddressTribe] = useState('');
  const [reason, setReason] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [docs, setDocs] = useState<DocumentFile[]>([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'Supporting Doc' | 'Additional Notice') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("Max file size allowed is 10MB");
        return;
      }
      setDocs([...docs, {
        id: 'doc-' + Date.now(),
        name: file.name,
        type: type,
        uploadedAt: new Date().toLocaleDateString()
      }]);
    }
  };

  const removeFile = (id: string) => {
    setDocs(docs.filter(d => d.id !== id));
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!reporterName) newErrors.reporterName = "Reporter's Full Name is required";
    if (!reporterEmail) newErrors.reporterEmail = "Reporter's Email is required";
    if (!phone) newErrors.phone = "Phone Number is required";
    if (!addressTribe) newErrors.addressTribe = "Address or Tribe Name is required";
    if (!reason) newErrors.reason = "Reason for Referral is required";
    if (!incidentDate) newErrors.incidentDate = "Incident Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) return;
    
    const trackingId = 'APS-2026-' + Math.floor(100000 + Math.random() * 900000);
    onAddReferral({
      id: trackingId,
      reporterName,
      reporterContact: `${reporterEmail} | ${phone}`,
      clientName: "Referral Client (" + referralType + ")",
      clientDob: incidentDate,
      details: reason,
      status: 'Submitted',
      submittedAt: new Date().toLocaleString(),
      documents: docs
    });
    setGeneratedId(trackingId);
    setStep(5);
  };

  const resetPortal = () => {
    setReferralType('Adult Protection'); setReporterName(''); setReporterEmail('');
    setPhone(''); setAddressTribe(''); setReason(''); setIncidentDate('');
    setDocs([]); setIsAgreed(false); setErrors({}); setStep(1);
  };

  // স্টেপ ইন্ডিকেটর কম্পোনেন্ট
  const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    const steps = ['Start', 'Information', 'Documents', 'Review', 'Confirm'];
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700 -translate-y-1/2"></div>
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            return (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110 shadow-lg shadow-blue-500/30' : 
                    isCompleted ? 'bg-emerald-500 text-white' : 
                    'bg-gray-700 text-gray-400'}
                `}>
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`text-[10px] font-bold mt-1.5 transition-colors ${isActive ? 'text-blue-400' : isCompleted ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      
      {/* 🏢 প্রিমিয়াম হেডার - ফুল ওয়াইড */}
      <header className="w-full bg-slate-900/80 backdrop-blur-md px-6 md:px-12 py-4 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-sm tracking-tighter">RLN</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-wide">Red Lake Nation</h1>
              <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase -mt-0.5">Adult & Family Protective Services</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
              🔒 SECURE PORTAL
            </span>
            <span className="text-xs text-gray-400 hidden lg:block">v2.0</span>
          </div>
        </div>
      </header>

      {/* স্টেপ ইন্ডিকেটর */}
      {step > 1 && step < 5 && <StepIndicator currentStep={step} />}

      {/* মেইন কনটেন্ট - ফুল ওয়াইড */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 w-full">
        
        {/* STEP 1: LANDING PAGE */}
        {step === 1 && (
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px]">
              {/* বাম পাশ - কনটেন্ট */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-500/30 uppercase tracking-widest">
                  Official Intake Channel
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Tribal Protection &<br />
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Welfare Portal</span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Confidential reporting gate for Adult Protection, Child Welfare, and ICWA compliance notices. No authorization or login required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95"
                  >
                    Start New Referral →
                  </button>
                  {/* <button 
                    onClick={() => alert("Status Tracking Feature Coming Soon!")}
                    className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition"
                  >
                    Check Status
                  </button> */}
                </div>
              </div>
              {/* ডান পাশ - ইলাস্ট্রেশন */}
              <div className="hidden lg:flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl rounded-full"></div>
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                        <span className="text-2xl">📋</span>
                        <div>
                          <p className="text-xs text-gray-400">Active Referrals</p>
                          <p className="text-xl font-bold text-white">247</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                        <span className="text-2xl">⏳</span>
                        <div>
                          <p className="text-xs text-gray-400">Under Review</p>
                          <p className="text-xl font-bold text-yellow-400">18</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="text-xs text-gray-400">Resolved Cases</p>
                          <p className="text-xl font-bold text-emerald-400">1,342</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: REFERRAL INFORMATION */}
        {step === 2 && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-6 md:px-8 py-5 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">📝</span>
                  Referral Information
                  <span className="text-xs font-normal text-gray-400 ml-2">Step 1 of 3</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">Please fill in all required fields marked with *</p>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* রেফারেল টাইপ */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Referral Type <span className="text-red-400">*</span>
                    </label>
                    <select 
                      value={referralType} 
                      onChange={e => setReferralType(e.target.value)}
                      className="w-full p-3.5 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    >
                      <option className="bg-slate-800">Child Welfare</option>
                      <option className="bg-slate-800">Adult Protection</option>
                      <option className="bg-slate-800">ICWA Compliance</option>
                    </select>
                  </div>

                  {/* রিপোর্টার নাম */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Reporter's Full Name <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={reporterName}
                      onChange={e => setReporterName(e.target.value)}
                      className={`w-full p-3.5 bg-slate-800/50 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${errors.reporterName ? 'border-red-500' : 'border-white/10'}`} 
                      placeholder="Enter full name"
                    />
                    {errors.reporterName && <p className="text-xs text-red-400 font-semibold mt-1.5">⚠️ {errors.reporterName}</p>}
                  </div>

                  {/* ইমেইল */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="email" 
                      value={reporterEmail}
                      onChange={e => setReporterEmail(e.target.value)}
                      className={`w-full p-3.5 bg-slate-800/50 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${errors.reporterEmail ? 'border-red-500' : 'border-white/10'}`} 
                      placeholder="name@email.com"
                    />
                    {errors.reporterEmail && <p className="text-xs text-red-400 font-semibold mt-1.5">⚠️ {errors.reporterEmail}</p>}
                  </div>

                  {/* ফোন */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className={`w-full p-3.5 bg-slate-800/50 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${errors.phone ? 'border-red-500' : 'border-white/10'}`} 
                      placeholder="(555) 000-0000"
                    />
                    {errors.phone && <p className="text-xs text-red-400 font-semibold mt-1.5">⚠️ {errors.phone}</p>}
                  </div>

                  {/* ট্রাইব/এড্রেস */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Tribe / Address <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={addressTribe}
                      onChange={e => setAddressTribe(e.target.value)}
                      className={`w-full p-3.5 bg-slate-800/50 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${errors.addressTribe ? 'border-red-500' : 'border-white/10'}`} 
                      placeholder="Enter tribe name or address"
                    />
                    {errors.addressTribe && <p className="text-xs text-red-400 font-semibold mt-1.5">⚠️ {errors.addressTribe}</p>}
                  </div>

                  {/* ইভেন্ট ডেট */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Incident Date <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="date" 
                      value={incidentDate}
                      onChange={e => setIncidentDate(e.target.value)}
                      className={`w-full p-3.5 bg-slate-800/50 border rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${errors.incidentDate ? 'border-red-500' : 'border-white/10'}`} 
                    />
                    {errors.incidentDate && <p className="text-xs text-red-400 font-semibold mt-1.5">⚠️ {errors.incidentDate}</p>}
                  </div>

                  {/* রিজন (পূর্ণ প্রস্থ) */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Reason for Referral <span className="text-red-400">*</span>
                    </label>
                    <textarea 
                      rows={5} 
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      className={`w-full p-3.5 bg-slate-800/50 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none ${errors.reason ? 'border-red-500' : 'border-white/10'}`} 
                      placeholder="Provide detailed description of the situation..."
                    />
                    {errors.reason && <p className="text-xs text-red-400 font-semibold mt-1.5">⚠️ {errors.reason}</p>}
                  </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-6 py-2.5 border border-white/20 text-gray-400 hover:text-white hover:bg-white/5 text-sm font-bold uppercase rounded-xl transition"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => {
                      if (validateStep2()) setStep(3);
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold uppercase rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DOCUMENT UPLOAD */}
        {step === 3 && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-6 md:px-8 py-5 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">📎</span>
                  Document Upload
                  <span className="text-xs font-normal text-gray-400 ml-2">Step 2 of 3</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">Upload supporting documents and additional notices</p>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* ড্র্যাগ এন্ড ড্রপ */}
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-10 text-center bg-slate-800/20 hover:bg-slate-800/30 transition cursor-pointer group">
                  <input 
                    type="file" 
                    onChange={(e) => handleFileUpload(e, 'Supporting Doc')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <div className="text-5xl mb-3 group-hover:scale-110 transition">📁</div>
                  <p className="text-base font-bold text-white">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-400 mt-1">Supported: PDF, JPG, PNG (Max 10MB each)</p>
                </div>

                {/* আপলোড করা ফাইল */}
                {docs.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Uploaded Files ({docs.length})</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {docs.map(d => (
                        <div key={d.id} className="bg-slate-800/30 border border-white/10 rounded-xl p-3 flex items-center justify-between group hover:border-white/20 transition">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-xl">📄</span>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white truncate">{d.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-emerald-400 font-bold">{d.type}</span>
                                <span className="text-[10px] text-gray-500">{d.uploadedAt}</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeFile(d.id)}
                            className="text-gray-400 hover:text-red-400 p-1.5 hover:bg-red-400/10 rounded-lg transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ICWA নোটিস সেকশন */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-500/20 p-3 rounded-xl">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                        ICWA Additional Notice
                        <span className="text-[10px] font-normal text-gray-400">(Optional)</span>
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">Upload additional ICWA notices received for the same child</p>
                      <div className="mt-3">
                        <label className="relative inline-block">
                          <input 
                            type="file" 
                            onChange={(e) => handleFileUpload(e, 'Additional Notice')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          />
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/50 border border-white/10 hover:border-amber-500/30 text-white text-sm font-medium rounded-xl transition cursor-pointer">
                            <span>📤</span>
                            Upload Additional Notice
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-6 py-2.5 border border-white/20 text-gray-400 hover:text-white hover:bg-white/5 text-sm font-bold uppercase rounded-xl transition"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => setStep(4)}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold uppercase rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
                  >
                    Review & Submit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {step === 4 && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 px-6 md:px-8 py-5 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">✅</span>
                  Review & Submit
                  <span className="text-xs font-normal text-gray-400 ml-2">Step 3 of 3</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">Please verify all information before submission</p>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* সামারি কার্ড */}
                <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Referral Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm font-semibold text-white">{referralType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reporter</p>
                      <p className="text-sm font-semibold text-white">{reporterName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="text-sm font-semibold text-white">{reporterEmail}</p>
                      <p className="text-sm text-gray-400">{phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tribe</p>
                      <p className="text-sm font-semibold text-white">{addressTribe}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Incident Date</p>
                      <p className="text-sm font-semibold text-white">{incidentDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Documents</p>
                      <p className="text-sm font-semibold text-white">{docs.length} file(s) attached</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-gray-500">Reason</p>
                    <p className="text-sm text-gray-300 bg-slate-900/50 p-3 rounded-xl mt-1.5">{reason}</p>
                  </div>
                </div>

                {/* ডকুমেন্ট লিস্ট */}
                {docs.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Attached Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {docs.map(d => (
                        <span key={d.id} className="bg-slate-800/50 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-white flex items-center gap-2">
                          📄 {d.name}
                          <span className="text-[10px] text-emerald-400">{d.type}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ডিসক্লেইমার */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex items-start gap-4">
                  <input 
                    type="checkbox" 
                    id="disclaimer" 
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 text-emerald-500 border-white/20 rounded bg-slate-800 cursor-pointer focus:ring-2 focus:ring-emerald-500/20" 
                  />
                  <label htmlFor="disclaimer" className="text-sm text-gray-300 select-none leading-relaxed cursor-pointer">
                    <span className="font-bold text-amber-400">⚠️ Disclaimer:</span> I hereby confirm that the incident files and legal declarations stated above are accurate to the best of my knowledge.
                  </label>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
                  <button 
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto px-6 py-2.5 border border-white/20 text-gray-400 hover:text-white hover:bg-white/5 text-sm font-bold uppercase rounded-xl transition"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={!isAgreed}
                    className={`w-full sm:w-auto px-10 py-3 text-white text-sm font-bold uppercase rounded-xl shadow-lg transition transform hover:scale-105 ${
                      isAgreed 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl' 
                        : 'bg-slate-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    📨 Submit Referral
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: SUCCESS */}
        {step === 5 && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden text-center">
              <div className="p-8 md:p-12 space-y-6">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto border border-emerald-500/30 shadow-inner">
                  ✓
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-tight">Referral Submitted!</h2>
                  <p className="text-gray-400">Your referral has been securely lodged and is now under review.</p>
                </div>

                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 inline-block min-w-[320px]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reference Token</p>
                  <p className="font-mono font-black text-blue-400 text-2xl mt-1 select-all">{generatedId}</p>
                  <button 
                    onClick={() => navigator.clipboard?.writeText(generatedId)}
                    className="text-xs text-blue-400 hover:text-blue-300 mt-2 font-semibold"
                  >
                    📋 Copy to clipboard
                  </button>
                </div>

                <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6 text-left max-w-md mx-auto">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📋 What's Next?</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      APS team will review within 2-3 business days
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      Check status anytime using your reference token
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      You will receive email notification on updates
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  {/* <button 
                    onClick={() => alert("Status tracking coming soon")}
                    className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-bold uppercase rounded-xl transition"
                  >
                    🔍 Check Status
                  </button> */}
                  <button 
                    onClick={resetPortal}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold uppercase rounded-xl shadow-lg hover:shadow-xl transition"
                  >
                    📝 New Referral
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ফুটার - ফুল ওয়াইড */}
      <footer className="w-full bg-slate-900/80 backdrop-blur-md border-t border-white/5 px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Red Lake Nation APS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};