// components/PublicPortal/CaseStudyTab/index.tsx
import React, { useEffect } from 'react';
import { AlertCircle, User, Shield } from 'lucide-react';

import type { CaseStudyTabErrors, CaseStudyTabState } from '../../types/CaseStudyTab/types';
import { SaveButton } from '../SaveButton';

interface CaseStudyTabProps {
  state: CaseStudyTabState;
  setState: React.Dispatch<React.SetStateAction<CaseStudyTabState>>;
  errors: CaseStudyTabErrors;
  setErrors: React.Dispatch<React.SetStateAction<CaseStudyTabErrors>>;
  isLoading: boolean;
  referralId: number | null;
  isReferralSaved: boolean;
  onSave: () => void;
  isEditing?: boolean; 
  existingCaseStudy?: any; 
}

type RadioFieldKeys = 
  | 'shortTermMemoryLoss'
  | 'hasCausedHarm'
  | 'inDangerOfDeath'
  | 'atRiskOfHarm'
  | 'witnessedIncident'
  | 'adultKnowsReport'
  | 'familyKnowsReport'
  | 'involvedWithDSS'
  | 'otherReports'
  | 'lawEnforcementInvolved';

type TextFieldKeys = 
  | 'incidentDescription'
  | 'incidentLocation'
  | 'abuseDuration'
  | 'lastSeen'
  | 'harmDescription'
  | 'healthFunctioning'
  | 'deathDescription'
  | 'riskDescription'
  | 'howBecameAware'
  | 'adultReaction'
  | 'familyMembersKnow'
  | 'dssDescription'
  | 'otherReportsDescription'
  | 'lawEnforcementDescription';

export const CaseStudyTab: React.FC<CaseStudyTabProps> = ({
  state,
  setState,
  errors,
  setErrors,
  isLoading,
  referralId,
  isReferralSaved,
  onSave,
  isEditing = false,
  existingCaseStudy = null,
}) => {
  const updateField = <K extends keyof CaseStudyTabState>(
    key: K,
    value: CaseStudyTabState[K]
  ) => {
    const errorKey = key as string;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: '' }));
    }
    setState((prev) => ({ ...prev, [key]: value }));
  };
useEffect(() => {
    console.log('🔍 CaseStudyTab - State:', state);
    console.log('🔍 CaseStudyTab - existingCaseStudy:', existingCaseStudy);
    console.log('🔍 CaseStudyTab - isEditing:', isEditing);
    console.log('🔍 CaseStudyTab - referralId:', referralId);
  }, [state, existingCaseStudy, isEditing, referralId]);
  const renderError = (field: keyof CaseStudyTabErrors): React.ReactNode => {
    const error = errors[field];
    if (error) {
      return (
        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1 animate-in slide-in-from-top duration-200">
          <span>⚠️</span> {error}
        </p>
      );
    }
    return null;
  };

  const renderRadioGroup = (
    label: string,
    key: RadioFieldKeys,
    required: boolean = false,
    className?: string
  ) => {
    const value = state[key];
    const errorKey = key as string;
    
    return (
      <div className={className}>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              checked={value === true}
              onChange={() => updateField(key, true)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              checked={value === false}
              onChange={() => updateField(key, false)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500"
            />
            No
          </label>
        </div>
        {renderError(errorKey as keyof CaseStudyTabErrors)}
      </div>
    );
  };

  const renderConditionalInput = (
    label: string,
    key: TextFieldKeys,
    conditionKey: RadioFieldKeys,
    placeholder: string,
    className?: string
  ) => {
    const value = state[key] as string || '';
    const isDisabled = state[conditionKey] !== true;
    const errorKey = key as string;

    return (
      <div className={className}>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => updateField(key, e.target.value as any)}
          className={`w-full p-3.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition ${
            isDisabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-gray-200'
          } ${errors[errorKey] ? 'border-red-500' : ''}`}
          placeholder={placeholder}
          disabled={isDisabled}
        />
        {renderError(errorKey as keyof CaseStudyTabErrors)}
      </div>
    );
  };

  // 👈 Check if case study exists
  const hasExistingCaseStudy = existingCaseStudy !== null && existingCaseStudy !== undefined;

  return (
    <>
  

      {!referralId && !isReferralSaved && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Referral Information Required</p>
            <p className="text-sm">Please save the Referral Information tab first before saving Case Study.</p>
          </div>
        </div>
      )}

      {/* Form-level error */}
      {errors._form && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
          <span className="text-red-500">⚠️</span>
          <p className="flex-1">{errors._form}</p>
          <button
            onClick={() => setErrors((prev) => ({ ...prev, _form: '' }))}
            className="text-red-400 hover:text-red-600 transition"
          >
            ✕
          </button>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
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
            {renderError('incidentDescription')}
          </div>

          <div>
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
            {renderError('incidentLocation')}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              How long has Abuse been going on?
            </label>
            <input
              type="text"
              value={state.abuseDuration || ''}
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
              value={state.lastSeen || ''}
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
            {renderRadioGroup('Has this situation caused harm to the adult?', 'hasCausedHarm', true)}
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
                value={state.healthFunctioning || ''}
                onChange={(e) => updateField('healthFunctioning', e.target.value)}
                className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
                placeholder="Describe the adult's current health functioning..."
              />
            </div>

            {renderRadioGroup('Is In Danger Of Death?', 'inDangerOfDeath', true)}
            {renderConditionalInput(
              'If yes, Please Describe',
              'deathDescription',
              'inDangerOfDeath',
              'Describe the danger...'
            )}

            {renderRadioGroup('Is the adult at risk of harm?', 'atRiskOfHarm', true)}
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
            {renderRadioGroup('Did you witness the incident or condition?', 'witnessedIncident', true)}
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
            {renderRadioGroup('Does the adult know about the report?', 'adultKnowsReport', true)}
            {renderConditionalInput(
              'If yes, What was/will be the reaction?',
              'adultReaction',
              'adultKnowsReport',
              'Describe the reaction...'
            )}

            {renderRadioGroup('Does the Family know about the report?', 'familyKnowsReport', true)}
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
            {renderRadioGroup('Has the adult or family ever been involved with DSS before?', 'involvedWithDSS', true)}
            {renderConditionalInput(
              'If yes, Please Describe',
              'dssDescription',
              'involvedWithDSS',
              'Describe previous DSS involvement...'
            )}

            {renderRadioGroup('Have there been other reports made about the adult/family?', 'otherReports', true)}
            {renderConditionalInput(
              'If yes, Please Describe',
              'otherReportsDescription',
              'otherReports',
              'Describe other reports...'
            )}

            {renderRadioGroup('Do you know if law enforcement has been involved?', 'lawEnforcementInvolved', true)}
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
          label={hasExistingCaseStudy && isEditing ? 'Update Case Study' : 'Save Case Study'}
          disabled={!referralId}
        />
      </div>
    </>
  );
};