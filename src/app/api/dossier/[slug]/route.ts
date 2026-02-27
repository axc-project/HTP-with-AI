import { NextRequest, NextResponse } from 'next/server';
import { getFormulationBySlug } from '@/data/formulations';
import { getMonographsByFormulation } from '@/data/monographs';

/**
 * GET /api/dossier/[slug]
 *
 * Generates a downloadable dossier for a given formulation.
 * Currently outputs a structured text/plain document.
 *
 * Future enhancement: Generate actual PDF using a library like
 * @react-pdf/renderer or jsPDF when the design is finalized.
 */

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const f = getFormulationBySlug(params.slug);
  if (!f) {
    return NextResponse.json({ error: 'Formulation not found' }, { status: 404 });
  }

  const monographs = getMonographsByFormulation(f.slug);
  const now = new Date().toISOString().split('T')[0];

  // Build structured dossier document
  let doc = '';
  doc += '═'.repeat(72) + '\n';
  doc += `FORMULATION DOSSIER: ${f.name}\n`;
  doc += `Trade Code: ${f.tradeName}\n`;
  doc += `Historical Translation Project™\n`;
  doc += `Generated: ${now}\n`;
  doc += '═'.repeat(72) + '\n\n';

  doc += 'IMPORTANT NOTICE\n';
  doc += '─'.repeat(72) + '\n';
  doc += f.disclaimer + '\n\n';

  doc += 'OVERVIEW\n';
  doc += '─'.repeat(72) + '\n';
  doc += `Category: ${f.category}\n`;
  doc += `Primary Scholar: ${f.primaryScholar}\n`;
  doc += `Period: ${f.period}\n`;
  doc += `Research Status: ${f.researchStatus}\n`;
  doc += `Historical Source: ${f.historicalSource}\n`;
  if (f.historicalSourceArabic) doc += `  Arabic: ${f.historicalSourceArabic}\n`;
  if (f.historicalSourceHebrew) doc += `  Hebrew: ${f.historicalSourceHebrew}\n`;
  doc += '\n';
  doc += f.summary + '\n\n';

  doc += 'CLINICAL NOTES\n';
  doc += '─'.repeat(72) + '\n';
  doc += f.clinicalNotes + '\n\n';

  doc += 'KEY INGREDIENTS\n';
  doc += '─'.repeat(72) + '\n';
  for (const ing of f.keyIngredients) {
    doc += `\n• ${ing.name}`;
    if (ing.arabicName) doc += ` (${ing.arabicName})`;
    if (ing.hebrewName) doc += ` [${ing.hebrewName}]`;
    doc += '\n';
    doc += `  Role: ${ing.role}\n`;
    if (ing.modernEquivalent) doc += `  Modern ID: ${ing.modernEquivalent}\n`;
  }
  doc += '\n';

  if (monographs.length > 0) {
    doc += 'INGREDIENT MONOGRAPHS\n';
    doc += '═'.repeat(72) + '\n\n';
    for (const m of monographs) {
      doc += `──── ${m.name} (${m.latinBinomial}) ────\n`;
      if (m.arabicName) doc += `Arabic: ${m.arabicName}\n`;
      if (m.hebrewName) doc += `Hebrew: ${m.hebrewName}\n`;
      doc += '\n';
      doc += `Historical Documentation:\n${m.historicalUse}\n\n`;
      doc += `Active Compounds: ${m.activeCompounds.join(', ')}\n\n`;
      doc += `Modern Research:\n${m.modernResearch}\n\n`;
      doc += `Safety Notes:\n${m.safetyNotes}\n\n`;
      doc += `Supporting Publications:\n`;
      for (const ref of m.references) {
        doc += `  [${ref.type.toUpperCase()}] ${ref.citation}`;
        if (ref.url) doc += `\n    → ${ref.url}`;
        doc += '\n';
      }
      doc += '\n';
    }
  }

  doc += '═'.repeat(72) + '\n';
  doc += 'This document is educational information only — not medical advice.\n';
  doc += '© Historical Translation Project™. All rights reserved.\n';
  doc += '═'.repeat(72) + '\n';

  const filename = `HTP-Dossier-${f.tradeName}-${now}.txt`;

  return new NextResponse(doc, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
