// ReferralTab/index.tsx
import React from 'react';
import { User, MapPin } from 'lucide-react';

import type { ReferralTabErrors, ReferralTabState } from '../../types/ReferralTab/types';
import { SaveButton } from '../SaveButton';

// Data arrays
const STATES = [
  'Minnesota', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'lllinois', 'Indiana', 'lowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const COMMUNITIES = [
  'Redby', 'Red Lake', 'Little Rock', 'Ponemah', 'Other', 'Unknown'
];

const COUNTIES = [
  'Beltrami County', 'Clearwater', 'Aitkin', 'Anoka', 'Becker', 'Benton',
  'Big Stone', 'Blue Earth', 'Brown', 'Carver', 'Carlton', 'Cass',
  'CHippewa', 'Chisago', 'Clay', 'Cottonwood', 'Crow Wing', 'Dakota',
  'Dodge', 'Douglas', 'Faribault', 'Fillmore', 'Freeborn', 'Goodhue',
  'Grant', 'Hennepin', 'Houston', 'Hubbard', 'Isanti', 'Itasca',
  'Jackson', 'Kanabec', 'Kandiyochi', 'Kittson', 'Koochiching',
  'Lac qui Parle', 'Lake', 'Lake of the Woods', 'Le Sueur', 'Lincoln',
  'Mahnomen', 'Marshall', 'Martin', 'McLeod', 'Meeker', 'Mile Lacs',
  'Morrison', 'Mower', 'Murry', 'Nicollet', 'Nobles', 'Norman',
  'Olmsted', 'Otter Tail', 'Pennington', 'Pine', 'Pipestone', 'Polk',
  'Pope', 'Ramsey', 'Red Lake', 'Redwood', 'Renville', 'Rice', 'Rock',
  'Roseau', 'St.Louis', 'Scott', 'Sherburne', 'Sibley', 'Stearns',
  'Steele', 'Stevens', 'Swift', 'Todd', 'traverse', 'Wabasha', 'Wadena',
  'Waseca', 'Washington', 'Wilkin', 'Winona', 'Wright', 'Yellow Medicine',
  'Cook'
];

interface ReferralTabProps {
  state: ReferralTabState;
  setState: React.Dispatch<React.SetStateAction<ReferralTabState>>;
  errors: ReferralTabErrors;
  isLoading: boolean;
  onSave: () => void;
}

const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
};

