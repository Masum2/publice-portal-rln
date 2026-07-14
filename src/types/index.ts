export interface DocumentFile {
  id: string;
  name: string;
  type: 'Initial Notice' | 'Additional Notice' | 'Supporting Doc';
  uploadedAt: string;
}

export interface Client {
  id: string;
  name: string;
  dob: string;
  caseNumber: string;
}

export interface Referral {
  id: string;
  reporterName: string;
  reporterContact: string;
  clientName: string;
  clientDob: string;
  details: string;
  status: 'Submitted' | 'In Review' | 'Accepted' | 'Rejected';
  reviewStartedAt?: string;
  submittedAt: string;
  documents: DocumentFile[];
  linkedClientId?: string;
}

export interface ICWACase {
  id: string;
  childName: string;
  agencyName: string;
  initialNoticeDate: string;
  additionalNoticesCount: number;
  documents: DocumentFile[];
}