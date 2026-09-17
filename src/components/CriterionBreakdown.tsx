import React from 'react';
import { CriterionEvaluation } from '../types';
import { Lightbulb, Users, Cpu, CalendarClock, Presentation, AlertCircle, CheckCircle } from 'lucide-react';

interface CriterionBreakdownProps {
  breakdown: {
    innovation: CriterionEvaluation;
    impactAndRelevance: CriterionEvaluation;
    technicalArchitecture: CriterionEvaluation;
    roadmapAndViability: CriterionEvaluation;
    pitchQuality: CriterionEvaluation;
  };
}

export const CriterionBreakdown: React.FC<CriterionBreakdownProps> = ({ breakdown }) => {
  const criteriaList = [
    {
      key: 'innovation',
      data: breakdown.innovation,
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      weight: '25%',
      max: 25,
      description: 'Novelty, defensibility, avoiding generic wrappers / recycled solutions',
    },
    {
      key: 'impact',
      data: breakdown.impactAndRelevance,
      icon: <Users className="w-5 h-5 text-blue-500" />,
      weight: '25%',
      max: 25,
      description: 'Core pain point resolution, scale of real-world social/industrial adoption',
    },
    {
      key: 'tech',
      data: breakdown.technicalArchitecture,
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      weight: '20%',
      max: 20,
      description: 'Tech stack realism, security, scalability, 36hr MVP buildability',
    },
    {
      key: 'roadmap',
      data: breakdown.roadmapAndViability,
      icon: <CalendarClock className="w-5 h-5 text-emerald-500" />,
      weight: '15%',
      max: 15,
      description: 'Execution milestones, cost model, deployment and sustainability',
    },
    {
      key: 'pitch',
      data: breakdown.pitchQuality,
      icon: <Presentation className="w-5 h-5 text-purple-500" />,
      weight: '15%',
      max: 15,
      description: 'Conciseness, data-driven structure, jury persuasion, clarity',
    },
  ];

  return (
    <div id="criterion-breakdown-card" className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Detailed Criterion Breakdown (SIH 2026 Evaluation Rubric)
          </h3>
          <p className="text-xs text-slate-500">
            Weighted assessment by evaluation panel lead across all 5 official pillars
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500">Total Sum: 100 Points</span>
      </div>

      <div className="space-y-4 pt-1">
        {criteriaList.map(({ key, data, icon, weight, max, description }) => {
          if (!data) return null;
          const percentage = Math.round((data.score / max) * 100);
          const isHigh = percentage >= 75;
          const isMedium = percentage >= 50 && percentage < 75;

          const progressColor = isHigh
            ? 'bg-emerald-500'
            : isMedium
            ? 'bg-amber-500'
            : 'bg-rose-500';

          const tagBadgeColor = isHigh
            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
            : isMedium
            ? 'bg-amber-100 text-amber-800 border-amber-200'
            : 'bg-rose-100 text-rose-800 border-rose-200';

          return (
            <div
              key={key}
              id={`criterion-${key}`}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{data.name}</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        Weight: {weight}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {data.verdictTag && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagBadgeColor}`}>
                      {data.verdictTag}
                    </span>
                  )}
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-slate-900">{data.score}</span>
                    <span className="text-xs font-bold text-slate-400"> / {max}</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Critique commentary */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/70">
                <span className="font-semibold text-slate-900">Jury Critique: </span>
                {data.critique}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
