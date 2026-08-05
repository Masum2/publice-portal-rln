// components/PublicPortal/index.tsx
import React, { useState, useEffect } from 'react';
import { User, Upload, ClipboardList } from 'lucide-react';

import { ReferralTab } from './ReferralTab';
import { CaseStudyTab } from './CaseStudyTab';
import { DocumentsTab } from './DocumentsTab';
import { SubmitModal } from './SubmitModal';
import { SuccessModal } from './SuccessModal';
import { ErrorAlert } from './ErrorAlert';
import { TabButton } from './TabButton';

import type {
  CreateCaseStudyRequest,
  CreateReferralRequest,
  DocumentFile,
  Referral,
} from '../types';

import type { CaseStudyTabErrors } from '../types/CaseStudyTab/types';
import type { ReferralTabErrors } from '../types/ReferralTab/types';
import { useReferral } from '../hooks/useReferral';

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
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
const [existingCaseStudy, setExistingCaseStudy] = useState<any>(null); 

  const [successModal, setSuccessModal] = useState<SuccessModalState>({
    isOpen: false,
    type: 'referral',
    title: '',
    message: '',
    details: {},
  });

  const {
    createReferral,
    getReferral,
    updateReferral,
    createCaseStudy,
     getCaseStudy,       
  updateCaseStudy, 
    uploadDocuments,
    isLoading,
    error,
    reset: resetApiError,
  } = useReferral();

  const [referralId, setReferralId] = useState<number | null>(null);
  const [referralDataLoaded, setReferralDataLoaded] = useState(false);

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

  const [referralState, setReferralState] = useState({
    victimFirstName: '',
    victimLastName: '',
    approximateAge: 0,
    victimAddress: '',
    victimPhone: '',
    reporterFirstName: '',
    reporterLastName: '',
    relationship: '',
    reporterAddress: '',
    reporterCity: '',
    reporterState: '',
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
    incidentState: '',
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
  const [errors, setErrors] = useState<ReferralTabErrors>({});
  const [caseStudyErrors, setCaseStudyErrors] = useState<CaseStudyTabErrors>({});
  const [savedTabs, setSavedTabs] = useState<{ [key: string]: boolean }>({
    referral: false,
    casestudy: false,
    documents: false,
  });


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('referralId');
    if (id) {
      setIsEditing(true);
      setReferralId(Number(id));
      fetchReferralData(Number(id));
    }
  }, []);



