import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Allow large payloads for base64 presentations (PDF / image slides)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Lazy Gemini client helper
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Evaluation endpoint
app.post("/api/evaluate", async (req, res) => {
  try {
    const {
      problemStatement,
      deckText,
      fileBase64,
      mimeType,
      strictness = "grand_finale",
      teamName = "Team Participant",
    } = req.body;

    if (!deckText && !fileBase64) {
      return res.status(400).json({
        error: "Please provide either presentation text content or an uploaded PDF/image document.",
      });
    }

    const ai = getGeminiClient();

    const strictnessGuideline =
      strictness === "mentor"
        ? "Adopt the tone of a tough but encouraging National Mentor helping the team prepare before the final round."
        : strictness === "preliminary"
        ? "Adopt the tone of an initial internal screening evaluator filtering out non-viable submissions."
        : "Adopt the tone of a veteran Chief Jury Member & Technical Expert at the SIH 2026 Grand Finale: uncompromisingly rigorous, technically deep, demanding real proof, and zero tolerance for generic AI wrappers or buzzword fluff.";

    const systemInstruction = `You are a veteran Chief Jury Member, Technical Expert, and Evaluation Panel Lead for the Smart India Hackathon (SIH 2026).
Your job is to rigorously audit, score, and critique uploaded project presentation PDFs, PPTs, or deck summaries with the strictness, depth, and constructive insight of a top-tier hackathon judge.

CRITICAL EVALUATION CRITERIA & WEIGHTAGE:
1. Innovation & Novelty (Max 25): Is the idea truly unique? Does it avoid being a generic wrapper or recycled solution? Does it use modern tech (AI, IoT, Blockchain, Web3, etc.) meaningfully?
2. Problem Understanding & Social/Industry Impact (Max 25): How well does it solve the core pain point of the problem statement? What is the scale of its real-world impact?
3. Technical Feasibility & Architecture (Max 20): Is the proposed tech stack realistic, secure, and scalable? Can a working MVP be realistically built within 36 hours?
4. Implementation Roadmap & Sustainability (Max 15): Is there a clear execution timeline, deployment strategy, cost breakdown, and long-term viability model?
5. Pitch Presentation & Structure (Max 15): Is the deck concise, professional, data-driven, and persuasive?

SCORE & SHORTLIST VERDICT BENCHMARK:
- Total Score = Sum of all 5 criteria (out of 100).
- Shortlist Verdict:
  * 🟢 Shortlisted for Grand Finale (Score >= 75): Truly exceptional, novel, rock-solid architecture, clear real-world deployment path.
  * 🟡 Waitlisted (Score 50-74): Good ideas, but has critical architecture flaws, overpromises, or lacks measurable proof/hardware feasibility.
  * 🔴 Rejected (Score < 50): Generic ChatGPT/AI wrapper, ignores physical/network constraints, shallow pitch, zero technical depth.

${strictnessGuideline}

You must return valid JSON strictly adhering to the schema. Also format the 'rawMarkdownOutput' field matching the exact structure requested by SIH:
- **Overall SIH Audit Score:** [X / 100]
- **Shortlist Verdict:** [🟢 Shortlisted for Grand Finale / 🟡 Waitlisted / 🔴 Rejected]
- **Summary Verdict:** A 2-sentence executive summary of why the project received this score.

#### 📊 Detailed Criterion Breakdown
* **Innovation:** [Score/25] - [Short critique]
* **Impact & Relevance:** [Score/25] - [Short critique]
* **Technical Architecture:** [Score/20] - [Short critique]
* **Roadmap & Viability:** [Score/15] - [Short critique]
* **Pitch Quality:** [Score/15] - [Short critique]

#### 🚀 Key Strengths
* (List 2-3 standout elements of the presentation/idea)

#### ⚠️ Critical Vulnerabilities & Hard Jury Questions
* (List 3 tough, probing questions that real judges would ask during the Q&A round to test the team's depth)

#### 🛠️ Actionable Recommendations to Secure a Win
* (Provide 3 concrete, high-impact changes the team must make to their PPT or project execution to guarantee selection)`;

    const psContext = problemStatement
      ? `
TARGET SIH 2026 PROBLEM STATEMENT:
- Code: ${problemStatement.code || "Unspecified"}
- Title: ${problemStatement.title || "Custom Challenge"}
- Ministry / Organization: ${problemStatement.organization || "Govt of India / PSU"}
- Category: ${problemStatement.category || "Software"}
- Domain Bucket: ${problemStatement.domainBucket || "General Tech"}
- Detailed Description: ${problemStatement.description || "N/A"}
- Expected Deliverables: ${
          Array.isArray(problemStatement.expectedDeliverables)
            ? problemStatement.expectedDeliverables.join("; ")
            : "Functional Prototype"
        }
`
      : "TARGET PROBLEM STATEMENT: General Smart India Hackathon Open Innovation Challenge";

    const promptText = `
${psContext}

TEAM NAME: ${teamName}

PRESENTATION CONTENT TO AUDIT:
${deckText || "Please inspect the attached presentation file thoroughly."}

Perform the comprehensive SIH 2026 Chief Jury evaluation now. Be mathematically accurate with the scores (overallScore MUST equal the sum of innovation.score + impactAndRelevance.score + technicalArchitecture.score + roadmapAndViability.score + pitchQuality.score).
`;

    const contentsPayload: any = [];

    if (fileBase64 && mimeType) {
      contentsPayload.push({
        inlineData: {
          mimeType: mimeType,
          data: fileBase64,
        },
      });
    }

    contentsPayload.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contentsPayload,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: {
              type: Type.NUMBER,
              description: "Total score out of 100",
            },
            shortlistVerdict: {
              type: Type.STRING,
              description: "🟢 Shortlisted for Grand Finale, 🟡 Waitlisted, or 🔴 Rejected",
            },
            verdictType: {
              type: Type.STRING,
              description: "'shortlisted', 'waitlisted', or 'rejected'",
            },
            summaryVerdict: {
              type: Type.STRING,
              description: "A 2-sentence executive summary of why the project received this score.",
            },
            detailedBreakdown: {
              type: Type.OBJECT,
              properties: {
                innovation: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    maxScore: { type: Type.NUMBER },
                    weightagePercentage: { type: Type.NUMBER },
                    critique: { type: Type.STRING },
                    verdictTag: { type: Type.STRING },
                  },
                  required: ["name", "score", "maxScore", "weightagePercentage", "critique", "verdictTag"],
                },
                impactAndRelevance: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    maxScore: { type: Type.NUMBER },
                    weightagePercentage: { type: Type.NUMBER },
                    critique: { type: Type.STRING },
                    verdictTag: { type: Type.STRING },
                  },
                  required: ["name", "score", "maxScore", "weightagePercentage", "critique", "verdictTag"],
                },
                technicalArchitecture: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    maxScore: { type: Type.NUMBER },
                    weightagePercentage: { type: Type.NUMBER },
                    critique: { type: Type.STRING },
                    verdictTag: { type: Type.STRING },
                  },
                  required: ["name", "score", "maxScore", "weightagePercentage", "critique", "verdictTag"],
                },
                roadmapAndViability: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    maxScore: { type: Type.NUMBER },
                    weightagePercentage: { type: Type.NUMBER },
                    critique: { type: Type.STRING },
                    verdictTag: { type: Type.STRING },
                  },
                  required: ["name", "score", "maxScore", "weightagePercentage", "critique", "verdictTag"],
                },
                pitchQuality: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    maxScore: { type: Type.NUMBER },
                    weightagePercentage: { type: Type.NUMBER },
                    critique: { type: Type.STRING },
                    verdictTag: { type: Type.STRING },
                  },
                  required: ["name", "score", "maxScore", "weightagePercentage", "critique", "verdictTag"],
                },
              },
              required: [
                "innovation",
                "impactAndRelevance",
                "technicalArchitecture",
                "roadmapAndViability",
                "pitchQuality",
              ],
            },
            keyStrengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 standout elements of the presentation/idea",
            },
            criticalVulnerabilitiesAndQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  context: { type: Type.STRING },
                  juryAngle: { type: Type.STRING },
                },
                required: ["question", "context", "juryAngle"],
              },
              description: "3 tough probing questions with context",
            },
            actionableRecommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  recommendation: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  targetSlideOrArea: { type: Type.STRING },
                },
                required: ["recommendation", "impact", "targetSlideOrArea"],
              },
              description: "3 concrete, high-impact changes",
            },
            juryMemberNotes: {
              type: Type.OBJECT,
              properties: {
                chiefJudgePersonaVerdict: { type: Type.STRING },
                complianceWithSIHGuidelines: { type: Type.STRING },
                grandFinaleReadinessPercentage: { type: Type.NUMBER },
              },
              required: ["chiefJudgePersonaVerdict", "complianceWithSIHGuidelines", "grandFinaleReadinessPercentage"],
            },
            rawMarkdownOutput: {
              type: Type.STRING,
              description: "Exact formatted markdown presentation audit conforming to user prompt specification",
            },
          },
          required: [
            "overallScore",
            "shortlistVerdict",
            "verdictType",
            "summaryVerdict",
            "detailedBreakdown",
            "keyStrengths",
            "criticalVulnerabilitiesAndQuestions",
            "actionableRecommendations",
            "juryMemberNotes",
            "rawMarkdownOutput",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Evaluation error:", error);
    return res.status(500).json({
      error: error?.message || "Failed to generate SIH jury evaluation.",
    });
  }
});

