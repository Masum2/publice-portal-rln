// PublicPortal/index.tsx

import React, { useState } from 'react';
import { 
  User, 
  Upload,
  ClipboardList,
} from 'lucide-react';

import { ReferralTab } from './ReferralTab';
import { CaseStudyTab } from './CaseStudyTab';
import { DocumentsTab } from './DocumentsTab';
import { SubmitModal } from './SubmitModal';
import { SuccessModal } from './SuccessModal';

import type { CreateCaseStudyRequest, CreateReferralRequest, DocumentFile, Referral } from '../types';
import { useReferral } from '../hooks/useReferral';
import { ErrorAlert } from './ErrorAlert';
import { TabButton } from './TabButton';

interface PublicPortalProps {
  onAddReferral: (referral: Referral) => void;
}

type TabType = 'referral' | 'casestudy' | 'documents';

interface SuccessModalState {
  isOpen: boolean;
  type: 'referral' | 'casestudy' | 'documents' | 'submission';
  title: string;
  message: string;
  details?: {
    id?: string;
    documentCount?: number;
  };
  onContinue?: () => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onAddReferral }) => {
  const [activeTab, setActiveTab] = useState<TabType>('referral');
  const [submitted, setSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  const [successModal, setSuccessModal] = useState<SuccessModalState>({
    isOpen: false,
    type: 'referral',
    title: '',
    message: '',
    details: {},
  });
  
  const { submitReferral, submitCaseStudy, uploadDocuments, isLoading, error, reset: resetApiError } = useReferral();
  const [referralId, setReferralId] = useState<number | null>(null);

  // Get current date and time for defaults
  const getCurrentDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // State for all tabs
  const [referralState, setReferralState] = useState({
    victimFirstName: '',
    victimLastName: '',
    approximateAge: 0,
    victimAddress: '',
    victimPhone: '',
    reporterFirstName: '',
    reporterLastName: '',
    relationship: 'Relative',
    reporterAddress: '',
    reporterCity: '',
    reporterState: 'CA',
    reporterZip: '',
    reporterPhone: '',
    reporterEmail: '',
    organization: '',
    jobTitle: '',
    hasWitnessed: false,
    availableForMoreInfo: false,
    anonymous: false,
    wantsToBeInformed: false,
    incidentAddress: '',
    incidentCity: '',
    incidentState: 'CA',
    incidentCounty: '',
    incidentZip: '',
    incidentCommunity: '',
    incidentComments: '',
  });

  const [caseStudyState, setCaseStudyState] = useState({
    incidentDescription: '',
    incidentLocation: '',
    abuseDuration: '',
    lastSeen: '',
    shortTermMemoryLoss: null as boolean | null,
    hasCausedHarm: null as boolean | null,
    harmDescription: '',
    healthFunctioning: '',
    inDangerOfDeath: null as boolean | null,
    deathDescription: '',
    atRiskOfHarm: null as boolean | null,
    riskDescription: '',
    witnessedIncident: null as boolean | null,
    howBecameAware: '',
    adultKnowsReport: null as boolean | null,
    adultReaction: '',
    familyKnowsReport: null as boolean | null,
    familyMembersKnow: '',
    involvedWithDSS: null as boolean | null,
    dssDescription: '',
    otherReports: null as boolean | null,
    otherReportsDescription: '',
    lawEnforcementInvolved: null as boolean | null,
    lawEnforcementDescription: '',
  });

  const [docs, setDocs] = useState<DocumentFile[]>([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [savedTabs, setSavedTabs] = useState<{ [key: string]: boolean }>({
    referral: false,
    casestudy: false,
    documents: false
  });

  // --- Success Modal Helpers ---
  const showSuccessModal = (
    type: SuccessModalState['type'],
    title: string,
    message: string,
    details?: { id?: string; documentCount?: number },
    onContinue?: () => void
  ): void => {
    setSuccessModal({
      isOpen: true,
      type,
      title,
      message,
      details: details || {},
      onContinue,
    });
  };

  const closeSuccessModal = (): void => {
    setSuccessModal((prev) => ({ ...prev, isOpen: false }));
  };

  // --- File Handler ---
  const handleFileUpload = (fileData: Omit<DocumentFile, 'id' | 'uploadedAt'>): void => {
    setDocs([
      ...docs,
      {
        id: 'doc-' + Date.now(),
        ...fileData,
        uploadedAt: new Date().toLocaleDateString(),
      },
    ]);
  };

  const removeFile = (id: string): void => {
    setDocs(docs.filter((d) => d.id !== id));
  };

  // --- Validation ---
  const validateReferralTab = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!referralState.victimFirstName) newErrors.victimFirstName = "Victim's first name required";
    if (!referralState.victimLastName) newErrors.victimLastName = "Victim's last name required";
    if (!referralState.reporterFirstName) newErrors.reporterFirstName = 'First name required';
    if (!referralState.reporterLastName) newErrors.reporterLastName = 'Last name required';
    if (!referralState.reporterPhone) newErrors.reporterPhone = 'Phone required';
    if (!referralState.reporterEmail) newErrors.reporterEmail = 'Email required';
    if (!referralState.incidentAddress) newErrors.incidentAddress = 'Incident address required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCaseStudyTab = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!caseStudyState.incidentDescription) newErrors.incidentDescription = 'Description required';
    if (!caseStudyState.incidentLocation) newErrors.incidentLocation = 'Location required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Data Preparation Functions ---
  const prepareReferralData = (): CreateReferralRequest => {
    const formatPhone = (phone: string): string => phone.replace(/\D/g, '');
    const formatZip = (zip: string): string => zip.replace(/\D/g, '');

    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    return {
      reporterFirstName: referralState.reporterFirstName || 'John',
      reporterLastName: referralState.reporterLastName || 'Doe',
      reporterAddress: referralState.reporterAddress || '123 Main Street, Apt 4B',
      reporterCity: referralState.reporterCity || 'New York',
      reporterZip: formatZip(referralState.reporterZip) || '10001',
      reporterPhone: formatPhone(referralState.reporterPhone) || '5551234567',
      reporterEmail: referralState.reporterEmail || 'john.doe@example.com',
      reporterOrganization: referralState.organization || 'Community Watch Group',
      reporterJobTitle: referralState.jobTitle || 'Volunteer',
      isReporterAvailableForMoreInfo: referralState.availableForMoreInfo || true,
      isReporterWantsTobeAnonomyous: referralState.anonymous || false,
      isReporterInterestedInUpdates: referralState.wantsToBeInformed || true,
      hasReporterWitnessed: referralState.hasWitnessed || true,
      address: referralState.incidentAddress || '456 Elm Street',
      city: referralState.incidentCity || 'New York',
      zip: formatZip(referralState.incidentZip) || '10002',
      reportDate: currentDate,
      reportTime: currentTime,
      reportingMethod: 'Electronically',
      reportingSource: 2,
      isAdultAbuseBeingReported: true,
      comments: referralState.incidentComments || 'Observed severe neglect and poor living conditions.',
      aps_ClientId: 1,
      reporterGenderLookupId: 1,
      reporterStateLookupId: 32,
      apS_ReporterRelationshipLookupId: 4,
      stateLookupId: 32,
      countyLookupId: 5,
      submitById: 105,
      isSubmitted: false,
      decision: 0,
      preferredInformingMethod: 1,
      nickName: `${referralState.reporterFirstName || 'John'} ${referralState.reporterLastName || 'Doe'}`.trim() || 'John Doe',
      
      // Victim Details
      victimFirstName: referralState.victimFirstName || '',
      victimLastName: referralState.victimLastName || '',
      approximateAge: Number(referralState.approximateAge) || 0,
      victimAddress: referralState.victimAddress || '',
      phone: formatPhone(referralState.victimPhone) || '',

      // Required Audit Fields to prevent 400 Bad Request
      CreatedBy: 105,
      CreatedOn: new Date().toISOString(),
      RecordedBy: 105,
    };
  };

 const prepareCaseStudyData = (): CreateCaseStudyRequest => {
    return {
      incidentLocation: caseStudyState.incidentLocation || '',
      incidentDesc: caseStudyState.incidentDescription || '',
      abuseNeglectOrExploitationDesc: caseStudyState.incidentDescription || '',
      lengthOfAbuse: caseStudyState.abuseDuration || '',
      healthFunctioning: caseStudyState.healthFunctioning || '',
      lastSeenOn: caseStudyState.lastSeen || '',
      causedHarm: caseStudyState.hasCausedHarm || false,
      causedHarmDesc: caseStudyState.harmDescription || '',
      isInDangerOfDeath: caseStudyState.inDangerOfDeath || false,
      dangerOfDeathDesc: caseStudyState.deathDescription || '',
      isInRiskOfHarm: caseStudyState.atRiskOfHarm || false,
      riskOfIrreparableHarm: caseStudyState.riskDescription || '',
      hasWitnessed: caseStudyState.witnessedIncident || false,
      notWitnessedDesc: caseStudyState.howBecameAware || '',
      adultKnowsAboutReport: caseStudyState.adultKnowsReport || false,
      adultReactionOnReport: caseStudyState.adultReaction || '',
      familyKnowsAboutReport: caseStudyState.familyKnowsReport || false,
      whoKnowsInFamilyDesc: caseStudyState.familyMembersKnow || '',
      hasInvolvedWithDDS: caseStudyState.involvedWithDSS || false,
      involvementWithDDSDesc: caseStudyState.dssDescription || '',
      othersReporters: caseStudyState.otherReports || false,
      othersReportersDesc: caseStudyState.otherReportsDescription || '',
      hasPoliceInvoled: caseStudyState.lawEnforcementInvolved || false,
      lawEnforementDesc: caseStudyState.lawEnforcementDescription || '',
      directionsToCurrentLocation: '',
      isSubmitted: false,
      publicReferralId: referralId || 0,

      // এই অডিট ফিল্ডগুলো যোগ করতে হবে (যা সার্ভার ভ্যালিডেশনে চাচ্ছে)
      CreatedBy: 105,
      CreatedOn: new Date().toISOString(),
      RecordedBy: 105,
    };
  };

  // --- Save Referral Tab ---
  const saveReferralTab = async (): Promise<void> => {
    if (!validateReferralTab()) {
      alert('⚠️ Please fill in all required fields before saving.');
      return;
    }

    const cleanPhone = referralState.reporterPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      alert('⚠️ Phone number must be exactly 10 digits. Please enter a valid phone number.');
      return;
    }

    try {
      const referralData = prepareReferralData();
      const response = await submitReferral(referralData);

      if (response && response.isSuccess) {
        let newReferralId: number | null = null;
        
        if (typeof response.data === 'number') {
          newReferralId = response.data;
        } else if (typeof response.data === 'string') {
          newReferralId = parseInt(response.data);
        } else if (response.data && typeof response.data === 'object') {
          if ('id' in response.data) {
            newReferralId = parseInt(String((response.data as any).id));
          } else if ('Data' in response.data) {
            newReferralId = parseInt(String((response.data as any).Data));
          } else if ('referralId' in response.data) {
            newReferralId = parseInt(String((response.data as any).referralId));
          } else if ('publicReferralId' in response.data) {
            newReferralId = parseInt(String((response.data as any).publicReferralId));
          }
        }
        
        if (newReferralId) {
          setReferralId(newReferralId);
        } else {
          throw new Error('Could not extract Referral ID from response');
        }
        
        setSavedTabs((prev) => ({ ...prev, referral: true }));
        
        const updatedReferral: Referral = {
          id: String(newReferralId || ''),
          ...referralState,
          ...caseStudyState,
          status: 'Draft',
          submittedAt: new Date().toISOString(),
          reviewStartedAt: null,
          acceptedAt: null,
          rejectedAt: null,
          linkedClientId: null,
          documents: docs,
          hasCausedHarm: caseStudyState.hasCausedHarm || false,
          harmDescription: caseStudyState.harmDescription || '',
          healthFunctioning: caseStudyState.healthFunctioning || '',
          inDangerOfDeath: caseStudyState.inDangerOfDeath || false,
          deathDescription: caseStudyState.deathDescription || '',
          atRiskOfHarm: caseStudyState.atRiskOfHarm || false,
          riskDescription: caseStudyState.riskDescription || '',
          witnessedIncident: caseStudyState.witnessedIncident || false,
          howBecameAware: caseStudyState.howBecameAware || '',
          adultKnowsReport: caseStudyState.adultKnowsReport || false,
          adultReaction: caseStudyState.adultReaction || '',
          familyKnowsReport: caseStudyState.familyKnowsReport || false,
          familyMembersKnow: caseStudyState.familyMembersKnow || '',
          involvedWithDSS: caseStudyState.involvedWithDSS || false,
          dssDescription: caseStudyState.dssDescription || '',
          otherReports: caseStudyState.otherReports || false,
          otherReportsDescription: caseStudyState.otherReportsDescription || '',
          lawEnforcementInvolved: caseStudyState.lawEnforcementInvolved || false,
          lawEnforcementDescription: caseStudyState.lawEnforcementDescription || '',
        };
        
        onAddReferral(updatedReferral);

        showSuccessModal(
          'referral',
          '✅ Referral Information Saved!',
          'Your referral information has been successfully submitted to the system.',
          { id: newReferralId ? `#${newReferralId}` : undefined },
          () => {
            setActiveTab('casestudy');
          }
        );
      } else {
        throw new Error(response?.message || 'Failed to save referral');
      }
    } catch (error) {
      console.error('Save referral error:', error);
      alert(`❌ Failed to save referral: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // --- Save Case Study Tab ---
  const saveCaseStudyTab = async (): Promise<void> => {
    if (!validateCaseStudyTab()) {
      alert('⚠️ Please fill in all required fields before saving.');
      return;
    }

    if (!referralId) {
      alert('⚠️ Please save the Referral Information first before saving Case Study.');
      return;
    }

    try {
      const caseStudyData = prepareCaseStudyData();
      const response = await submitCaseStudy(caseStudyData);

      if (response.isSuccess) {
        setSavedTabs((prev) => ({ ...prev, casestudy: true }));
        
        showSuccessModal(
          'casestudy',
          '📋 Case Study Saved Successfully!',
          'Your case study information has been successfully submitted to the system.',
          { id: response.data ? `#${response.data}` : undefined },
          () => {
            setActiveTab('documents');
          }
        );
      } else {
        throw new Error(response.message || 'Failed to save case study');
      }
    } catch (error) {
      console.error('Save case study error:', error);
      alert(`❌ Failed to save case study: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // --- Save Documents Tab (Backend API Integration Added) ---
// PublicPortal/index.tsx - saveDocumentsTab ফাংশন

// ✅ Save Documents Tab - Hardcoded Referral ID 8 ব্যবহার করুন
// PublicPortal/index.tsx - saveDocumentsTab ফাংশন

const saveDocumentsTab = async (): Promise<void> => {
  // ✅ Dynamic Referral ID ব্যবহার করুন
  const currentReferralId = referralId;
  
  console.log('📌 Using referral ID:', currentReferralId);

  if (!currentReferralId) {
    alert('⚠️ No referral ID available. Please save the Referral Info tab first.');
    return;
  }

  if (docs.length === 0) {
    alert('⚠️ Please add at least one document before saving.');
    return;
  }

  // ✅ প্রতিটি ডকুমেন্টে file আছে কিনা চেক করুন
  const invalidDocs = docs.filter(d => !d.file || !(d.file instanceof File));
  if (invalidDocs.length > 0) {
    console.error('❌ Invalid documents found:', invalidDocs.map(d => d.fileName));
    alert(`⚠️ ${invalidDocs.length} document(s) have no file object. Please remove them and re-add.`);
    return;
  }

  try {
    console.log('📤 Saving documents with Referral ID:', currentReferralId);
    console.log('📄 Documents to upload:', docs.length);
    
    // ✅ Dynamic ID দিয়ে ডকুমেন্ট আপলোড করুন
    const response = await uploadDocuments(docs, currentReferralId);

    if (response.isSuccess) {
      setSavedTabs((prev) => ({ ...prev, documents: true }));
      
      showSuccessModal(
        'documents',
        '📎 Documents Saved Successfully!',
        `${docs.length} document(s) have been successfully uploaded and saved.`,
        { documentCount: docs.length }
      );
    } else {
      throw new Error(response.message || 'Failed to upload documents');
    }
  } catch (error) {
    console.error('❌ Save documents error:', error);
    alert(`❌ Failed to save documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

  const handleSubmit = async (): Promise<void> => {
    if (!isAgreed) {
      alert('⚠️ Please agree to the disclaimer before submitting.');
      return;
    }

    if (!savedTabs.referral || !savedTabs.casestudy || !savedTabs.documents) {
      alert('⚠️ Please save all sections before submitting the referral.');
      return;
    }

    const trackingId = 'APS-2026-' + Math.floor(100000 + Math.random() * 900000);
    const referralData: Referral = {
      id: trackingId,
      ...referralState,
      ...caseStudyState,
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      reviewStartedAt: null,
      acceptedAt: null,
      rejectedAt: null,
      linkedClientId: null,
      documents: docs,
      hasCausedHarm: caseStudyState.hasCausedHarm || false,
      harmDescription: caseStudyState.harmDescription || '',
      healthFunctioning: caseStudyState.healthFunctioning || '',
      inDangerOfDeath: caseStudyState.inDangerOfDeath || false,
      deathDescription: caseStudyState.deathDescription || '',
      atRiskOfHarm: caseStudyState.atRiskOfHarm || false,
      riskDescription: caseStudyState.riskDescription || '',
      witnessedIncident: caseStudyState.witnessedIncident || false,
      howBecameAware: caseStudyState.howBecameAware || '',
      adultKnowsReport: caseStudyState.adultKnowsReport || false,
      adultReaction: caseStudyState.adultReaction || '',
      familyKnowsReport: caseStudyState.familyKnowsReport || false,
      familyMembersKnow: caseStudyState.familyMembersKnow || '',
      involvedWithDSS: caseStudyState.involvedWithDSS || false,
      dssDescription: caseStudyState.dssDescription || '',
      otherReports: caseStudyState.otherReports || false,
      otherReportsDescription: caseStudyState.otherReportsDescription || '',
      lawEnforcementInvolved: caseStudyState.lawEnforcementInvolved || false,
      lawEnforcementDescription: caseStudyState.lawEnforcementDescription || '',
    };

    onAddReferral(referralData);
    setGeneratedId(trackingId);
    setShowSubmitModal(false);
    
    showSuccessModal(
      'submission',
      '🎉 Referral Submitted Successfully!',
      'Your referral has been securely lodged. Please save the reference token for future tracking.',
      { id: trackingId }
    );
  };

  const resetForm = (): void => {
    window.location.reload();
  };

  const handleModalContinue = (): void => {
    if (successModal.onContinue) {
      successModal.onContinue();
    }
    closeSuccessModal();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-sky-50/40 to-indigo-50/30">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-br from-slate-900/95 via-blue-950/90 to-slate-900/95 backdrop-blur-sm px-6 md:px-12 py-4 border-b border-gray-200/20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <img 
                src="https://www.beratensoftware.com/Images/Logos/BeratenLogo.svg" 
                alt="Beraten Logo" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-[10px] text-white font-bold tracking-widest uppercase -mt-0.5">
                Adult & Family Protective Services
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex text-[10px] font-extrabold bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full border border-emerald-200 uppercase tracking-widest">
              🔒 SECURE PORTAL
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col items-center p-4 md:p-8 w-full">
        <div className="w-full max-w-5xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 mb-6">
            <TabButton
              isActive={activeTab === 'referral'}
              onClick={() => setActiveTab('referral')}
              icon={<User className="w-4 h-4" />}
              label="Referral Info"
              isSaved={savedTabs.referral}
            />
            <TabButton
              isActive={activeTab === 'casestudy'}
              onClick={() => setActiveTab('casestudy')}
              icon={<ClipboardList className="w-4 h-4" />}
              label="Case Study"
              isSaved={savedTabs.casestudy}
            />
            <TabButton
              isActive={activeTab === 'documents'}
              onClick={() => setActiveTab('documents')}
              icon={<Upload className="w-4 h-4" />}
              label="Documents"
              isSaved={savedTabs.documents}
            />
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {error && (
                <ErrorAlert error={error} onDismiss={resetApiError} />
              )}
              
              {activeTab === 'referral' && (
                <ReferralTab
                  state={referralState}
                  setState={setReferralState}
                  errors={errors}
                  isLoading={isLoading}
                  onSave={saveReferralTab}
                />
              )}
              
              {activeTab === 'casestudy' && (
                <CaseStudyTab
                  state={caseStudyState}
                  setState={setCaseStudyState}
                  errors={errors}
                  isLoading={isLoading}
                  referralId={referralId}
                  isReferralSaved={savedTabs.referral}
                  onSave={saveCaseStudyTab}
                />
              )}
              
{activeTab === 'documents' && (
  <DocumentsTab
    docs={docs}
    onFileUpload={handleFileUpload}
    onRemoveFile={removeFile}
    onSave={saveDocumentsTab}
    isReferralSaved={savedTabs.referral}
    publicReferralId={referralId || undefined}  // ✅ Dynamic ID
    referralId={referralId || undefined}        // ✅ Dynamic ID
  />
)}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative w-full bg-white/80 backdrop-blur-md border-t border-gray-200 px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 Red Lake Nation APS. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SubmitModal
        isOpen={showSubmitModal}
        onClose={() => {
          setShowSubmitModal(false);
          resetApiError();
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isAgreed={isAgreed}
        setIsAgreed={setIsAgreed}
        error={error}
        reporterName={`${referralState.reporterFirstName} ${referralState.reporterLastName}`}
        incidentDate={getCurrentDate()}
        documentCount={docs.length}
        savedTabs={savedTabs}
      />

      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => {
          if (successModal.onContinue) {
            successModal.onContinue();
          }
          closeSuccessModal();
        }}
        type={successModal.type}
        title={successModal.title}
        message={successModal.message}
        details={successModal.details}
        onContinue={handleModalContinue}
      />

      {/* Final Submission Success Screen */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-5xl mx-auto shadow-lg border-4 border-emerald-200">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-6">Referral Submitted!</h2>
            <p className="text-gray-500 mt-2">Your referral has been securely lodged.</p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-4">
              <p className="text-xs text-gray-500 font-medium">Reference Token</p>
              <p className="font-mono font-bold text-blue-600 text-lg tracking-wider">{generatedId}</p>
              <p className="text-[10px] text-gray-400 mt-1">Please save this token for future reference</p>
            </div>
            <button 
              onClick={resetForm} 
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold uppercase rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              New Referral
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicPortal;