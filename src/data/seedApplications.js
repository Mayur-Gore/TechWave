export const APPLICATION_STATUSES = ['Submitted', 'Under Review', 'Approved', 'Rejected'];


export const seedApplications = [
  {
    id: 'APP-PMK-9481',
    schemeId: 'scheme-1',
    schemeName: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    applicantName: 'Ramesh Patil',
    aadhaarLast4: '4821',
    landSize: '4.5 Acres',
    bankAccountMasked: 'Bank of Maharashtra (**** 4921)',
    status: 'Under Review',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-10-02T10:00:00.000Z', note: 'Application filed online via portal.' },
      { status: 'Under Review', timestamp: '2026-10-06T14:30:00.000Z', note: 'Land records verified by Talathi.' },
    ],
    submittedAt: '2026-10-02T10:00:00.000Z',
    updatedAt: '2026-10-06T14:30:00.000Z',
  },
  {
    id: 'APP-DBT-7124',
    schemeId: 'scheme-7',
    schemeName: 'MahaDBT Farm Mechanization Sub-Mission',
    applicantName: 'Ramesh Patil',
    aadhaarLast4: '4821',
    landSize: '4.5 Acres',
    bankAccountMasked: 'Bank of Maharashtra (**** 4921)',
    status: 'Approved',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-09-15T09:20:00.000Z', note: 'Lottery application submitted for Battery Sprayer subsidy.' },
      { status: 'Under Review', timestamp: '2026-09-22T11:00:00.000Z', note: 'Lottery draw winner verified.' },
      { status: 'Approved', timestamp: '2026-09-28T16:15:00.000Z', note: 'Pre-sanction order issued. Subsidy token active.' },
    ],
    submittedAt: '2026-09-15T09:20:00.000Z',
    updatedAt: '2026-09-28T16:15:00.000Z',
  },
];
