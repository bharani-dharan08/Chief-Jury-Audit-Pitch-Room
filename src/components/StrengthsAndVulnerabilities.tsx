import React from 'react';
import { CheckCircle, AlertOctagon, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';

interface StrengthsAndVulnerabilitiesProps {
  strengths: string[];
  vulnerabilities: {
    question: string;
    context: string;
    juryAngle: string;
  }[];
  onSelectQuestionForPractice: (q: { question: string; context: string }) => void;
}

export const StrengthsAndVulnerabilities: React.FC<StrengthsAndVulnerabilitiesProps> = ({
  strengths,
  vulnerabilities,
  onSelectQuestionForPractice,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 🚀 Key Strengths */}
      <div id="key-strengths-card" className="bg-white rounded-xl border border-emerald-200/80 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
          <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">🚀 Key Strengths</h3>
            <p className="text-xs text-slate-500">Standout competitive advantages identified in the presentation</p>
          </div>
        </div>

        <div className="space-y-3">
          {strengths.map((str, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200/60"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {str}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ⚠️ Critical Vulnerabilities & Hard Jury Questions */}
      <div id="jury-questions-card" className="bg-white rounded-xl border border-amber-200/80 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">⚠️ Critical Jury Questions</h3>
              <p className="text-xs text-slate-500">Tough cross-examination questions from the Grand Finale panel</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {vulnerabilities.map((vuln, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-amber-50/40 hover:bg-amber-50/80 rounded-xl border border-amber-200/70 transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                  Judge Q#{idx + 1}
                </span>
                <span className="text-[11px] font-medium text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                  Focus: {vuln.juryAngle}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                "{vuln.question}"
              </p>

              {vuln.context && (
                <p className="text-xs text-slate-600 italic">
                  <span className="font-semibold text-slate-700 not-italic">Behind the question: </span>
                  {vuln.context}
                </p>
              )}

              <button
                type="button"
                onClick={() => onSelectQuestionForPractice(vuln)}
                className="w-full mt-1.5 py-1.5 px-3 bg-white hover:bg-amber-100/60 text-amber-800 hover:text-amber-950 font-semibold text-xs rounded-lg border border-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Practice Defending This Question</span>
                <ArrowRight className="w-3 h-3 text-amber-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
