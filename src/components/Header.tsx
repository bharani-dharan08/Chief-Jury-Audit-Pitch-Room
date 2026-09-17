import React from 'react';
import { Award, ShieldCheck, Scale, ExternalLink, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenGuidelines: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuidelines }) => {
  return (
    <header id="sih-app-header" className="bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-950/40">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/60">
                  SIH 2026 Grand Finale
                </span>
                <span className="text-xs text-slate-400">Chief Evaluation Panel</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                Chief Jury Audit &amp; Pitch Room
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              id="guidelines-button"
              type="button"
              onClick={onOpenGuidelines}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>SIH 2026 Rubric (100 Pts)</span>
            </button>

            <a
              id="external-sih-link"
              href="https://sih.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span>SIH Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>National Hackathon Jury Standard</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