const fetchReferralData = async (id: number) => {
  try {
    setIsSaving(true);
    const response = await getReferral(id);
    
    if (response.isSuccess && response.data) {
      const data = response.data;
      console.log('✅ Fetched referral data:', data);

 setReferralState({
  victimFirstName: data.VictimFirstName || '',
  victimLastName: data.VictimLastName || '',
  approximateAge: data.ApproximateAge || 0,
  victimAddress: data.VictimAddress || '',
  victimPhone: data.Phone || '', // রেসপন্সে এটি 'Phone' আছে
  reporterFirstName: data.ReporterFirstName || '',
  reporterLastName: data.ReporterLastName || '',
  relationship: data.APS_ReporterRelationshipLookupId ? 
    getRelationshipText(data.APS_ReporterRelationshipLookupId) : '',
  reporterAddress: data.ReporterAddress || '',
  reporterCity: data.ReporterCity || '',
  reporterState: data.ReporterStateLookupId ? 
    getStateText(data.ReporterStateLookupId) : '',
  reporterZip: data.ReporterZip || '',
  reporterPhone: data.ReporterPhone || '',
  reporterEmail: data.ReporterEmail || '',
  organization: data.ReporterOrganization || '',
  jobTitle: data.ReporterJobTitle || '',
  
  // ✅ ফিক্সড চেকবাক্স ম্যাপিং (ব্যাকএন্ডের সঠিক প্রপার্টি নাম অনুযায়ী)
  hasWitnessed: Boolean(data.HasReporterWitnessed),
  availableForMoreInfo: Boolean(data.IsReporterAvailableForMoreInfo),
  anonymous: Boolean(data.IsReporterWantsTobeAnonomyous), // অবজেক্টে বানান 'IsReporterWantsTobeAnonomyous'
  wantsToBeInformed: Boolean(data.IsReporterInterestedInUpdates),

  incidentAddress: data.Address || '',
  incidentCity: data.City || '',
  incidentState: data.StateLookupId ? 
    getStateText(data.StateLookupId) : '',
  incidentCounty: data.CountyLookupId ? 
    getCountyText(data.CountyLookupId) : '',
  incidentZip: data.Zip || '',
  incidentCommunity: data.CommunityLookupId ? 
    getCommunityText(data.CommunityLookupId) : '',
  incidentComments: data.Comments || '',
});


      try {
     const caseStudyResponse = await getCaseStudy(id);

if (caseStudyResponse.isSuccess) {
    const caseData = caseStudyResponse.data;

    setExistingCaseStudy(caseData);

setCaseStudyState({
      incidentDescription: caseData.IncidentDesc || '',
      incidentLocation: caseData.IncidentLocation || '',
      abuseDuration: caseData.LengthOfAbuse || '',
      lastSeen: caseData.LastSeenOn || '',
      shortTermMemoryLoss: Boolean(caseData.ShortTermMemoryLoss), // ব্যাকএন্ডে এটি 0/1 আছে
      hasCausedHarm: Boolean(caseData.CausedHarm), // ব্যাকএন্ডে এটি true/false
      harmDescription: caseData.CausedHarmDesc || '',
      healthFunctioning: caseData.HealthFunctioning || '',
      inDangerOfDeath: Boolean(caseData.IsInDangerOfDeath),
      deathDescription: caseData.DangerOfDeathDesc || '',
      atRiskOfHarm: Boolean(caseData.IsInRiskOfHarm),
      riskDescription: caseData.RiskOfIrreparableHarm || '', // আপনার কোডে caseData.RiskOfIrreparableHarm ছিল, যা সঠিক
      witnessedIncident: Boolean(caseData.HasWitnessed),
      howBecameAware: caseData.NotWitnessedDesc || '',
      adultKnowsReport: Boolean(caseData.AdultKnowsAboutReport),
      adultReaction: caseData.AdultReactionOnReport || '',
      familyKnowsReport: Boolean(caseData.FamilyKnowsAboutReport),
      familyMembersKnow: caseData.WhoKnowsInFamilyDesc || '',
      involvedWithDSS: Boolean(caseData.HasInvolvedWithDDS),
      dssDescription: caseData.InvolvementWithDDSDesc || '',
      otherReports: Boolean(caseData.OthersReporters), // ব্যাকএন্ডে এটি true/false
      otherReportsDescription: caseData.OthersReportersDesc || '',
      lawEnforcementInvolved: Boolean(caseData.HasPoliceInvoled), // ব্যাকএন্ডে বানান 'HasPoliceInvoled'
      lawEnforcementDescription: caseData.LawEnforementDesc || '', // ব্যাকএন্ডে বানান 'LawEnforementDesc' (এনফোর্সমেন্টে 'c' নেই)
    });
}
      } catch (caseError) {
        console.log('Error fetching case study:', caseError);
        setExistingCaseStudy(null);
      }
      
      setSavedTabs({ referral: true, casestudy: true, documents: true });
      setReferralId(id);
      setReferralDataLoaded(true);
    }
  } catch (error) {
    console.error('❌ Failed to fetch referral:', error);
  } finally {
    setIsSaving(false);
  }
};


const getRelationshipText = (id: number): string => {
  const map: { [key: number]: string } = {
    4: 'Relative',
    5: 'Friend',
    6: 'Staff in Licensed Facility',
    7: 'Home Health Staff',
    8: 'Other'
  };
  return map[id] || '';
};


