import React, { useState } from 'react';
import { SIHProblemStatement } from '../types';
import { OFFICIAL_SIH_PROBLEM_STATEMENTS } from '../data/sihProblemStatements';
import { Building2, ChevronDown, Sparkles, Check, Edit3 } from 'lucide-react';

interface ProblemStatementSelectorProps {
  selectedPS: SIHProblemStatement;
  onSelectPS: (ps: SIHProblemStatement) => void;
  onCustomEdit: (ps: SIHProblemStatement) => void;
}

export const ProblemStatementSelector: React.FC<ProblemStatementSelectorProps> = ({
  selectedPS,
  onSelectPS,
  onCustomEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingCustom, setIsEditingCustom] = useState(false);
  const [customForm, setCustomForm] = useState<SIHProblemStatement>({ ...selectedPS });

  const handleSaveCustom = () => {
    onCustomEdit(customForm);
    setIsEditingCustom(false);
  };

  return (
    <div id="ps-selector-card" className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-600" />
          <h2 className="text-base font-semibold text-slate-900">
            SIH 2026 Problem Statement
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="toggle-ps-dropdown-button"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <span>Choose Ministry PS ({OFFICIAL_SIH_PROBLEM_STATEMENTS.length})</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          <button
            id="edit-custom-ps-button"
            type="button"
            onClick={() => setIsEditingCustom(!isEditingCustom)}
            className="text-xs font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingCustom ? 'Cancel Edit' : 'Custom PS'}</span>
          </button>
        </div>
      </div>

      {/* Dropdown list of official problem statements */}
      {isOpen && (
        <div className="mt-3 divide-y divide-slate-100 border border-slate-200 rounded-lg max-h-72 overflow-y-auto bg-slate-50">
          {OFFICIAL_SIH_PROBLEM_STATEMENTS.map((ps) => {
            const isSelected = ps.id === selectedPS.id;
            return (
              <button
                key={ps.id}
                type="button"
                onClick={() => {
                  onSelectPS(ps);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-3 transition-colors flex items-start justify-between gap-3 ${
                  isSelected ? 'bg-amber-50/80 text-amber-950 font-medium' : 'hover:bg-white text-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {ps.code}
                    </span>
                    <span className="text-slate-500 font-medium">{ps.organization}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{ps.domainBucket}</span>
                  </div>
                  <p className="text-sm font-semibold leading-tight text-slate-900">{ps.title}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0 mt-1" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Edit Form */}
      {isEditingCustom ? (
        <div className="mt-4 space-y-3 bg-amber-50/40 p-4 rounded-lg border border-amber-200/70">
          <h3 className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
            Enter Your Official SIH Problem Statement Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                PS Code / ID
              </label>
              <input
                type="text"
                value={customForm.code}
                onChange={(e) => setCustomForm({ ...customForm, code: e.target.value })}
                placeholder="e.g. SIH2026-1042"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Ministry / Organization
              </label>
              <input
                type="text"
                value={customForm.organization}
                onChange={(e) => setCustomForm({ ...customForm, organization: e.target.value })}
                placeholder="e.g. Ministry of Railways, ISRO"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Problem Statement Title
            </label>
            <input
              type="text"
              value={customForm.title}
              onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
              placeholder="e.g. AI-driven predictive maintenance for high-speed locomotives"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Official Description &amp; Requirements
            </label>
            <textarea
              rows={3}
              value={customForm.description}
              onChange={(e) => setCustomForm({ ...customForm, description: e.target.value })}
              placeholder="Explain the background problem and requirements given by the ministry..."
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditingCustom(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveCustom}
              className="px-3 py-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md shadow-sm"
            >
              Save &amp; Use Custom PS
            </button>
          </div>
        </div>
      ) : (
        /* Currently Active PS Summary */
        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
              {selectedPS.code}
            </span>
            <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {selectedPS.organization}
            </span>
            <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
              {selectedPS.category} Category
            </span>
            <span className="text-xs font-medium text-slate-500">
              {selectedPS.domainBucket}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {selectedPS.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {selectedPS.description}
          </p>
        </div>
      )}
    </div>
  );
};
