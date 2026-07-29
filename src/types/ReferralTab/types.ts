// ReferralTab/types.ts

export interface ReferralTabState {
  // ❌ REMOVED: reportingDate, reportingTime, reportingMethod, reportingSource
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
}

export interface ReferralTabErrors {
  reporterFirstName?: string;
  reporterLastName?: string;
  reporterPhone?: string;
  reporterEmail?: string;
  incidentAddress?: string;
  victimName?: string;
}