const getStateText = (id: number): string => {
  const states = [
    'Minnesota', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];
  return states[id - 1] || '';
};

const getCountyText = (id: number): string => {
  const counties = [
    'Beltrami County', 'Clearwater', 'Aitkin', 'Anoka', 'Becker', 'Benton',
    'Big Stone', 'Blue Earth', 'Brown', 'Carver', 'Carlton', 'Cass',
    'Chippewa', 'Chisago', 'Clay', 'Cottonwood', 'Crow Wing', 'Dakota',
    'Dodge', 'Douglas', 'Faribault', 'Fillmore', 'Freeborn', 'Goodhue',
    'Grant', 'Hennepin', 'Houston', 'Hubbard', 'Isanti', 'Itasca',
    'Jackson', 'Kanabec', 'Kandiyohi', 'Kittson', 'Koochiching',
    'Lac qui Parle', 'Lake', 'Lake of the Woods', 'Le Sueur', 'Lincoln',
    'Mahnomen', 'Marshall', 'Martin', 'McLeod', 'Meeker', 'Mille Lacs',
    'Morrison', 'Mower', 'Murray', 'Nicollet', 'Nobles', 'Norman',
    'Olmsted', 'Otter Tail', 'Pennington', 'Pine', 'Pipestone', 'Polk',
    'Pope', 'Ramsey', 'Red Lake', 'Redwood', 'Renville', 'Rice', 'Rock',
    'Roseau', 'St. Louis', 'Scott', 'Sherburne', 'Sibley', 'Stearns',
    'Steele', 'Stevens', 'Swift', 'Todd', 'Traverse', 'Wabasha', 'Wadena',
    'Waseca', 'Washington', 'Wilkin', 'Winona', 'Wright', 'Yellow Medicine',
    'Cook'
  ];
  return counties[id - 1] || '';
};


