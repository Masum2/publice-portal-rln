// CaseStudyTab/index.tsx
import React from 'react';
import { AlertCircle, User, Shield, Loader, Save } from 'lucide-react';

import type { CaseStudyTabErrors, CaseStudyTabState } from '../../types/CaseStudyTab/types';
import { SaveButton } from '../SaveButton';


interface CaseStudyTabProps {
  state: CaseStudyTabState;
  setState: React.Dispatch<React.SetStateAction<CaseStudyTabState>>;
  errors: CaseStudyTabErrors;
  isLoading: boolean;
  referralId: number | null;
  isReferralSaved: boolean;
  onSave: () => void;
}

export const CaseStudyTab: React.FC<CaseStudyTabProps> = ({
  state,
  setState,
  errors,
  isLoading,
  referralId,
  isReferralSaved,
  onSave,
}) => {
  const updateField = <K extends keyof CaseStudyTabState>(
    key: K,
    value: CaseStudyTabState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const renderRadioGroup = (
    label: string,
    key: keyof CaseStudyTabState,
    className?: string
  ) => (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="flex gap-4 mt-1">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            checked={state[key] === true}
            onChange={() => updateField(key, true as any)}
            className="text-amber-600 focus:ring-amber-500"
          />
          Yes
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            checked={state[key] === false}
            onChange={() => updateField(key, false as any)}
            className="text-amber-600 focus:ring-amber-500"
          />
          No
        </label>
      </div>
    </div>
  );

  const renderConditionalInput = (
    label: string,
    key: keyof CaseStudyTabState,
    conditionKey: keyof CaseStudyTabState,
    placeholder: string,
    className?: string
  ) => (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={state[key] as string}
        onChange={(e) => updateField(key, e.target.value as any)}
        className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition disabled:bg-gray-100 disabled:text-gray-500"
        placeholder={placeholder}
        disabled={state[conditionKey] !== true}
      />
    </div>
  );

  return (
    <>
      {!referralId && !isReferralSaved && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          Please save the Referral Information first before saving Case Study.
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Incident Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={state.incidentDate}
              onChange={(e) => updateField('incidentDate', e.target.value)}
              className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition ${
                errors.incidentDate ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.incidentDate && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.incidentDate}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Incident Time
            </label>
            <input
              type="time"
              value={state.incidentTime}
              onChange={(e) => updateField('incidentTime', e.target.value)}
              className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Incident Description (Abuse, Neglect, or Exploitation) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={state.incidentDescription}
              onChange={(e) => updateField('incidentDescription', e.target.value)}
              className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none ${
                errors.incidentDescription ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Describe the abuse, neglect, or exploitation..."
            />
            {errors.incidentDescription && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.incidentDescription}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Incident Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={state.incidentLocation}
              onChange={(e) => updateField('incidentLocation', e.target.value)}
              className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition ${
                errors.incidentLocation ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Where did the incident occur?"
            />
            {errors.incidentLocation && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ {errors.incidentLocation}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              How long has Abuse been going on?
            </label>
            <input
              type="text"
              value={state.abuseDuration}
              onChange={(e) => updateField('abuseDuration', e.target.value)}
              className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              placeholder="e.g., 2 weeks, 6 months..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              When did you last see the adult?
            </label>
            <input
              type="text"
              value={state.lastSeen}
              onChange={(e) => updateField('lastSeen', e.target.value)}
              className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              placeholder="e.g., Yesterday, Last week..."
            />
          </div>
        </div>

        {/* Harm Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-amber-600 uppercase tracking-wider flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4" />
            Harm & Health Functioning
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderRadioGroup('Has this situation caused harm to the adult?', 'hasCausedHarm')}
            {renderConditionalInput(
              'If yes, Please Describe',
              'harmDescription',
              'hasCausedHarm',
              'Describe the harm...'
            )}

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Health Functioning
              </label>
              <textarea
                rows={2}
                value={state.healthFunctioning}
                onChange={(e) => updateField('healthFunctioning', e.target.value)}
                className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
                placeholder="Describe the adult's current health functioning..."
              />
            </div>

            {renderRadioGroup('Is In Danger Of Death?', 'inDangerOfDeath')}
            {renderConditionalInput(
              'If yes, Please Describe',
              'deathDescription',
              'inDangerOfDeath',
              'Describe the danger...'
            )}

            {renderRadioGroup('Is the adult at risk of harm?', 'atRiskOfHarm')}
            {renderConditionalInput(
              'If yes, Please Describe',
              'riskDescription',
              'atRiskOfHarm',
              'Describe the risk...'
            )}
          </div>
        </div>

        {/* Witness & Awareness */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-cyan-600 uppercase tracking-wider flex items-center gap-2 mb-4">
            <User className="w-4 h-4" />
            Witness & Awareness
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderRadioGroup('Did you witness the incident or condition?', 'witnessedIncident')}
            {renderConditionalInput(
              'If not, how did you become aware of the situation?',
              'howBecameAware',
              'witnessedIncident',
              'How did you learn about it?'
            )}
          </div>
        </div>

        {/* Adult & Family Awareness */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4" />
            Adult & Family Awareness
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderRadioGroup('Does the adult know about the report?', 'adultKnowsReport')}
            {renderConditionalInput(
              'If yes, What was/will be the reaction?',
              'adultReaction',
              'adultKnowsReport',
              'Describe the reaction...'
            )}

            {renderRadioGroup('Does the Family know about the report?', 'familyKnowsReport')}
            {renderConditionalInput(
              'If yes, Who in the family knows?',
              'familyMembersKnow',
              'familyKnowsReport',
              'Who knows about it?'
            )}
          </div>
        </div>

        {/* DSS & Law Enforcement */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-rose-600 uppercase tracking-wider flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4" />
            Previous Involvement
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderRadioGroup('Has the adult or family ever been involved with DSS before?', 'involvedWithDSS')}
            {renderConditionalInput(
              'If yes, Please Describe',
              'dssDescription',
              'involvedWithDSS',
              'Describe previous DSS involvement...'
            )}

            {renderRadioGroup('Have there been other reports made about the adult/family?', 'otherReports')}
            {renderConditionalInput(
              'If yes, Please Describe',
              'otherReportsDescription',
              'otherReports',
              'Describe other reports...'
            )}

            {renderRadioGroup('Do you know if law enforcement has been involved?', 'lawEnforcementInvolved')}
            {renderConditionalInput(
              'If yes, Please Describe',
              'lawEnforcementDescription',
              'lawEnforcementInvolved',
              'Describe law enforcement involvement...'
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <SaveButton
          isLoading={isLoading}
          onSave={onSave}
          label="Save Case Study"
          disabled={!referralId}
        />
      </div>
    </>
  );
};