import React from 'react';
import { X, Scale, CheckCircle2, ShieldAlert, Award, FileCode } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        id="sih-guidelines-dialog"
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold">Official SIH 2026 Evaluation Rubric &amp; Weightage</h3>
              <p className="text-xs text-slate-400">National Grand Finale Scoring Standards &amp; Jury Criteria</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto text-slate-700 text-sm">
          {/* Rubric Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">1. Innovation &amp; Novelty</span>
                <span className="font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-xs">
                  25% (25 Pts)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates true originality versus recycled college projects or shallow ChatGPT/API wrappers. The jury inspects IP uniqueness, meaningful edge/Web3/AI integration, and technical moat.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">2. Problem Understanding &amp; Impact</span>
                <span className="font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-xs">
                  25% (25 Pts)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct mapping against the Ministry's specific pain point. Does the solution respect Indian ground constraints (offline operation, regional languages, low compute, MSME cost ceilings)?
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">3. Technical Architecture &amp; Feasibility</span>
                <span className="font-extrabold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded text-xs">
                  20% (20 Pts)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realistic system diagrams, latency metrics, security protocols, and 36-hour hackathon MVP feasibility. Unsubstantiated claims (e.g. "99.9% accuracy with 0 data") receive heavy score deductions.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">4. Roadmap &amp; Sustainability</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                  15% (15 Pts)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear 36-hour hackathon sprint breakdown + 6-month post-hackathon pilot with the sponsoring Ministry or industry body, bill of materials (BOM), and recurring operational cost model.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">5. Pitch Quality &amp; Structure</span>
              <span className="font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-xs">
                15% (15 Pts)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Slide readability, concise data points, architectural diagrams over text walls, and defense clarity during high-pressure Q&amp;A cross-examinations.
            </p>
          </div>

          {/* Verdict Scale */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              National Shortlisting Thresholds
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-emerald-950/60 border border-emerald-700/50 rounded-lg">
                <span className="font-bold text-emerald-400">🟢 Shortlisted (75 - 100)</span>
                <p className="text-slate-300 mt-1">Clear winner calibre, proven MVP pipeline, deep architecture defensibility.</p>
              </div>
              <div className="p-3 bg-amber-950/60 border border-amber-700/50 rounded-lg">
                <span className="font-bold text-amber-400">🟡 Waitlisted (50 - 74)</span>
                <p className="text-slate-300 mt-1">Good concept, but requires architectural fixes or lacks ground validation.</p>
              </div>
              <div className="p-3 bg-rose-950/60 border border-rose-700/50 rounded-lg">
                <span className="font-bold text-rose-400">🔴 Rejected (0 - 49)</span>
                <p className="text-slate-300 mt-1">Generic wrappers, fundamentally unfeasible architecture, buzzword density.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
