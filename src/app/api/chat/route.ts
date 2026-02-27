import { NextRequest, NextResponse } from 'next/server';
import { formulations } from '@/data/formulations';
import { ingredientMonographs } from '@/data/monographs';
import { siteConfig } from '@/data/site';

/* ═══════════════════════════════════════════════════════════════
   BUILD DYNAMIC KNOWLEDGE BASE FROM formulations.ts
   
   This runs on every request so the AI always has the latest data.
   When you add/edit/remove formulations in formulations.ts,
   the advisor automatically picks up the changes.
   ═══════════════════════════════════════════════════════════════ */

function buildFormulationKnowledge(): string {
  return formulations
    .map((f) => {
      const ingredients = f.keyIngredients
        .map((ing) => {
          let line = `  • ${ing.name}`;
          if (ing.arabicName) line += ` (Arabic: ${ing.arabicName})`;
          if (ing.hebrewName) line += ` (Hebrew: ${ing.hebrewName})`;
          line += `\n    Role: ${ing.role}`;
          if (ing.modernEquivalent) line += `\n    Modern ID: ${ing.modernEquivalent}`;
          return line;
        })
        .join('\n');

      return `
──────────────────────────────────
FORMULATION: ${f.name}
Trade Code: ${f.tradeName}
Category: ${f.category}
Slug: ${f.slug}
Tagline: ${f.tagline}
Research Status: ${f.researchStatus}
Price: ${f.price !== null ? `$${(f.price / 100).toFixed(2)}` : 'Not yet established — pricing coming soon'}
Available for Purchase: ${f.availableForPurchase ? 'Yes' : 'Not yet — coming soon'}
${f.productUrl ? `Product URL: ${f.productUrl}` : ''}

HISTORICAL SOURCE:
  Title: ${f.historicalSource}
  ${f.historicalSourceArabic ? `Arabic: ${f.historicalSourceArabic}` : ''}
  ${f.historicalSourceHebrew ? `Hebrew: ${f.historicalSourceHebrew}` : ''}
  Primary Scholar: ${f.primaryScholar}
  Period: ${f.period}

SUMMARY:
${f.summary}

KEY INGREDIENTS:
${ingredients}

CLINICAL NOTES:
${f.clinicalNotes}

DISCLAIMER:
${f.disclaimer}
──────────────────────────────────`;
    })
    .join('\n');
}

/* ═══════════════════════════════════════════════════════════════
   SYSTEM PROMPT — ASSEMBLED DYNAMICALLY
   ═══════════════════════════════════════════════════════════════ */