export const ReferralTab: React.FC<ReferralTabProps> = ({
  state,
  setState,
  errors,
  isLoading,
  onSave,
}) => {
  const updateField = <K extends keyof ReferralTabState>(
    key: K,
    value: ReferralTabState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const renderCheckbox = (
    label: string,
    key: keyof ReferralTabState,
    className?: string
  ) => (
    <label className={`flex items-center gap-2 text-sm text-gray-700 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={state[key] as boolean}
        onChange={(e) => updateField(key, e.target.checked as any)}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
      />
      {label}
    </label>
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ReferralTabState) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(rawValue);
    updateField(field, formattedValue as any);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ===== VICTIM INFORMATION - TOP SECTION ===== */}
        {/* <div className="md:col-span-2">
          <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4" />
            Victim / Client Information
          </h3>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Victim's Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.victimName}
            onChange={(e) => updateField('victimName', e.target.value)}
            className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${
              errors.victimName ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Full name"
          />
          {errors.victimName && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.victimName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Victim Age
          </label>
          <input
            type="number"
            value={state.victimAge}
            onChange={(e) => updateField('victimAge', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="Age"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Victim Address
          </label>
          <textarea
            rows={2}
            value={state.victimAddress}
            onChange={(e) => updateField('victimAddress', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
            placeholder="Victim's address"
          />
        </div> */}

        {/* ===== REPORTER INFORMATION - AFTER VICTIM ===== */}
        <div className="md:col-span-2 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4" />
            Reporter Information
          </h3>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.reporterFirstName}
            onChange={(e) => updateField('reporterFirstName', e.target.value)}
            className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${
              errors.reporterFirstName ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="First name"
          />
          {errors.reporterFirstName && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.reporterFirstName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.reporterLastName}
            onChange={(e) => updateField('reporterLastName', e.target.value)}
            className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${
              errors.reporterLastName ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Last name"
          />
          {errors.reporterLastName && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.reporterLastName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Relationship with Adult
          </label>
          <select
            value={state.relationship}
            onChange={(e) => updateField('relationship', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            <option>Relative</option>
            <option>Friend</option>
            <option>Staff in Licensed Facility</option>
            <option>Home Health Staff</option>
            <option>Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Address
          </label>
          <textarea
            rows={2}
            value={state.reporterAddress}
            onChange={(e) => updateField('reporterAddress', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
            placeholder="Street address"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            City
          </label>
          <input
            type="text"
            value={state.reporterCity}
            onChange={(e) => updateField('reporterCity', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="City"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            State
          </label>
          <select
            value={state.reporterState}
            onChange={(e) => updateField('reporterState', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            <option value="">Select State</option>
            {STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Zip Code
          </label>
          <input
            type="text"
            value={state.reporterZip}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              updateField('reporterZip', value);
            }}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="90210"
            maxLength={5}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Phone No. <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={state.reporterPhone}
            onChange={(e) => handlePhoneChange(e, 'reporterPhone')}
            className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${
              errors.reporterPhone ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="(555) 123-4567"
            maxLength={14}
          />
          {errors.reporterPhone && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.reporterPhone}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={state.reporterEmail}
            onChange={(e) => updateField('reporterEmail', e.target.value)}
            className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${
              errors.reporterEmail ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="name@email.com"
          />
          {errors.reporterEmail && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.reporterEmail}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Organization
          </label>
          <input
            type="text"
            value={state.organization}
            onChange={(e) => updateField('organization', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="Organization name"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Job Title
          </label>
          <input
            type="text"
            value={state.jobTitle}
            onChange={(e) => updateField('jobTitle', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="Job title"
          />
        </div>

        {/* Checkboxes */}
        <div className="md:col-span-2 grid grid-cols-2 gap-3 pt-2">
          {renderCheckbox('Has Witnessed?', 'hasWitnessed')}
          {renderCheckbox('Available for more info?', 'availableForMoreInfo')}
          {renderCheckbox('Anonymous', 'anonymous')}
          {renderCheckbox('Wants to be informed?', 'wantsToBeInformed')}
        </div>

        {/* ===== INCIDENT LOCATION ===== */}
        <div className="md:col-span-2 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Incident Location
          </h3>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={2}
            value={state.incidentAddress}
            onChange={(e) => updateField('incidentAddress', e.target.value)}
            className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none ${
              errors.incidentAddress ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Street address of incident"
          />
          {errors.incidentAddress && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.incidentAddress}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            City
          </label>
          <input
            type="text"
            value={state.incidentCity}
            onChange={(e) => updateField('incidentCity', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="City"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            State
          </label>
          <select
            value={state.incidentState}
            onChange={(e) => updateField('incidentState', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            <option value="">Select State</option>
            {STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            County
          </label>
          <select
            value={state.incidentCounty}
            onChange={(e) => updateField('incidentCounty', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            <option value="">Select County</option>
            {COUNTIES.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Zip Code
          </label>
          <input
            type="text"
            value={state.incidentZip}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              updateField('incidentZip', value);
            }}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="90210"
            maxLength={5}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Community
          </label>
          <select
            value={state.incidentCommunity}
            onChange={(e) => updateField('incidentCommunity', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            <option value="">Select Community</option>
            {COMMUNITIES.map((community) => (
              <option key={community} value={community}>{community}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Comments
          </label>
          <textarea
            rows={2}
            value={state.incidentComments}
            onChange={(e) => updateField('incidentComments', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
            placeholder="Any additional comments about the incident location"
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <SaveButton isLoading={isLoading} onSave={onSave} label="Save Referral Info" />
      </div>
    </>
  );
};