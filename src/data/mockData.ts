import type { Client, ICWACase, Referral } from "../types";


export const mockClients: Client[] = [
  { id: 'CLI-9041', name: 'Chief John Standing Bear', dob: '1958-04-12', caseNumber: 'APS-2026-089' },
  { id: 'CLI-2234', name: 'Mary Tallchief', dob: '1947-11-23', caseNumber: 'APS-2026-104' }
];

export const mockReferrals: Referral[] = [
  {
    id: 'REF-8801',
    reporterName: 'Sarah Jenkins (Social Worker)',
    reporterContact: 'sarah.j@agency.org',
    clientName: 'Chief John Standing Bear',
    clientDob: '1958-04-12',
    details: 'Elderly tribal member requires critical wellness check, safety and regular healthcare monitoring support.',
    status: 'Submitted',
    submittedAt: '2026-07-12 09:30 AM',
    documents: [{ id: 'd1', name: 'intake_assessment.pdf', type: 'Supporting Doc', uploadedAt: '2026-07-12' }]
  },
  {
    id: 'REF-4392',
    reporterName: 'Confidential Neighbor',
    reporterContact: 'N/A',
    clientName: 'Robert Redbird',
    clientDob: '1951-02-14',
    details: 'Client is living isolated without adequate winter heating resources or family assistance.',
    status: 'In Review',
    reviewStartedAt: '11:15 AM',
    submittedAt: '2026-07-11 02:15 PM',
    documents: []
  }
];

export const mockICWACases: ICWACase[] = [
  {
    id: 'ICWA-301',
    childName: 'Baby Nova Littlefeather',
    agencyName: 'State Dept of Human Services',
    initialNoticeDate: '2026-05-14',
    additionalNoticesCount: 3,
    documents: [
      { id: 'icwa-1', name: 'ICWA_Initial_Notice_Nova.pdf', type: 'Initial Notice', uploadedAt: '2026-05-14' },
      { id: 'icwa-2', name: 'Duplicate_Notice_Copy_June.pdf', type: 'Additional Notice', uploadedAt: '2026-06-02' },
      { id: 'icwa-3', name: 'Subsequent_Notice_July.pdf', type: 'Additional Notice', uploadedAt: '2026-07-01' }
    ]
  }
];