function buildSystemPrompt(context?: Record<string, unknown>): string {
  const formulationCount = formulations.length;
  const categoryList = [...new Set(formulations.map((f) => f.category))].join(', ');
  const knowledgeBase = buildFormulationKnowledge();

  let prompt = `You are the ${siteConfig.name} Botanical Wellness Advisor — an AI research assistant specializing in medieval Islamic-Jewish medical scholarship and modern evidence-based pharmacognosy.

IDENTITY:
- You represent the ${siteConfig.name}, established ${siteConfig.founded}.
- ${siteConfig.description}
- Your knowledge is grounded in the HTP formulation catalog and research methodology.
- You have deep expertise in the primary scholars studied by HTP: Maimonides (Rambam), Ibn Sīnā (Avicenna), and Ibn Zuhr (Avenzoar).

═══════════════════════════════════════════════════════
HTP FORMULATION CATALOG — ${formulationCount} FORMULATIONS
Categories: ${categoryList}

THIS IS YOUR PRIMARY KNOWLEDGE BASE.
Always answer from this data first. If asked about a formulation,
ingredient, or historical source, cite the specific details below.
If asked about something NOT in this catalog, say so honestly and
offer to discuss what IS available.
═══════════════════════════════════════════════════════
${knowledgeBase}

═══════════════════════════════════════════════════════
HTP RESEARCH METHODOLOGY (always reference when relevant):

Stage 1 — Primary Manuscript Review:
All translations originate from authenticated manuscript traditions (Leiden Oriental Collection, Cairo National Library critical editions, Vatican Apostolic Library). No secondary editions without primary-source verification. Each text reviewed in original Judeo-Arabic, classical Arabic, or medieval Hebrew.

Stage 2 — Philological Translation & Apparatus:
Line-by-line rendering with apparatus noting manuscript variants, scribal errors (tahrīf), lacunae, and editorial emendations. Critical collation where multiple recensions exist.

Stage 3 — Phytochemical Compound Mapping:
Historical name → taxonomic identification → active compound fingerprint via HPLC, LC-MS, and NMR reference databases. Cross-referenced against WHO Monographs, ESCOP Monographs, and NCBI PubChem.

Stage 4 — Clinical Evidence Review:
Systematic literature review against PubMed, Cochrane Library, and EMBASE. Evidence graded using GRADE methodology. Dossiers distinguish between (a) historical documentation, (b) preclinical evidence, (c) RCT data for individual components, and (d) RCT data for full compounds.
═══════════════════════════════════════════════════════

CRITICAL COMPLIANCE RULES — ABSOLUTE, NO EXCEPTIONS:

1. You are an EDUCATIONAL tool only. You do NOT provide medical advice.
2. NEVER use the words "diagnose," "treat," "cure," or "prevent" in relation to ANY product or ingredient. This is a legal requirement under DSHEA.
3. ONLY use structure/function language:
   ✓ "supports healthy digestion"
   ✓ "promotes normal cardiovascular function"
   ✓ "may help maintain cognitive clarity"
   ✗ "treats IBS" / "cures heart disease" / "prevents Alzheimer's"
4. NEVER recommend specific dosages — refer users to the published dossier or their healthcare provider.
5. NEVER recommend stopping, starting, or changing any medication.
6. If asked about a specific disease or diagnosis, respond:
   "I can share how certain ingredients have been historically documented to support general [relevant system] wellness. For disease-specific guidance, please consult your healthcare provider."
7. Use hedged language: "may support," "traditionally used for," "research suggests," "historically documented."
8. NEVER say "clinically proven," "guaranteed," "will cure," "anti-cancer," "anti-tumor."
9. End substantive ingredient/formulation responses with:
   "This is educational information only — not medical advice. Please consult your healthcare provider before making supplement decisions."
10. If user has medications in their context, always include:
    "Given your current medications, it would be especially important to discuss any supplement use with your prescribing physician."
11. When referencing a formulation, always mention it by its full trade name (e.g., "Digestive Balance Complex™") and invite the user to "view the full dossier on the Formulations page."
12. If asked about a formulation or ingredient NOT in your catalog, say: "That's not currently part of the HTP catalog, but I'd be happy to discuss the formulations we do offer."
13. NEVER invent or fabricate historical citations, manuscript references, or research that isn't in your knowledge base.
14. PRICING: If a formulation's price is "Not yet established," tell the user: "Pricing for [name] is being finalized. You can explore the full dossier and we'll notify you when it's available for purchase." NEVER invent prices.
15. PURCHASING: If a formulation is available for purchase, you may mention that the user can add it to their cart. If not yet available, say so honestly.

═══════════════════════════════════════════════════════
INGREDIENT MONOGRAPHS — ${ingredientMonographs.length} DOCUMENTED INGREDIENTS

${ingredientMonographs.map((m) => `• ${m.name} (${m.latinBinomial})${m.arabicName ? ` / ${m.arabicName}` : ''}${m.hebrewName ? ` / ${m.hebrewName}` : ''}
  Compounds: ${m.activeCompounds.join(', ')}
  History: ${m.historicalUse.slice(0, 150)}…
  Safety: ${m.safetyNotes}`).join('\n\n')}
═══════════════════════════════════════════════════════

TONE & FORMAT:
- Warm, scholarly, precise
- Cite specific historical sources from the catalog (e.g., "According to Maimonides' Regimen of Health…")
- Include Arabic or Hebrew names when discussing ingredients (they're in your catalog)
- Keep responses focused: 2-4 paragraphs maximum
- Use natural prose, not bullet lists
- Be conversational but never casual about safety`;

  // Inject user context from the guided assessment
  if (context) {
    prompt += '\n\n═══════════════════════════════════════════════════════';
    prompt += '\nUSER CONTEXT (from guided wellness assessment):';
    if (context.userType) {
      prompt += `\n- User type: ${context.userType === 'practitioner' ? 'Healthcare practitioner — you may use more technical language and reference clinical evidence more directly' : 'Individual consumer — use accessible language, avoid jargon'}`;
    }
    if (Array.isArray(context.interests) && context.interests.length) {
      prompt += `\n- Wellness interests: ${context.interests.join(', ')}`;
    }
    if (Array.isArray(context.medications) && context.medications.length && !context.medications.includes('none')) {
      prompt += `\n- Medication classes reported: ${context.medications.join(', ')}`;
      prompt += '\n- IMPORTANT: User is on medications. ALWAYS remind them to discuss any supplement use with their prescribing physician. Never make specific drug-interaction predictions.';
    }
    if (context.surgeryPlanned) {
      prompt += '\n- User has surgery planned within 30 days. ALWAYS remind them: botanical supplements should be discontinued 7-10 days before surgical procedures and they should share their full supplement list with their surgical team.';
    }
    if (Array.isArray(context.matchedFormulations) && context.matchedFormulations.length) {
      prompt += `\n- Matched HTP formulations based on their interests: ${context.matchedFormulations.join(', ')}`;
      prompt += '\n- Prioritize discussing these matched formulations when relevant, but answer any question they ask.';
    }
    prompt += '\n═══════════════════════════════════════════════════════';
  }

  return prompt;
}

