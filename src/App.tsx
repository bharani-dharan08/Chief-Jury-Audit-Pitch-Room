import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ProblemStatementSelector } from './components/ProblemStatementSelector';
import { DeckUploader } from './components/DeckUploader';
import { AuditScoreCard } from './components/AuditScoreCard';
import { CriterionBreakdown } from './components/CriterionBreakdown';
import { StrengthsAndVulnerabilities } from './components/StrengthsAndVulnerabilities';
import { ActionableRecommendations } from './components/ActionableRecommendations';
import { FormattedOutputViewer } from './components/FormattedOutputViewer';
import { PracticeQAModal } from './components/PracticeQAModal';
import { GuidelinesModal } from './components/GuidelinesModal';
import { OFFICIAL_SIH_PROBLEM_STATEMENTS, SAMPLE_PRESENTATION_DECKS } from './data/sihProblemStatements';
import { SIHAuditResult, SIHProblemStatement } from './types';
import { Scale, AlertTriangle, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [selectedPS, setSelectedPS] = useState<SIHProblemStatement>(OFFICIAL_SIH_PROBLEM_STATEMENTS[0]);
  const [auditResult, setAuditResult] = useState<SIHAuditResult | null>(null);
  const [teamName, setTeamName] = useState('Team Garuda X');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Practice QA Modal state
  const [activePracticeQuestion, setActivePracticeQuestion] = useState<{ question: string; context: string } | null>(null);
  
  // Guidelines modal
  const [showGuidelines, setShowGuidelines] = useState(false);

  // Copy feedback
  const [copied, setCopied] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-run initial evaluation on first mount so the user immediately sees a live Grand Finale jury audit!
  useEffect(() => {
    handleInitialAudit();
  }, []);

  const handleInitialAudit = async () => {
    const sample = SAMPLE_PRESENTATION_DECKS[0];
    setTeamName(sample.teamName);
    await executeAudit({
      deckText: sample.content,
      teamName: sample.teamName,
      strictness: 'grand_finale',
    });
  };

  const executeAudit = async (payload: {
    deckText: string;
    fileBase64?: string;
    mimeType?: string;
    fileName?: string;
    teamName: string;
    strictness: 'grand_finale' | 'mentor' | 'preliminary';
  }) => {
    setIsLoading(true);
    setApiError(null);
    setTeamName(payload.teamName);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemStatement: selectedPS,
          deckText: payload.deckText,
          fileBase64: payload.fileBase64,
          mimeType: payload.mimeType,
          strictness: payload.strictness,
          teamName: payload.teamName,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${response.status}`);
      }

      const data: SIHAuditResult = await response.json();
      setAuditResult(data);

      // Smooth scroll down to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Audit execution error:', err);
      setApiError(err.message || 'Failed to complete jury audit.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!auditResult?.rawMarkdownOutput) return;
    navigator.clipboard.writeText(auditResult.rawMarkdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased">
      <Header onOpenGuidelines={() => setShowGuidelines(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Top Notification Banner */}
        <div className="bg-amber-900/90 text-amber-100 p-3 sm:p-4 rounded-xl shadow-xs border border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>Smart India Hackathon 2026 Grand Finale Standards Active:</strong> Rigorous 5-pillar scoring (Innovation, Impact, Architecture, Roadmap, Pitch) strictly enforced.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowGuidelines(true)}
            className="self-start sm:self-auto text-xs font-semibold text-amber-300 hover:text-white underline shrink-0 cursor-pointer"
          >
            Review 100-Pt Rubric &rarr;
          </button>
        </div>

        {/* Section 1: Problem Statement Selection */}
        <ProblemStatementSelector
          selectedPS={selectedPS}
          onSelectPS={(ps) => setSelectedPS(ps)}
          onCustomEdit={(ps) => setSelectedPS(ps)}
        />

        {/* Section 2: Deck Uploader & Config */}
        <DeckUploader
          onAuditSubmit={executeAudit}
          isLoading={isLoading}
        />

        {apiError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Chief Jury Audit Failed to Execute</p>
              <p className="mt-0.5">{apiError}</p>
            </div>
          </div>
        )}

        {/* Section 3: Audit Results View */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RefreshCw className="w-7 h-7 animate-spin" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Grand Finale Jury Room in Session
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
                Cross-examining presentation technical architecture against {selectedPS.code} guidelines, inspecting edge feasibility, and generating hard questions...
              </p>
            </div>
          </div>
        )}

        {auditResult && !isLoading && (
          <div ref={resultsRef} className="space-y-6 pt-2">
            {/* Overall Score & Shortlist Verdict */}
            <AuditScoreCard
              result={auditResult}
              teamName={teamName}
              onJumpToQA={() => {
                const firstQ = auditResult.criticalVulnerabilitiesAndQuestions?.[0];
                if (firstQ) {
                  setActivePracticeQuestion(firstQ);
                }
              }}
              onCopyMarkdown={handleCopyMarkdown}
              copied={copied}
              onPrint={handlePrint}
            />

            {/* Detailed 5-Criterion Breakdown */}
            <CriterionBreakdown breakdown={auditResult.detailedBreakdown} />

            {/* Key Strengths & 3 Hard Jury Questions */}
            <StrengthsAndVulnerabilities
              strengths={auditResult.keyStrengths}
              vulnerabilities={auditResult.criticalVulnerabilitiesAndQuestions}
              onSelectQuestionForPractice={(q) => setActivePracticeQuestion(q)}
            />

            {/* 3 Actionable Recommendations to Secure a Win */}
            <ActionableRecommendations
              recommendations={auditResult.actionableRecommendations}
            />

            {/* Formatted Markdown Output Viewer */}
            <FormattedOutputViewer
              rawMarkdown={auditResult.rawMarkdownOutput}
              onCopy={handleCopyMarkdown}
              copied={copied}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p className="font-semibold text-slate-700">
            Smart India Hackathon (SIH 2026) • Official Chief Jury Audit &amp; Technical Evaluation Suite
          </p>
          <p>
            Standardized evaluation parameters: Innovation (25%), Social/Industry Impact (25%), Technical Architecture (20%), Roadmap &amp; Sustainability (15%), Pitch Quality (15%).
          </p>
        </div>
      </footer>

      {/* Q&A Practice Simulator Modal */}
      {activePracticeQuestion && (
        <PracticeQAModal
          questionObj={activePracticeQuestion}
          onClose={() => setActivePracticeQuestion(null)}
          problemTitle={selectedPS.title}
          teamName={teamName}
        />
      )}

      {/* Guidelines Rubric Modal */}
      <GuidelinesModal
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
      />
    </div>
  );
}
