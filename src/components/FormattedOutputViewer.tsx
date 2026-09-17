import React, { useState } from 'react';
import { Copy, Check, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface FormattedOutputViewerProps {
  rawMarkdown: string;
  onCopy: () => void;
  copied: boolean;
}

export const FormattedOutputViewer: React.FC<FormattedOutputViewerProps> = ({
  rawMarkdown,
  onCopy,
  copied,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="formatted-markdown-export-card" className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-sm p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">
            Official SIH Evaluation Report (Standard Format)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Formatted Report'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Ready for SIH evaluation sheets, hackathon committee records, or mentor review.
      </p>

      {/* Code / Markdown snippet */}
      <div
        className={`bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-200 border border-slate-800/80 overflow-x-auto whitespace-pre-wrap leading-relaxed transition-all ${
          isExpanded ? 'max-h-none' : 'max-h-48 overflow-y-auto'
        }`}
      >
        {rawMarkdown}
      </div>
    </div>
  );
};