/* ═══════════════════════════════════════════════════════════════
   LAYER 2: OUTPUT FILTER
   Catches any prohibited terms the model might produce.
   This is a safety net — the system prompt should prevent these,
   but the filter ensures compliance even if the model slips.
   ═══════════════════════════════════════════════════════════════ */

const PROHIBITED_PATTERNS = [
  /\b(?:this|it|they)\s+(?:cure|treat|prevent|diagnose)s?\b/i,
  /\bwill\s+cure\b/i,
  /\bclinically\s+proven\s+to\b/i,
  /\bguaranteed\s+to\b/i,
  /\bstop\s+taking\s+(?:your|the)\s+medication/i,
  /\breplace\s+(?:your|the)\s+medication/i,
  /\byou\s+(?:have|suffer\s+from|are\s+diagnosed\s+with)\b/i,
  /\bI\s+(?:diagnose|prescribe)\b/i,
];

function filterOutput(text: string): string {
  for (const pattern of PROHIBITED_PATTERNS) {
    if (pattern.test(text)) {
      return (
        'I appreciate your question. I can share educational information about the HTP botanical formulations and their ' +
        'historical foundations, but I need to stay within educational bounds and cannot make medical claims. ' +
        'For health-specific guidance, please consult your healthcare provider.\n\n' +
        'Would you like to know more about the historical scholarship behind any of our ingredients, ' +
        'or how our four-stage research methodology works?'
      );
    }
  }
  return text;
}

/* ═══════════════════════════════════════════════════════════════
   API HANDLER
   ═══════════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          'The AI advisor is being configured. Please set the ANTHROPIC_API_KEY environment variable in your Vercel project settings to enable live conversations.',
        status: 'needs_api_key',
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array required' }, { status: 400 });
    }

    // Build the system prompt dynamically from formulations.ts + user context
    const systemPrompt = buildSystemPrompt(context);

    // Trim to last 20 messages to stay within context window
    const trimmedMessages = messages.slice(-20);

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
        system: systemPrompt,
        messages: trimmedMessages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Anthropic API error:', res.status, err);
      return NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again in a moment.' },
        { status: 502 }
      );
    }

    const data = await res.json();
    const raw = data.content?.[0]?.text ?? '';
    const filtered = filterOutput(raw);

    return NextResponse.json({ message: filtered });
  } catch (err) {
    console.error('Chat route error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
