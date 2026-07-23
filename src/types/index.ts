// types/index.ts

export interface Referral {
  id: string;
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
  victimName: string;
  victimAge: string;
  victimAddress: string;
  incidentDate: string;
  incidentTime: string;
  incidentDescription: string;
  incidentLocation: string;
  abuseDuration: string;
  lastSeen: string;
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
  status: string;
  submittedAt: string;
  reviewStartedAt: string | null;
  acceptedAt: string | null;
  rejectedAt: string | null;
  linkedClientId: string | null;
  documents: DocumentFile[];
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}

export interface CreateReferralRequest {
  // Required fields
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
  
  // Optional fields with default values
  aps_ClientId?: number;
  reporterGenderLookupId?: number;
  reporterStateLookupId?: number;
  apS_ReporterRelationshipLookupId?: number;
  stateLookupId?: number;

  countyLookupId?: number;
  submitById?: number;
  isSubmitted?: boolean;
  decision?: number;
  preferredInformingMethod?: number;
  nickName?: string;
}

export interface CreateCaseStudyRequest {
  incidentDate: string;
  incidentTime: string;
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
  apS_ReferralId?: number;
  directionsToCurrentLocation?: string;
  isSubmitted?: boolean;
  decision?: number;
    publicReferralId?: number;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message?: string;
  errors?: string[];
}