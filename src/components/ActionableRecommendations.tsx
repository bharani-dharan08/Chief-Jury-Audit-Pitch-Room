import React from 'react';
import { Wrench, ArrowUpRight, Flame, Target } from 'lucide-react';

interface ActionableRecommendationsProps {
  recommendations: {
    recommendation: string;
    impact: 'High' | 'Critical' | 'Medium';
    targetSlideOrArea: string;
  }[];
}

export const ActionableRecommendations: React.FC<ActionableRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <div id="actionable-recommendations-card" className="bg-white rounded-xl border border-indigo-200/80 shadow-sm p-5 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-indigo-100">
        <div className="p-1.5 bg-indigo-100 text-indigo-800 rounded-lg">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            🛠️ Actionable Recommendations to Secure a Win
          </h3>
          <p className="text-xs text-slate-500">
            Mandatory deck and technical modifications to guarantee grand finale selection
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => {
          const isCritical = rec.impact === 'Critical';
          const badgeClass = isCritical
            ? 'bg-rose-100 text-rose-800 border-rose-300'
            : rec.impact === 'High'
            ? 'bg-amber-100 text-amber-800 border-amber-300'
            : 'bg-blue-100 text-blue-800 border-blue-300';

          return (
            <div
              key={idx}
              className="flex flex-col justify-between p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-indigo-300 transition-all shadow-2xs space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                    Fix #{idx + 1}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                    {rec.impact} Priority
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Target className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-700">Target Area:</span>
                  <span className="truncate">{rec.targetSlideOrArea}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {rec.recommendation}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
                <span>Update presentation before final pitch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
