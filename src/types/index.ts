export interface Referral {
  id: string;
  victimFirstName: string;
  victimLastName: string;
  approximateAge: number;
  victimAddress: string;
  victimPhone: string;
  reporterFirstName: string;
  reporterLastName: string;
  relationship: string;
  reporterAddress: string;
  reporterCity: string;
  reporterState: string;
  reporterZip: string;
  reporterPhone: string;
  reporterEmail: string;
  organization: string;
  jobTitle: string;
  hasWitnessed: boolean;
  availableForMoreInfo: boolean;
  anonymous: boolean;
  wantsToBeInformed: boolean;
  incidentAddress: string;
  incidentCity: string;
  incidentState: string;
  incidentCounty: string;
  incidentZip: string;
  incidentCommunity: string;
  incidentComments: string;
  
  // Case Study fields
  incidentDescription?: string;
  incidentLocation?: string;
  abuseDuration?: string;
  lastSeen?: string;
  shortTermMemoryLoss?: boolean | null;
  hasCausedHarm: boolean;
  harmDescription: string;
  healthFunctioning: string;
  inDangerOfDeath: boolean;
  deathDescription: string;
  atRiskOfHarm: boolean;
  riskDescription: string;
  witnessedIncident: boolean;
  howBecameAware: string;
  adultKnowsReport: boolean;
  adultReaction: string;
  familyKnowsReport: boolean;
  familyMembersKnow: string;
  involvedWithDSS: boolean;
  dssDescription: string;
  otherReports: boolean;
  otherReportsDescription: string;
  lawEnforcementInvolved: boolean;
  lawEnforcementDescription: string;
  
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  submittedAt: string;
  reviewStartedAt?: string | null;
  acceptedAt?: string | null;
  rejectedAt?: string | null;
  linkedClientId?: string | null;
  documents: DocumentFile[];
}

export interface DocumentFile {
  id: string;
  file: File;
  fileName: string;
  documentName: string;
  documentType: number;
  comments?: string;
  documentDate?: string;
  uploadedAt: string;
  
  // ব্যাকএন্ডের জন্য নতুন যোগ করা ফিল্ডসমূহ
  name?: string;
  type?: string;
  fileType?: string;
  fileData?: string;
  recordedBy?: string;
  recordedOn?: string;
  createdBy?: string;
  createdOn?: string;
  publicReferralId?: number;
}

export interface CreateReferralRequest {
  reporterFirstName: string;
  reporterLastName: string;
  reporterAddress: string;
  reporterCity: string;
  reporterZip: string;
  reporterPhone: string;
  reporterEmail: string;
  reporterOrganization: string;
  reporterJobTitle: string;
  isReporterAvailableForMoreInfo: boolean;
  isReporterWantsTobeAnonomyous: boolean;
  isReporterInterestedInUpdates: boolean;
  hasReporterWitnessed: boolean;
  address: string;
  city: string;
  zip: string;
  reportDate: string;
  reportTime: string;
  reportingMethod: string;
  reportingSource: number;
  isAdultAbuseBeingReported: boolean;
  comments: string;
  aps_ClientId: number;
  reporterGenderLookupId: number;
  reporterStateLookupId: number;
  apS_ReporterRelationshipLookupId: number;
  stateLookupId: number;
  countyLookupId: number;
  submitById: number;
  isSubmitted: boolean;
  decision: number;
  preferredInformingMethod: number;
  nickName: string;
  victimFirstName: string;
  victimLastName: string;
  approximateAge: number;
  victimAddress: string;
  phone: string;
  
  // 400 Bad Request এড়ানোর জন্য জরুরি ফিল্ডসমূহ
  CreatedBy: number;
  CreatedOn: string;
  RecordedBy: number;
}

export interface CreateCaseStudyRequest {
  incidentLocation: string;
  incidentDesc: string;
  abuseNeglectOrExploitationDesc: string;
  lengthOfAbuse: string;
  healthFunctioning: string;
  lastSeenOn: string;
  causedHarm: boolean;
  causedHarmDesc: string;
  isInDangerOfDeath: boolean;
  dangerOfDeathDesc: string;
  isInRiskOfHarm: boolean;
  riskOfIrreparableHarm: string;
  hasWitnessed: boolean;
  notWitnessedDesc: string;
  adultKnowsAboutReport: boolean;
  adultReactionOnReport: string;
  familyKnowsAboutReport: boolean;
  whoKnowsInFamilyDesc: string;
  hasInvolvedWithDDS: boolean;
  involvementWithDDSDesc: string;
  othersReporters: boolean;
  othersReportersDesc: string;
  hasPoliceInvoled: boolean;
  lawEnforementDesc: string;
  directionsToCurrentLocation: string;
  isSubmitted: boolean;
  publicReferralId: number;
  CreatedBy: number;
  CreatedOn: string;
  RecordedBy: number;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  errors?: string[];
}