// Q&A Defense Practice Simulator
app.post("/api/practice-qa", async (req, res) => {
  try {
    const { question, answer, problemTitle, teamName } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Question and team answer are required." });
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `
You are the SIH 2026 Chief Jury Member presiding over the Q&A cross-examination round.
Problem Context: ${problemTitle || "SIH 2026 Hackathon Challenge"}
Team Name: ${teamName || "Participant Team"}

THE JURY QUESTION POSED:
"${question}"

THE TEAM'S DEFENSE / ANSWER:
"${answer}"

Evaluate the team's response strictly:
1. Did they answer the core technical/operational bottleneck, or did they evade with buzzwords?
2. Score out of 10.
3. Verdict: 'Accepted by Jury' (8-10), 'Cross-Examined' (5-7), or 'Evaded the Core Question' (0-4).
4. Direct jury rebuttal quote (realistic, sharp hackathon judge feedback).
5. Exact recommendation on how to strengthen their defense with metrics/architecture proof.
`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scoreOutOfTen: { type: Type.NUMBER },
            verdict: { type: Type.STRING },
            juryRebuttal: { type: Type.STRING },
            recommendationToRefine: { type: Type.STRING },
          },
          required: ["scoreOutOfTen", "verdict", "juryRebuttal", "recommendationToRefine"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return res.json(result);
  } catch (error: any) {
    console.error("Practice QA error:", error);
    return res.status(500).json({ error: error?.message || "Failed to evaluate answer." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIH 2026 Jury Room server running on http://localhost:${PORT}`);
  });
}

startServer();
