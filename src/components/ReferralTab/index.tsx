// ReferralTab/index.tsx
import React from 'react';
import { User, MapPin, Loader, Save } from 'lucide-react';

import type { ReferralTabErrors, ReferralTabState } from '../../types/ReferralTab/types';
import { SaveButton } from '../SaveButton';
// import type type { ReferralTabState, ReferralTabErrors } from './types';

interface ReferralTabProps {
  state: ReferralTabState;
  setState: React.Dispatch<React.SetStateAction<ReferralTabState>>;
  errors: ReferralTabErrors;
  isLoading: boolean;
  onSave: () => void;
}

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reporting Date & Time */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Reporting Date
          </label>
          <input
            type="date"
            value={state.reportingDate}
            onChange={(e) => updateField('reportingDate', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Reporting Time
          </label>
          <select
            value={state.reportingTime}
            onChange={(e) => updateField('reportingTime', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            {Array.from({ length: 24 }, (_, i) => {
              const hour = Math.floor(i / 2) + 8;
              const min = i % 2 === 0 ? '00' : '30';
              const ampm = hour >= 12 ? 'PM' : 'AM';
              const displayHour = hour > 12 ? hour - 12 : hour;
              return (
                <option key={i} value={`${hour}:${min}`}>
                  {`${displayHour}:${min} ${ampm}`}
                </option>
              );
            })}
          </select>
        </div>

        {/* Reporting Method & Source */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Reporting Method
          </label>
          <select
            value={state.reportingMethod}
            onChange={(e) => updateField('reportingMethod', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            <option>Letter</option>
            <option>Face to Face</option>
            <option>Phone</option>
            <option>Electronically</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Reporting Source
          </label>
          <select
            value={state.reportingSource}
            onChange={(e) => updateField('reportingSource', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          >
            <option>Maarc</option>
            <option>Directly</option>
            <option>Law Enforcement</option>
            <option>County</option>
            <option>Internal</option>
          </select>
        </div>

        {/* Reporter Information */}
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
            <option>CA</option>
            <option>NY</option>
            <option>TX</option>
            <option>FL</option>
            <option>IL</option>
            <option>Other</option>
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
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              updateField('reporterPhone', value);
            }}
            className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${
              errors.reporterPhone ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="5551234567"
            maxLength={10}
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

        {/* Incident Location */}
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
            <option>CA</option>
            <option>NY</option>
            <option>TX</option>
            <option>FL</option>
            <option>IL</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            County
          </label>
          <input
            type="text"
            value={state.incidentCounty}
            onChange={(e) => updateField('incidentCounty', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="County"
          />
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
          <input
            type="text"
            value={state.incidentCommunity}
            onChange={(e) => updateField('incidentCommunity', e.target.value)}
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="Community name"
          />
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

        {/* Victim Information */}
        <div className="md:col-span-2 border-t border-gray-200 pt-6">
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
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <SaveButton isLoading={isLoading} onSave={onSave} label="Save Referral Info" />
      </div>
    </>
  );
};