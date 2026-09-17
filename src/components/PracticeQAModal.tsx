import React, { useState } from 'react';
import { PracticeAnswerResponse } from '../types';
import { MessageSquare, X, Send, Award, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PracticeQAModalProps {
  questionObj: { question: string; context: string } | null;
  onClose: () => void;
  problemTitle: string;
  teamName: string;
}

export const PracticeQAModal: React.FC<PracticeQAModalProps> = ({
  questionObj,
  onClose,
  problemTitle,
  teamName,
}) => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PracticeAnswerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!questionObj) return null;

  const handleDefend = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/practice-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionObj.question,
          answer,
          problemTitle,
          teamName,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to evaluate defense answer.');
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error communicating with jury.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        id="practice-qa-dialog"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold">Jury Cross-Examination Defense Simulator</h3>
              <p className="text-xs text-slate-400">Test your team's live Q&amp;A response with Chief Jury feedback</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Question Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Chief Jury Cross-Examination Question
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              "{questionObj.question}"
            </p>
            {questionObj.context && (
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Underlying Concern: </span>
                {questionObj.context}
              </p>
            )}
          </div>

          {/* Student Defense Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Your Team's Planned Defense / Answer
            </label>
            <textarea
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Be quantitative, mention exact protocols, latency numbers, fallback modes, and architectural safeguards..."
              className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Jury Cross-Examination Verdict
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      result.scoreOutOfTen >= 8
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : result.scoreOutOfTen >= 5
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}
                  >
                    {result.verdict}
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {result.scoreOutOfTen} / 10
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200/80 space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase">Chief Jury Direct Rebuttal</p>
                <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                  "{result.juryRebuttal}"
                </p>
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100 space-y-1">
                <p className="text-xs font-semibold text-indigo-900 uppercase">How to Refine Before Grand Finale</p>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                  {result.recommendationToRefine}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
          <button
            type="button"
            disabled={loading || !answer.trim()}
            onClick={handleDefend}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating Response...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Defense to Jury</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
