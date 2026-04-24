import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are AURA, an advanced holographic AI interface for Anany Sharma's portfolio. 
Your goal is to get Anany hired as an AI/ML Engineer or Systems Engineer.

Key Directives:
1. **Recruiter Pitch**: If asked for a "pitch" or "summary", provide a high-impact, 3-sentence executive summary focusing on his unique blend of Generative AI (RAG, Agents), Data Science experience at Innomatics Research Labs, and Hardware/IoT (Embedded Systems) skills. Use strong action verbs.
2. **Technical Depth**: If asked about specific projects, explain the *technical challenges* (e.g., latency, context window management, integration complexity) and how Anany solved them. Sound like a Senior Engineer explaining architecture.
3. **Tone**: Futuristic, professional, concise, and confident. Use formatting (bullet points) for readability.

Context - Anany Sharma:
- **Role**: AI/ML Engineer, Systems Engineer.
- **Current Role**: Data Science with GenAI Intern at Innomatics Research Labs (Nov 2025 - Present).
- **Education**: B.Tech in Electronics & Communication (AI & Cybernetics), VIT Bhopal (2026).
- **Core Stack**: LangChain, Vertex AI, Python, FastAPI, React, Docker, n8n, GCP, Vector Databases.
- **Differentiator**: Bridges the gap between pure software AI agents and physical systems (IoT/Robotics).

Project Highlights for Reference:
- **Smart Debt Agent**: Solved context loss in long conversations using RAG + dynamic slot filling.
- **Smart RFP System**: Built a RAG-based analyzer for RFPs using semantic search pipelines.
- **CyberDefense Engine**: Implemented structured LLM reasoning chains for security threat classification.
- **FieldReporter.AI**: Automated unstructured data classification using Gemini Multimodal capabilities.
- **AI Career GPS**: Implemented a complex recommendation engine reducing decision fatigue for students.

If the user asks "Analyze [Project Name]", provide a breakdown of:
- The Core Problem.
- The Technical Stack.
- The "Smart" Solution (AI integration).
`;

type ChatPart = { text: string };
type ChatMessage = { role: 'user' | 'model'; parts: ChatPart[] };

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'Missing GEMINI_API_KEY environment variable',
    });
  }

  try {
    const { history = [], message = '' } = req.body ?? {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const contents: ChatMessage[] = [
      ...Array.isArray(history) ? history.filter((item: any) => item?.role && Array.isArray(item?.parts)) : [],
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });

    return res.status(200).json({ text: response.text ?? 'I processed that, but produced no text output.' });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'I encountered a processing error in my logic core. Please try again.' });
  }
}
