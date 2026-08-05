export interface Referral {
  referralId: string;
  publicReferralId: string;
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
  
  status: 'Submitted';
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
  Id?: number; 
  // 400 Bad Request 
  CreatedBy: number;
  CreatedOn: string;
  RecordedBy: number;
  communityLookupId: number;
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

  CreatedBy: number;
  CreatedOn: string;
  RecordedBy: number;
    id?: number;                
  caseStudyId?: number;       
  publicReferralId?: number;  

}

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  errors?: string[];
}

export interface ReferralResponse {
  Id: number;
  PublicReferralId: number;

  VictimFirstName: string;
  VictimLastName: string;
  ApproximateAge: number;
  VictimAddress: string;
  Phone: string;

  ReporterFirstName: string;
  ReporterLastName: string;
  ReporterAddress: string;
  ReporterCity: string;
  ReporterZip: string;
  ReporterPhone: string;
  ReporterEmail: string;
  ReporterOrganization: string;
  ReporterJobTitle: string;

  APS_ReporterRelationshipLookupId: number;

  HasReporterWitnessed: boolean;
  IsReporterAvailableForMoreInfo: boolean;
  IsReporterWantsTobeAnonomyous: boolean;
  IsReporterInterestedInUpdates: boolean;

  Address: string;
  City: string;
  Zip: string;

  ReporterStateLookupId: number;
  StateLookupId: number;
  CountyLookupId: number;
  CommunityLookupId: number;

  Comments: string;
}
export interface CaseStudyResponse {
  PublicReferralId: number;

  PublicReferral: {
    Id: number;

    ReporterGenderLookupId: number;
    ReporterStateLookupId: number;
    APS_ReporterRelationshipLookupId: number;
    StateLookupId: number;
    CommunityLookupId: number | null;
    CountyLookupId: number;

    VictimFirstName: string | null;
    VictimLastName: string | null;
    ApproximateAge: number | null;
    VictimAddress: string | null;
    Phone: string | null;

    ReporterFirstName: string;
    ReporterLastName: string;
    ReporterAddress: string;
    ReporterCity: string;
    ReporterZip: string;
    ReporterPhone: string;
    ReporterEmail: string;
    ReporterOrganization: string;
    ReporterJobTitle: string;

    IsReporterAvailableForMoreInfo: boolean;
    IsReporterWantsTobeAnonomyous: boolean;
    IsReporterInterestedInUpdates: boolean;
    HasReporterWitnessed: boolean;

    Address: string;
    City: string;
    Zip: string;
    Comments: string;

    ReportDate: string;
    ReportTime: string;
    ReportingMethod: string;
    ReportingSource: number;
    PreferredInformingMethod: number;

    IsAdultAbuseBeingReported: boolean;
    IsSubmitted: boolean;
    Decision: number;

    NickName: string;

    RecordedBy: string;
    RecordedOn: string;
    CreatedBy: string;
    CreatedOn: string;
  };

  IncidentLocation: string;
  IncidentDesc: string;
  AbuseNeglectOrExploitationDesc: string;
  LengthOfAbuse: string;

  HealthFunctioning: string;
  LastSeenOn: string;

  CausedHarm: boolean;
  CausedHarmDesc: string;

  IsInDangerOfDeath: boolean;
  DangerOfDeathDesc: string;

  IsInRiskOfHarm: boolean;
  RiskOfIrreparableHarm: string;

  HasWitnessed: boolean;
  NotWitnessedDesc: string;

  AdultKnowsAboutReport: boolean;
  AdultReactionOnReport: string;

  FamilyKnowsAboutReport: boolean;
  WhoKnowsInFamilyDesc: string;

  HasInvolvedWithDDS: boolean;
  InvolvementWithDDSDesc: string;

  OthersReporters: boolean;
  OthersReportersDesc: string;

  HasPoliceInvoled: boolean;
  LawEnforementDesc: string;

  DirectionsToCurrentLocation: string;

  ShortTermMemoryLoss: number;
  ShortTermMemoryLossDesc: string | null;

  Id: number;

  IsSubmitted: boolean;

  RecordedBy: string;
  RecordedOn: string;

  CreatedBy: string;
  CreatedOn: string;
}
export interface UploadDocumentResponse {
  uploadedCount: number;
  failedCount?: number;
  documents?: DocumentFile[];
}