import React, { useState, useRef } from 'react';
import { SAMPLE_PRESENTATION_DECKS } from '../data/sihProblemStatements';
import {
  extractTextFromPptx,
  extractTextFromPdf,
  extractTextFromTextFile,
  ParsedFileResult,
} from '../utils/fileParser';
import {
  Upload,
  FileText,
  Presentation,
  CheckCircle,
  AlertTriangle,
  Flame,
  UserCheck,
  Filter,
  RefreshCw,
  Eye,
} from 'lucide-react';

interface DeckUploaderProps {
  onAuditSubmit: (payload: {
    deckText: string;
    fileBase64?: string;
    mimeType?: string;
    fileName?: string;
    teamName: string;
    strictness: 'grand_finale' | 'mentor' | 'preliminary';
  }) => void;
  isLoading: boolean;
}

export const DeckUploader: React.FC<DeckUploaderProps> = ({ onAuditSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'sample' | 'manual'>('upload');
  const [teamName, setTeamName] = useState('Team Garuda X');
  const [strictness, setStrictness] = useState<'grand_finale' | 'mentor' | 'preliminary'>('grand_finale');
  
  // File state
  const [parsedFile, setParsedFile] = useState<ParsedFileResult | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Manual / Text state
  const [manualText, setManualText] = useState('');

  // Sample state
  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-ndma-strong');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    setIsParsing(true);
    setParseError(null);
    try {
      const lowerName = file.name.toLowerCase();
      let result: ParsedFileResult;

      if (lowerName.endsWith('.pptx')) {
        result = await extractTextFromPptx(file);
      } else if (lowerName.endsWith('.pdf')) {
        result = await extractTextFromPdf(file);
      } else {
        result = await extractTextFromTextFile(file);
      }

      setParsedFile(result);
    } catch (err: any) {
      console.error('File extraction error:', err);
      setParseError(err.message || 'Failed to read file. Please try uploading a PDF or PPTX.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_PRESENTATION_DECKS.find((s) => s.id === sampleId);
    if (!sample) return;
    setSelectedSampleId(sampleId);
    setTeamName(sample.teamName);
    setManualText(sample.content);
    setParsedFile({
      fileName: `${sample.title}.pptx (Simulated)`,
      fileSize: 1024 * 350,
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      extractedText: sample.content,
      slideCount: 7,
    });
  };

  const handleSubmit = () => {
    if (activeTab === 'upload') {
      if (!parsedFile) {
        setParseError('Please select or drop a presentation file (PDF, PPT, PPTX).');
        return;
      }
      onAuditSubmit({
        deckText: parsedFile.extractedText,
        fileBase64: parsedFile.base64,
        mimeType: parsedFile.mimeType,
        fileName: parsedFile.fileName,
        teamName,
        strictness,
      });
    } else if (activeTab === 'manual') {
      if (!manualText.trim()) {
        setParseError('Please enter or paste your slide deck text content.');
        return;
      }
      onAuditSubmit({
        deckText: manualText,
        teamName,
        strictness,
      });
    } else if (activeTab === 'sample') {
      const sample = SAMPLE_PRESENTATION_DECKS.find((s) => s.id === selectedSampleId);
      if (!sample) return;
      onAuditSubmit({
        deckText: sample.content,
        fileName: `${sample.title}.pptx`,
        teamName: sample.teamName,
        strictness,
      });
    }
  };

  return (
    <div id="deck-uploader-card" className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
      {/* Top settings: Team Name & Strictness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-slate-100">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Participant Team Name
          </label>
          <input
            id="team-name-input"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. Team Garuda X"
            className="w-full text-sm font-medium px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Jury Strictness Level
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setStrictness('grand_finale')}
              className={`text-xs py-2 px-1 rounded-lg border font-medium flex items-center justify-center gap-1 transition-all ${
                strictness === 'grand_finale'
                  ? 'bg-red-50 text-red-900 border-red-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-600" />
              <span>Grand Finale</span>
            </button>
            <button
              type="button"
              onClick={() => setStrictness('preliminary')}
              className={`text-xs py-2 px-1 rounded-lg border font-medium flex items-center justify-center gap-1 transition-all ${
                strictness === 'preliminary'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <span>Screening</span>
            </button>
            <button
              type="button"
              onClick={() => setStrictness('mentor')}
              className={`text-xs py-2 px-1 rounded-lg border font-medium flex items-center justify-center gap-1 transition-all ${
                strictness === 'mentor'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mentor Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-sm font-medium">
        <button
          id="tab-upload"
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`pb-2.5 px-4 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'upload'
              ? 'border-amber-600 text-amber-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload PDF / PPTX</span>
        </button>
        <button
          id="tab-sample"
          type="button"
          onClick={() => setActiveTab('sample')}
          className={`pb-2.5 px-4 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'sample'
              ? 'border-amber-600 text-amber-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>Sample SIH Decks</span>
        </button>
        <button
          id="tab-manual"
          type="button"
          onClick={() => setActiveTab('manual')}
          className={`pb-2.5 px-4 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'manual'
              ? 'border-amber-600 text-amber-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Paste Slide Text</span>
        </button>
      </div>

      {/* TAB 1: Upload */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <div
            id="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-amber-50/20"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.pptx,.ppt,.txt,image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Click or drag your SIH presentation PDF / PPTX here
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accepts PDF (native visual &amp; text inspection), PPTX (instant slide text extraction), PPT, or images
                </p>
              </div>
            </div>
          </div>

          {isParsing && (
            <div className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>Analyzing presentation structure and extracting slide nodes...</span>
            </div>
          )}

          {parsedFile && (
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-950">{parsedFile.fileName}</p>
                  <p className="text-xs text-emerald-800">
                    {(parsedFile.fileSize / 1024).toFixed(1)} KB •{' '}
                    {parsedFile.slideCount ? `${parsedFile.slideCount} slides parsed` : 'PDF document ready'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setParsedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Change
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Sample Decks */}
      {activeTab === 'sample' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Select an official benchmark deck to test how the Chief Jury evaluates high-scoring vs. generic wrapper entries:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_PRESENTATION_DECKS.map((sample) => {
              const isSelected = sample.id === selectedSampleId;
              return (
                <div
                  key={sample.id}
                  onClick={() => handleLoadSample(sample.id)}
                  className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/90 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                      {sample.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{sample.teamName}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{sample.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-3 leading-normal">
                    {sample.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Manual Text / Notes */}
      {activeTab === 'manual' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Paste Presentation Slides / Pitch Deck Content
            </label>
            <span className="text-[11px] text-slate-400">
              Use "SLIDE 1: ...", "SLIDE 2: ..." format for best evaluation
            </span>
          </div>
          <textarea
            id="manual-pitch-text"
            rows={7}
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder={`SLIDE 1: Title, Team, and PS Code\nSLIDE 2: Problem Understanding & Ground Bottlenecks\nSLIDE 3: Proposed Architecture & Tech Stack\nSLIDE 4: Working Prototype & Hardware Schematics\nSLIDE 5: 36-Hour Hackathon Implementation Milestones\nSLIDE 6: Viability, Cost & Government Integration`}
            className="w-full text-xs font-mono p-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      )}

      {parseError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{parseError}</span>
        </div>
      )}

      {/* Action CTA */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span>Audited against SIH 2026 Grand Finale 100-point rubric</span>
        </div>
        <button
          id="run-audit-button"
          type="button"
          disabled={isLoading}
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-sm rounded-lg shadow-md shadow-amber-900/20 disabled:opacity-60 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Jury Deliberating &amp; Auditing...</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4" />
              <span>Submit to Chief Jury Panel</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
