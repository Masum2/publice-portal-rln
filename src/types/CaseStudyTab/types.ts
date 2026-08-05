// types/CaseStudyTab/types.ts

export interface CaseStudyTabState {
  // ============================================
  // INCIDENT INFORMATION
  // ============================================
  incidentDescription: string;        // → abuseNeglectOrExploitationDesc
  incidentDesc: string;              // → incidentDesc (NEW)
  incidentLocation: string;          // → incidentLocation
  directionsToCurrentLocation: string; // → directionsToCurrentLocation (NEW)
  abuseDuration: string;             // → lengthOfAbuse
  lastSeen: string;                  // → lastSeenOn
  
  // ============================================
  // HARM & HEALTH FUNCTIONING
  // ============================================
  shortTermMemoryLoss: boolean | null;
  hasCausedHarm: boolean | null;
  harmDescription: string;
  healthFunctioning: string;
  inDangerOfDeath: boolean | null;
  deathDescription: string;
  atRiskOfHarm: boolean | null;
  riskDescription: string;
  
  // ============================================
  // WITNESS & AWARENESS
  // ============================================
  witnessedIncident: boolean | null;
  howBecameAware: string;
  
  // ============================================
  // ADULT & FAMILY AWARENESS
  // ============================================
  adultKnowsReport: boolean | null;
  adultReaction: string;
  familyKnowsReport: boolean | null;
  familyMembersKnow: string;
  
  // ============================================
  // PREVIOUS INVOLVEMENT
  // ============================================
  involvedWithDSS: boolean | null;
  dssDescription: string;
  otherReports: boolean | null;
  otherReportsDescription: string;
  lawEnforcementInvolved: boolean | null;
  lawEnforcementDescription: string;
}

export interface CaseStudyTabErrors {
  // Incident Information Errors
  incidentDescription?: string;
  incidentDesc?: string;
  incidentLocation?: string;
  directionsToCurrentLocation?: string;
  abuseDuration?: string;
  lastSeen?: string;
  
  // Harm & Health Functioning Errors
  shortTermMemoryLoss?: string;
  hasCausedHarm?: string;
  harmDescription?: string;
  healthFunctioning?: string;
  inDangerOfDeath?: string;
  deathDescription?: string;
  atRiskOfHarm?: string;
  riskDescription?: string;
  
  // Witness & Awareness Errors
  witnessedIncident?: string;
  howBecameAware?: string;
  
  // Adult & Family Awareness Errors
  adultKnowsReport?: string;
  adultReaction?: string;
  familyKnowsReport?: string;
  familyMembersKnow?: string;
  
  // Previous Involvement Errors
  involvedWithDSS?: string;
  dssDescription?: string;
  otherReports?: string;
  otherReportsDescription?: string;
  lawEnforcementInvolved?: string;
  lawEnforcementDescription?: string;
  
  _form?: string;
  [key: string]: string | undefined;
}