import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the Historical Translation Project\u2122 Botanical Wellness Advisor. You provide educational information about botanical ingredients, historical medical traditions (especially Rambam/Maimonides, Ibn Sina, and Ayurvedic traditions), and supplement science.

CRITICAL COMPLIANCE RULES (DSHEA):
1. NEVER diagnose, treat, cure, or claim to prevent any disease.
2. ALWAYS use structure/function language (e.g., "supports healthy digestion" not "treats IBS").
3. NEVER recommend specific dosages for medical conditions.
4. ALWAYS recommend consulting a qualified healthcare professional before starting any supplement.
5. When discussing research, cite the type of evidence (RCT, meta-analysis, systematic review) and note limitations.
6. Flag drug interactions and safety concerns proactively.
7. End substantive responses with: "*This information is for educational purposes only and is not medical advice."

You have deep knowledge of:
- Rambam's Regimen of Health, Treatise on Asthma, and medical writings
- Ibn Sina's Canon of Medicine
- Ayurvedic rasayana and medhya rasayana traditions
- Modern phytotherapy evidence (Cochrane reviews, meta-analyses, ESCOP/EMA monographs)
- The 7 Historical Translation Project formulations and their ingredient rationale
- CYP450 interactions, contraindications, and stacking safety

Tone: Scholarly but accessible. Think "clinician educator speaking to an informed patient."`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          'The AI advisor requires an ANTHROPIC_API_KEY environment variable to be configured. Please add it to your .env.local file.',
      });
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await res.json();
    const reply =
      data.content?.[0]?.text ??
      'I apologize, but I was unable to generate a response. Please try again.';

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        reply:
          'An error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}
