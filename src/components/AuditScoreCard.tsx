import React from 'react';
import { SIHAuditResult } from '../types';
import { Trophy, CheckCircle2, Clock, XCircle, Copy, Check, Printer, MessageSquareCode } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuditScoreCardProps {
  result: SIHAuditResult;
  teamName: string;
  onJumpToQA: () => void;
  onCopyMarkdown: () => void;
  copied: boolean;
  onPrint: () => void;
}

export const AuditScoreCard: React.FC<AuditScoreCardProps> = ({
  result,
  teamName,
  onJumpToQA,
  onCopyMarkdown,
  copied,
  onPrint,
}) => {
  const isShortlisted = result.verdictType === 'shortlisted';
  const isWaitlisted = result.verdictType === 'waitlisted';

  React.useEffect(() => {
    if (isShortlisted) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isShortlisted]);

  // Color mappings
  const verdictTheme = isShortlisted
    ? {
        border: 'border-emerald-300',
        bg: 'bg-emerald-50/70',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        scoreColor: 'text-emerald-700',
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      }
    : isWaitlisted
    ? {
        border: 'border-amber-300',
        bg: 'bg-amber-50/70',
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
        scoreColor: 'text-amber-700',
        icon: <Clock className="w-5 h-5 text-amber-600 shrink-0" />,
      }
    : {
        border: 'border-rose-300',
        bg: 'bg-rose-50/70',
        badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
        scoreColor: 'text-rose-700',
        icon: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
      };

  return (
    <div
      id="sih-audit-scorecard"
      className={`rounded-2xl border ${verdictTheme.border} ${verdictTheme.bg} p-6 shadow-sm transition-all`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left: Verdict and Executive Summary */}
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              id="shortlist-verdict-badge"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${verdictTheme.badgeBg}`}
            >
              {verdictTheme.icon}
              <span>{result.shortlistVerdict}</span>
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {teamName} • SIH 2026 Audit
            </span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              Chief Jury Executive Verdict
            </h2>
            <p
              id="summary-verdict-text"
              className="text-sm text-slate-700 font-medium leading-relaxed bg-white/80 p-3.5 rounded-xl border border-slate-200/80"
            >
              {result.summaryVerdict}
            </p>
          </div>

          {result.juryMemberNotes?.chiefJudgePersonaVerdict && (
            <div className="text-xs text-slate-600 italic bg-white/50 p-2.5 rounded-lg border border-slate-200/50 flex items-start gap-2">
              <span className="font-semibold text-amber-800 not-italic">Lead Jury Note:</span>
              <span>"{result.juryMemberNotes.chiefJudgePersonaVerdict}"</span>
            </div>
          )}
        </div>

        {/* Right: Score Gauge & Actions */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-200 shadow-xs min-w-[220px]">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Overall SIH Audit Score
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span
              id="overall-score-display"
              className={`text-5xl sm:text-6xl font-extrabold tracking-tight ${verdictTheme.scoreColor}`}
            >
              {result.overallScore}
            </span>
            <span className="text-lg font-bold text-slate-400">/ 100</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden my-1">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isShortlisted ? 'bg-emerald-500' : isWaitlisted ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(result.overallScore, 100)}%` }}
            />
          </div>

          <span className="text-[11px] text-slate-500 mt-1 font-medium">
            Grand Finale Benchmark: ≥ 75 Pts
          </span>

          <div className="flex items-center gap-2 mt-4 w-full">
            <button
              id="copy-markdown-button"
              type="button"
              onClick={onCopyMarkdown}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              title="Copy SIH required output markdown format"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Output'}</span>
            </button>
            <button
              id="practice-qa-anchor-button"
              type="button"
              onClick={onJumpToQA}
              className="inline-flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-200 transition-colors"
              title="Practice hard jury questions"
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Practice Q&amp;A</span>
            </button>
            <button
              id="print-sheet-button"
              type="button"
              onClick={onPrint}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Print Jury Evaluation Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
