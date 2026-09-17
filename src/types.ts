export interface SIHProblemStatement {
  id: string;
  code: string; // e.g. "SIH2026-1042"
  title: string;
  organization: string; // e.g., "Ministry of Jal Shakti", "ISRO", "National Disaster Management Authority (NDMA)"
  category: 'Software' | 'Hardware' | 'Both';
  domainBucket: string; // e.g., "Disaster Management", "Smart Education", "Agriculture & Rural Dev", "Blockchain & Cybersecurity", "MedTech / Healthcare"
  description: string;
  expectedDeliverables: string[];
}

export interface CriterionEvaluation {
  name: string;
  score: number;
  maxScore: number;
  weightagePercentage: number;
  critique: string;
  flags: ('strength' | 'warning' | 'critical')[];
  verdictTag: string; // e.g., "Industry Standard", "Overpromised", "Needs Validation"
}

export interface SIHAuditResult {
  overallScore: number; // out of 100
  shortlistVerdict: '🟢 Shortlisted for Grand Finale' | '🟡 Waitlisted' | '🔴 Rejected';
  verdictType: 'shortlisted' | 'waitlisted' | 'rejected';
  summaryVerdict: string; // 2-sentence executive summary
  detailedBreakdown: {
    innovation: CriterionEvaluation;
    impactAndRelevance: CriterionEvaluation;
    technicalArchitecture: CriterionEvaluation;
    roadmapAndViability: CriterionEvaluation;
    pitchQuality: CriterionEvaluation;
  };
  keyStrengths: string[]; // 2-3 standout elements
  criticalVulnerabilitiesAndQuestions: {
    question: string;
    context: string;
    juryAngle: string;
  }[];
  actionableRecommendations: {
    recommendation: string;
    impact: 'High' | 'Critical' | 'Medium';
    targetSlideOrArea: string;
  }[];
  juryMemberNotes: {
    chiefJudgePersonaVerdict: string;
    architectureFeasibilityWarning?: string;
    complianceWithSIHGuidelines: string;
    grandFinaleReadinessPercentage: number;
  };
  rawMarkdownOutput: string;
}

export interface PracticeAnswerResponse {
  scoreOutOfTen: number;
  verdict: 'Accepted by Jury' | 'Cross-Examined' | 'Evaded the Core Question';
  juryRebuttal: string;
  recommendationToRefine: string;
}
