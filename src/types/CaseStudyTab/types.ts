// CaseStudyTab/types.ts

export interface CaseStudyTabState {
  // ❌ REMOVED: incidentDate, incidentTime
  incidentDescription: string;
  incidentLocation: string;
  abuseDuration: string;
  lastSeen: string;
  hasCausedHarm: boolean | null;
  harmDescription: string;
  healthFunctioning: string;
  inDangerOfDeath: boolean | null;
  deathDescription: string;
  atRiskOfHarm: boolean | null;
  riskDescription: string;
  witnessedIncident: boolean | null;
  howBecameAware: string;
  adultKnowsReport: boolean | null;
  adultReaction: string;
  familyKnowsReport: boolean | null;
  familyMembersKnow: string;
  involvedWithDSS: boolean | null;
  dssDescription: string;
  otherReports: boolean | null;
  otherReportsDescription: string;
  lawEnforcementInvolved: boolean | null;
  lawEnforcementDescription: string;
  shortTermMemoryLoss: boolean | null;
}

export interface CaseStudyTabErrors {
  // ❌ REMOVED: incidentDate
  incidentDescription?: string;
  incidentLocation?: string;
}