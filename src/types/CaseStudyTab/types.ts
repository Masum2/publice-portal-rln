// types/CaseStudyTab/types.ts

export interface CaseStudyTabState {
  incidentDescription: string;
  incidentLocation: string;
  abuseDuration: string;
  lastSeen: string;
  shortTermMemoryLoss: boolean | null;
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
}

export interface CaseStudyTabErrors {
  incidentDescription?: string;
  incidentLocation?: string;
  abuseDuration?: string;
  lastSeen?: string;
  shortTermMemoryLoss?: string;
  hasCausedHarm?: string;
  harmDescription?: string;
  healthFunctioning?: string;
  inDangerOfDeath?: string;
  deathDescription?: string;
  atRiskOfHarm?: string;
  riskDescription?: string;
  witnessedIncident?: string;
  howBecameAware?: string;
  adultKnowsReport?: string;
  adultReaction?: string;
  familyKnowsReport?: string;
  familyMembersKnow?: string;
  involvedWithDSS?: string;
  dssDescription?: string;
  otherReports?: string;
  otherReportsDescription?: string;
  lawEnforcementInvolved?: string;
  lawEnforcementDescription?: string;
  _form?: string;
  [key: string]: string | undefined;
}