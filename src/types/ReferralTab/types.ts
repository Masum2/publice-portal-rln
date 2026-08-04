export interface ReferralTabState {
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
}

export interface ReferralTabErrors {
  victimFirstName?: string;
  victimLastName?: string;
  reporterFirstName?: string;
  reporterLastName?: string;
  reporterPhone?: string;
  reporterEmail?: string;
  incidentAddress?: string;
}