const getCommunityText = (id: number): string => {
  const communities = ['Redby', 'Red Lake', 'Little Rock', 'Ponemah', 'Other', 'Unknown'];
  return communities[id - 1] || '';
};
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
    const newErrors: ReferralTabErrors = {};

    if (!referralState.victimFirstName?.trim()) {
      newErrors.victimFirstName = "Victim's first name is required";
    }
    if (!referralState.victimLastName?.trim()) {
      newErrors.victimLastName = "Victim's last name is required";
    }
    if (!referralState.reporterFirstName?.trim()) {
      newErrors.reporterFirstName = 'Reporter first name is required';
    }
    if (!referralState.reporterLastName?.trim()) {
      newErrors.reporterLastName = 'Reporter last name is required';
    }
    if (!referralState.relationship) {
      newErrors.relationship = 'Please select a relationship with the adult';
    }

    const cleanPhone = referralState.reporterPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.reporterPhone = 'Reporter phone number is required';
    } else if (cleanPhone.length !== 10) {
      newErrors.reporterPhone = 'Phone number must be exactly 10 digits';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!referralState.reporterEmail) {
      newErrors.reporterEmail = 'Reporter email is required';
    } else if (!emailRegex.test(referralState.reporterEmail)) {
      newErrors.reporterEmail = 'Please enter a valid email address';
    }

    if (!referralState.incidentAddress?.trim()) {
      newErrors.incidentAddress = 'Incident address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCaseStudyTab = (): boolean => {
    const newErrors: CaseStudyTabErrors = {};

    if (!caseStudyState.incidentDescription?.trim()) {
      newErrors.incidentDescription = 'Incident description is required';
    }
    if (!caseStudyState.incidentLocation?.trim()) {
      newErrors.incidentLocation = 'Incident location is required';
    }

    if (caseStudyState.hasCausedHarm === null || caseStudyState.hasCausedHarm === undefined) {
      newErrors.hasCausedHarm = 'Please select Yes, No, or Unknown';
    }
    if (caseStudyState.inDangerOfDeath === null || caseStudyState.inDangerOfDeath === undefined) {
      newErrors.inDangerOfDeath = 'Please select Yes, No, or Unknown';
    }
    if (caseStudyState.atRiskOfHarm === null || caseStudyState.atRiskOfHarm === undefined) {
      newErrors.atRiskOfHarm = 'Please select Yes, No, or Unknown';
    }
    if (caseStudyState.witnessedIncident === null || caseStudyState.witnessedIncident === undefined) {
      newErrors.witnessedIncident = 'Please select Yes, No, or Unknown';
    }
    if (caseStudyState.adultKnowsReport === null || caseStudyState.adultKnowsReport === undefined) {
      newErrors.adultKnowsReport = 'Please select Yes, No, or Unknown';
    }
    if (caseStudyState.familyKnowsReport === null || caseStudyState.familyKnowsReport === undefined) {
      newErrors.familyKnowsReport = 'Please select Yes, No, or Unknown';
    }
    if (caseStudyState.involvedWithDSS === null || caseStudyState.involvedWithDSS === undefined) {
      newErrors.involvedWithDSS = 'Please select Yes, No, or Unknown';
    }
    if (caseStudyState.otherReports === null || caseStudyState.otherReports === undefined) {
      newErrors.otherReports = 'Please select Yes, No, or Unknown';
    }
    if (
      caseStudyState.lawEnforcementInvolved === null ||
      caseStudyState.lawEnforcementInvolved === undefined
    ) {
      newErrors.lawEnforcementInvolved = 'Please select Yes, No, or Unknown';
    }

    setCaseStudyErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const prepareReferralData = (): CreateReferralRequest => {
  const formatPhone = (phone: string): string => phone.replace(/\D/g, '');
  const formatZip = (zip: string): string => zip.replace(/\D/g, '');

  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();

  const data: CreateReferralRequest = {
    reporterFirstName: referralState.reporterFirstName || 'John',
    reporterLastName: referralState.reporterLastName || 'Doe',
    reporterAddress: referralState.reporterAddress || '123 Main Street, Apt 4B',
    reporterCity: referralState.reporterCity || 'New York',
    reporterZip: formatZip(referralState.reporterZip) || '10001',
    reporterPhone: formatPhone(referralState.reporterPhone) || '5551234567',
    reporterEmail: referralState.reporterEmail || 'john.doe@example.com',
    reporterOrganization: referralState.organization || 'Community Watch Group',
    reporterJobTitle: referralState.jobTitle || 'Volunteer',
    isReporterWantsTobeAnonomyous: referralState.anonymous,
isReporterAvailableForMoreInfo: referralState.availableForMoreInfo,
isReporterInterestedInUpdates: referralState.wantsToBeInformed,
hasReporterWitnessed: referralState.hasWitnessed,


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
    victimFirstName: referralState.victimFirstName || '',
    victimLastName: referralState.victimLastName || '',
    approximateAge: Number(referralState.approximateAge) || 0,
    victimAddress: referralState.victimAddress || '',
    phone: formatPhone(referralState.victimPhone) || '',
    CreatedBy: 105,
    CreatedOn: new Date().toISOString(),
    RecordedBy: 105,
  };

  if (isEditing && referralId) {
    data.Id = referralId;
  }

  return data;
};



const prepareCaseStudyData = (): CreateCaseStudyRequest => {
  const data: CreateCaseStudyRequest = {
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
    CreatedBy: 105,
    CreatedOn: new Date().toISOString(),
    RecordedBy: 105,
  };

  return data;
};


const saveReferralTab = async (): Promise<void> => {
  setErrors({});

  if (!validateReferralTab()) {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return;
  }

  try {
    setIsSaving(true);
    const referralData = prepareReferralData();
    let response;

    if (isEditing && referralId) {
      // ✅ UPDATE - PUT
      console.log('🔄 Updating existing referral ID:', referralId);
      console.log('📤 Update Data:', referralData);
      
     
      const updateData = {
        ...referralData,
        Id: referralId,
      };
      
      response = await updateReferral(referralId, updateData);
      
      if (response && response.isSuccess) {
        setSavedTabs((prev) => ({ ...prev, referral: true }));
        await fetchReferralData(referralId);
        
        showSuccessModal(
          'referral',
          '✅ Referral Information Updated!',
          'Your referral information has been successfully updated.',
          { id: `#${referralId}` },
          () => setActiveTab('casestudy')
        );
      }
    } else {
      // ✅ CREATE - POST
      console.log('📝 Creating new referral');
      response = await createReferral(referralData);

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
          }
        }

        if (newReferralId) {
          setReferralId(newReferralId);
          
          const url = new URL(window.location.href);
          url.searchParams.set('referralId', String(newReferralId));
          window.history.replaceState({}, '', url.toString());
          
          await (newReferralId);
          setIsEditing(true);
          setSavedTabs((prev) => ({ ...prev, referral: true }));
          
          showSuccessModal(
            'referral',
            '✅ Referral Information Saved!',
            'Your referral information has been successfully submitted to the system.',
            { id: `#${newReferralId}` },
            () => setActiveTab('casestudy')
          );
        } else {
          throw new Error('Could not extract Referral ID from response');
        }
      } else {
        throw new Error(response?.message || 'Failed to save referral');
      }
    }
  } catch (error) {
    console.error('Save referral error:', error);
    setErrors((prev) => ({
      ...prev,
      _form: `Failed to ${isEditing ? 'update' : 'save'} referral: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    }));
  } finally {
    setIsSaving(false);
  }
};



const saveCaseStudyTab = async (): Promise<void> => {
  setCaseStudyErrors({});

  if (!validateCaseStudyTab()) {
    const firstErrorField = Object.keys(caseStudyErrors)[0];
    if (firstErrorField) {
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return;
  }

  if (!referralId) {
    setCaseStudyErrors({
      _form: 'Please save the Referral Information first before saving Case Study.',
    });
    return;
  }

  try {
    setIsSaving(true);
    const caseStudyData = prepareCaseStudyData();
    let response;

    const hasExisting = existingCaseStudy !== null;

    console.log('📌 Has existing case study:', hasExisting);
    console.log('📌 Is editing mode:', isEditing);
    console.log('📌 Referral ID:', referralId);
    console.log('📌 existingCaseStudy:', existingCaseStudy);

    if (hasExisting && isEditing) {
      // ✅ কেস স্টাডির নিজস্ব আইডি বের করুন (সার্ভার যে ফিল্ডে দেয়)
      const caseStudyId = existingCaseStudy.Id || existingCaseStudy.id || existingCaseStudy.caseStudyId;
      
      if (!caseStudyId) {
        console.error('❌ No case study ID found in existingCaseStudy');
        // আইডি না থাকলে নতুন তৈরি করুন
        const createData = {
          ...caseStudyData,
          publicReferralId: Number(referralId),
        };
        response = await createCaseStudy(createData);
      } else {
        console.log('🔄 Updating case study with ID:', caseStudyId);
        
        // ✅ আপডেট ডাটা তৈরি করুন (কেস স্টাডির আইডি যোগ করুন)
        const updateData = {
          ...caseStudyData,
          id: Number(caseStudyId),
          publicReferralId: Number(referralId),
        };
        
        console.log('📤 Update Data:', JSON.stringify(updateData, null, 2));
        
        // ✅ কেস স্টাডির আইডি দিয়ে PUT কল করুন
        response = await updateCaseStudy(caseStudyId, updateData);
      }
    } else {
      // ✅ CREATE - POST
      console.log('📝 Creating new case study');
      const createData = {
        ...caseStudyData,
        publicReferralId: Number(referralId),
      };
      response = await createCaseStudy(createData);
    }

    if (response && response.isSuccess) {
      setSavedTabs((prev) => ({ ...prev, casestudy: true }));
      await fetchReferralData(referralId);

      showSuccessModal(
        'casestudy',
        hasExisting && isEditing ? '📋 Case Study Updated!' : '📋 Case Study Saved!',
        hasExisting && isEditing 
          ? 'Your case study information has been successfully updated.'
          : 'Your case study information has been successfully saved.',
        { id: `#${referralId}` },
        () => {
          setActiveTab('documents');
        }
      );
    } else {
      throw new Error(response?.message || 'Failed to save case study');
    }
  } catch (error) {
    console.error('Save case study error:', error);
    setCaseStudyErrors((prev) => ({
      ...prev,
      _form: `Failed to save case study: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }));
  } finally {
    setIsSaving(false);
  }
};
  // --- Save Documents ---


  // --- Handle Submit ---
  const handleSubmit = async (): Promise<void> => {
    if (!isAgreed) {
      setErrors({
        _form: 'Please agree to the disclaimer before submitting.',
      });
      return;
    }

    if (!savedTabs.referral || !savedTabs.casestudy || !savedTabs.documents) {
      setErrors({
        _form: 'Please save all sections (Referral Info, Case Study, and Documents) before submitting.',
      });
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
      referralId: '',
      publicReferralId: ''
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

    setSubmitted(true);
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

  // --- Render Form Error ---
  const renderFormError = (errorMessage?: string): React.ReactNode => {
    if (!errorMessage) return null;

    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3 animate-in slide-in-from-top duration-300">
        <span className="text-red-500 text-lg">⚠️</span>
        <p className="text-sm text-red-700 flex-1">{errorMessage}</p>
        <button
          onClick={() => {
            setErrors((prev) => ({ ...prev, _form: '' }));
            setCaseStudyErrors((prev) => ({ ...prev, _form: '' }));
          }}
          className="text-red-400 hover:text-red-600 transition text-lg"
        >
          ×
        </button>
      </div>
    );
  };

  const isLoadingState = isLoading || isSaving;

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
          {/* Editing Mode Indicator */}
          {isEditing && referralDataLoaded && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 flex items-center gap-3">
              <span className="text-blue-600 text-lg">✏️</span>
              <p className="text-sm text-blue-700">
                <strong>Editing Mode:</strong>
              </p>
            </div>
          )}

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
              {error && <ErrorAlert error={error} onDismiss={resetApiError} />}

              {errors._form && renderFormError(errors._form)}
              {caseStudyErrors._form && renderFormError(caseStudyErrors._form)}

              {activeTab === 'referral' && (
                <ReferralTab
                  state={referralState}
                  setState={setReferralState}
                  errors={errors}
                  setErrors={setErrors}
                  isLoading={isLoadingState}
                  onSave={saveReferralTab}
                  referralId={referralId}
                  isEditing={isEditing}
                />
              )}

              {activeTab === 'casestudy' && (
                <CaseStudyTab
                  state={caseStudyState}
                  setState={setCaseStudyState}
                  errors={caseStudyErrors}
                  setErrors={setCaseStudyErrors}
                  isLoading={isLoadingState}
                  referralId={referralId}
                  isReferralSaved={savedTabs.referral}
                  onSave={saveCaseStudyTab}
                   isEditing={isEditing}  
    existingCaseStudy={existingCaseStudy}  
                />
              )}

              {activeTab === 'documents' && (
                <DocumentsTab
                  docs={docs}
                  onFileUpload={handleFileUpload}
                  onRemoveFile={removeFile}
                  // onSave={saveDocumentsTab}
  
                  isReferralSaved={savedTabs.referral}
                  publicReferralId={referralId || undefined}
                  referralId={referralId || undefined}
                  errors={errors}
                  setErrors={setErrors}
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
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">
              Contact Support
            </a>
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
        isLoading={isLoadingState}
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