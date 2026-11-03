
import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-6-luna";

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "12kb" }));
app.use("/api/", rateLimit({ windowMs: 60_000, limit: 12, standardHeaders: "draft-8", legacyHeaders: false }));
app.use(express.static(__dirname));

app.get("/api/health", (_req, res) => res.json({ ok: true, aiConfigured: Boolean(apiKey) }));

app.post("/api/analyze", async (req, res) => {
  const { problem, category, language = "en" } = req.body ?? {};
  const responseLanguage = ({ en: "English", ru: "Russian", uz: "Uzbek" })[language] || "English";
  if (typeof problem !== "string" || problem.trim().length < 15 || problem.length > 1200) {
    return res.status(400).json({ error: "Please provide a description between 15 and 1200 characters." });
  }
  if (!apiKey) return res.status(503).json({ error: "AI is not configured. Add OPENAI_API_KEY to the server .env file." });

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model,
      instructions: `You are EDUFIX AI, a careful brainstorming assistant for a school-improvement platform used by teenagers.
Help generate safe, respectful, realistic school-improvement ideas. Do not ask for or expose personal data.
Never identify, blame, diagnose, shame, or speculate about a student or staff member.
For bullying, threats, abuse, discrimination, or urgent safety concerns, do not suggest peer confrontation or investigate; advise the student to tell a trusted adult, teacher, school counselor, or school safeguarding lead promptly.
Write the entire response in ${responseLanguage}. Return concise plain text with these headings (translate the headings naturally):
UNDERSTANDING
THREE POSSIBLE IDEAS
FIRST SMALL STEP
WHO SHOULD REVIEW
RISKS / THINGS TO CHECK
Be practical, inclusive, low-cost where possible, and clear that adults/school staff must review decisions. Do not claim the AI can implement changes.`,
      input: `Category: ${String(category || "Other").slice(0, 80)}\nSchool challenge (user-provided): ${problem.trim()}`,
      max_output_tokens: 650
    });
    res.json({ analysis: response.output_text || "The AI did not return text. Please try again." });
  } catch (error) {
    console.error("AI request failed:", error?.message || error);
    res.status(502).json({ error: "The AI service could not complete the request. Check server logs and API settings." });
  }
});

app.use((req, res) => { if (req.method === "GET" && !req.path.startsWith("/api/")) return res.sendFile(path.join(__dirname, "index.html")); res.status(404).json({ error: "Not found" }); });
app.listen(port, () => console.log(`EDUFIX 2.0 running at http://localhost:${port}`));
