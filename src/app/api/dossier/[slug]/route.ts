import { NextRequest, NextResponse } from 'next/server';
import { formulas } from '@/data/formulas';
import { monographs } from '@/data/monographs';

/* ---- Dossier content per slug ---- */

type DossierData = {
  title: string;
  subtitle: string;
  category: string;
  ingredients: string[];
  historicalFoundation: string;
  modernOverview: string;
  ingredientProfiles: Array<{
    name: string;
    dose: string;
    standardization: string;
    historicalNote: string;
    modernEvidence: string;
    mechanism: string;
    safety: string;
  }>;
  stackingGuidance: string;
  references: Array<{
    id: number;
    text: string;
    url: string;
  }>;
};

const dossierData: Record<string, DossierData> = {
  'digestive-metabolic-core': {
    title: 'Digestive Metabolic Core\u2122',
    subtitle: 'Technical Dossier',
    category: 'FOUNDATION \u2014 Digestive Support',
    ingredients: ['Coriander Seed Extract', 'Fennel Seed Extract', 'Artichoke Leaf Extract', 'Ginger Root Extract', 'Peppermint Leaf Extract'],
    historicalFoundation: 'The doctrine of digestive primacy \u2014 that digestive function is the foundation of systemic health \u2014 is the single most consistent principle across the world\'s major medical traditions. Rambam (Maimonides, 1138\u20131204) made it explicit in the Regimen of Health: the condition of the stomach governs the condition of the body. His pharmacopoeia centered on Apiaceae-family aromatic seeds (coriander, fennel, caraway) alongside warming stimulants (ginger, pepper) and bitter digestive agents. Ibn Sina\'s Canon of Medicine describes similar principles, classifying digestive botanicals by their temperamental qualities \u2014 warming, cooling, drying, moistening \u2014 and prescribing combinations calibrated to the patient\'s constitutional type. The Ayurvedic tradition parallels this with its concept of agni (digestive fire) as the determinant of health, using carminative spices as its primary therapeutic tools.[1][2]',
    modernOverview: 'This formulation targets three complementary mechanisms of digestive support: (1) aromatic carminative action via volatile oils from fennel and coriander, which relax gastrointestinal smooth muscle and reduce gas accumulation; (2) gastroprokinetic support via ginger\'s 5-HT3 receptor antagonism, which promotes healthy gastric motility; and (3) bitter-mediated digestive priming via artichoke\'s activation of TAS2R bitter taste receptors, stimulating bile secretion and preparing the digestive tract for nutrient processing. Peppermint contributes menthol-mediated smooth muscle relaxation via L-type calcium channel blockade.[3][4]',
    ingredientProfiles: [
      {
        name: 'Coriander Seed Extract (10:1)',
        dose: '250 mg',
        standardization: '10:1 concentration ratio',
        historicalNote: 'Rambam classified coriander as a cooling aromatic suitable for warm temperaments. Featured in the Regimen of Health for digestive cooling and flatulence.',
        modernEvidence: 'Volatile oils (linalool, geraniol) demonstrate antispasmodic activity on GI smooth muscle in preclinical models. Limited but positive human data on IBS symptom relief.[5]',
        mechanism: 'Smooth muscle relaxation via volatile oil activity on calcium channels.',
        safety: 'GRAS status. No significant drug interactions at supplement doses.',
      },
      {
        name: 'Fennel Seed Extract (10:1)',
        dose: '200 mg',
        standardization: '10:1 concentration ratio',
        historicalNote: 'Central to Rambam\'s digestive prescriptions. Appears throughout the Regimen of Health and Treatise on Asthma as a warming carminative.',
        modernEvidence: 'Anethole and fenchone demonstrate smooth muscle relaxant effects. A systematic review of 8 RCTs supports efficacy for infantile colic. EMA and ESCOP monographs approve traditional use for dyspeptic complaints.[6][7]',
        mechanism: 'Carminative action via trans-anethole smooth muscle relaxation; estrogen receptor modulation (minimal at supplement doses).',
        safety: 'GRAS status. EMA advises caution in estrogen-sensitive conditions at high doses.',
      },
      {
        name: 'Artichoke Leaf Extract (std. 2.5% cynarin)',
        dose: '200 mg',
        standardization: 'Standardized to 2.5% cynarin',
        historicalNote: 'Known in Greco-Roman and later Arabic medicine as a bitter hepatic tonic. The TAS2R activation model aligns with classical concepts of bitter-mediated digestive priming.',
        modernEvidence: 'Cynarin and chlorogenic acid stimulate bile secretion. A systematic review of 3 RCTs supports artichoke leaf extract for dyspeptic symptoms. EMA traditional use monograph approved.[8][9]',
        mechanism: 'TAS2R bitter receptor activation \u2192 cephalic phase digestive response \u2192 bile flow stimulation.',
        safety: 'Contraindicated in bile duct obstruction. Asteraceae allergy caution.',
      },
      {
        name: 'Ginger Root Extract (std. 5% gingerols)',
        dose: '150 mg',
        standardization: 'Standardized to 5% gingerols',
        historicalNote: 'Rambam\'s preferred warming digestive stimulant. Prescribed for cold temperaments, sluggish digestion, and nausea. Also extensively documented in Ayurvedic and Chinese traditions.',
        modernEvidence: 'Cochrane review confirms efficacy for pregnancy-related nausea. Gingerols act as 5-HT3 receptor antagonists (gastroprokinetic mechanism). Meta-analyses support anti-emetic and anti-inflammatory effects.[10][11]',
        mechanism: '5-HT3 receptor antagonism \u2192 enhanced gastric motility; COX/LOX inhibition \u2192 anti-inflammatory effects.',
        safety: 'GRAS status. Mild antiplatelet activity; consider in surgical context.',
      },
      {
        name: 'Peppermint Leaf Extract (4:1)',
        dose: '150 mg',
        standardization: '4:1 concentration ratio',
        historicalNote: 'Mint species appear throughout classical Arabic and Jewish pharmacopeias. Ibn Sina\'s Canon describes mint for stomach complaints and hiccups.',
        modernEvidence: 'Menthol blocks L-type calcium channels in GI smooth muscle. A meta-analysis of 12 RCTs supports enteric-coated peppermint oil for IBS symptom improvement (NNT \u22483). ESCOP approved monograph exists.[12][13]',
        mechanism: 'L-type calcium channel blockade \u2192 GI smooth muscle relaxation; cooling menthol sensation.',
        safety: 'GRAS status. May worsen GERD due to lower esophageal sphincter relaxation.',
      },
    ],
    stackingGuidance: 'Stacks safely with all formulas in the Historical Translation Project\u2122 system. Ginger has mild antiplatelet activity \u2014 consider in context of Circulatory Vitality Core\u2122. Discontinue all products 7\u201310 days before surgery. No CYP3A4 inhibitors in this formula.',
    references: [
      { id: 1, text: 'Maimonides M. Regimen of Health (Treatise on the Preservation of Health). Trans. Rosner F. Haifa University Press; 1990.', url: '' },
      { id: 2, text: 'Avicenna (Ibn Sina). The Canon of Medicine. Book 2: Simple Drugs. Trans. Bakhtiar L. Great Books of the Islamic World; 2012.', url: '' },
      { id: 3, text: 'Portincasa P et al. Fennel in gastroenterology: a systematic review. J Gastrointestin Liver Dis. 2016.', url: 'https://pubmed.ncbi.nlm.nih.gov/27086196/' },
      { id: 4, text: 'Alammar N et al. The impact of peppermint oil on IBS: a meta-analysis. BMC Complement Altern Med. 2019;19(1):21.', url: 'https://doi.org/10.1186/s12906-018-2409-0' },
      { id: 5, text: 'Rajeshwari U, Andallu B. Medicinal benefits of coriander. Spatula DD. 2011;1(1):51-58.', url: 'https://doi.org/10.5455/spatula.20110106123559' },
      { id: 6, text: 'Alexandrovich I et al. The effect of fennel seed oil emulsion in infantile colic: a randomized, placebo-controlled study. Altern Ther Health Med. 2003;9(4):58-61.', url: 'https://pubmed.ncbi.nlm.nih.gov/12868253/' },
      { id: 7, text: 'EMA. Assessment report on Foeniculum vulgare Miller. EMA/HMPC/137426/2006. 2008.', url: '' },
      { id: 8, text: 'Sahebkar A et al. Lipid-lowering activity of artichoke extracts: a systematic review and meta-analysis. Crit Rev Food Sci Nutr. 2018;58(15):2549-2556.', url: 'https://doi.org/10.1080/10408398.2017.1332572' },
      { id: 9, text: 'Ben Salem M et al. Pharmacological studies of artichoke leaf extract. Plant Foods Hum Nutr. 2015;70(4):441-453.', url: 'https://doi.org/10.1007/s11130-015-0503-8' },
      { id: 10, text: 'Viljoen E et al. A systematic review and meta-analysis of ginger in pregnancy-associated nausea and vomiting. Nutr J. 2014;13:20.', url: 'https://doi.org/10.1186/1475-2891-13-20' },
      { id: 11, text: 'Nikkhah Bodagh M et al. Ginger in gastrointestinal disorders: a systematic review. Food Sci Nutr. 2019;7(1):96-108.', url: 'https://doi.org/10.1002/fsn3.807' },
      { id: 12, text: 'Alammar N et al. The impact of peppermint oil on IBS: a meta-analysis. BMC Complement Altern Med. 2019;19(1):21.', url: 'https://doi.org/10.1186/s12906-018-2409-0' },
      { id: 13, text: 'Chumpitazi BP et al. The physiological effects and safety of peppermint oil in IBS. Aliment Pharmacol Ther. 2018;47(6):738-752.', url: 'https://doi.org/10.1111/apt.14519' },
      { id: 14, text: 'Mahendra P, Bisht S. Anti-anxiety activity of Coriandrum sativum. Indian J Pharmacol. 2011;43(5):574-577.', url: 'https://pubmed.ncbi.nlm.nih.gov/21897496/' },
      { id: 15, text: 'WHO Monographs on Selected Medicinal Plants, Vol. 1-4. World Health Organization; 1999-2009.', url: '' },
    ],
  },
};

/* ---- Generate plain text dossier ---- */

function generateDossier(slug: string): string {
  const f = formulas.find((x) => x.slug === slug);
  if (!f) return '';

  const d = dossierData[slug];

  // For formulas without full dossier data, generate from formula + monograph data
  const relatedMonographs = monographs.filter((m) =>
    m.formulaAppearance.some((fa) => fa.toLowerCase().includes(f.title.toLowerCase().split('\u2122')[0].trim()))
  );

  const lines: string[] = [];
  const hr = '='.repeat(72);
  const hr2 = '-'.repeat(72);

  lines.push(hr);
  lines.push('');
  lines.push('  HISTORICAL TRANSLATION PROJECT\u2122');
  lines.push('  Archevia\u2122 Formulation Technical Dossier');
  lines.push('');
  lines.push(hr);
  lines.push('');
  lines.push('  ' + f.title);
  lines.push('  Technical Dossier \u2014 Publication-Grade Reference');
  lines.push('');
  lines.push('  Prepared by: Historical Translation Project\u2122 / Axella Research');
  lines.push('  Date: February 2026');
  lines.push('  Version: 3.0');
  lines.push('');
  lines.push(hr);
  lines.push('');
  lines.push('  DISCLAIMER');
  lines.push('');
  lines.push('  This document is for educational and clinical reference purposes');
  lines.push('  only. It does not constitute medical advice. These statements have');
  lines.push('  not been evaluated by the Food and Drug Administration. This');
  lines.push('  product is not intended to diagnose, treat, cure, or prevent any');
  lines.push('  disease. Consult a qualified healthcare professional before use.');
  lines.push('');
  lines.push(hr);

  // If we have full dossier data, use it
  if (d) {
    lines.push('');
    lines.push('  CATEGORY: ' + d.category);
    lines.push('');
    lines.push(hr2);
    lines.push('  1. HISTORICAL FOUNDATION');
    lines.push(hr2);
    lines.push('');
    wrapText(d.historicalFoundation, 70).forEach((l) => lines.push('  ' + l));
    lines.push('');

    lines.push(hr2);
    lines.push('  2. MODERN BIOLOGICAL OVERVIEW');
    lines.push(hr2);
    lines.push('');
    wrapText(d.modernOverview, 70).forEach((l) => lines.push('  ' + l));
    lines.push('');

    lines.push(hr2);
    lines.push('  3. INGREDIENT-BY-INGREDIENT PROFILES');
    lines.push(hr2);

    d.ingredientProfiles.forEach((ing, i) => {
      lines.push('');
      lines.push('  3.' + (i + 1) + ' ' + ing.name);
      lines.push('  Dose: ' + ing.dose);
      lines.push('  Standardization: ' + ing.standardization);
      lines.push('');
      lines.push('  Historical Note:');
      wrapText(ing.historicalNote, 66).forEach((l) => lines.push('    ' + l));
      lines.push('');
      lines.push('  Modern Evidence:');
      wrapText(ing.modernEvidence, 66).forEach((l) => lines.push('    ' + l));
      lines.push('');
      lines.push('  Mechanism: ' + ing.mechanism);
      lines.push('  Safety: ' + ing.safety);
      lines.push('');
    });

    lines.push(hr2);
    lines.push('  4. STACKING & INTERACTION GUIDANCE');
    lines.push(hr2);
    lines.push('');
    wrapText(d.stackingGuidance, 70).forEach((l) => lines.push('  ' + l));
    lines.push('');

    lines.push(hr2);
    lines.push('  5. REFERENCES');
    lines.push(hr2);
    lines.push('');
    d.references.forEach((ref) => {
      lines.push('  [' + ref.id + '] ' + ref.text);
      if (ref.url) lines.push('      ' + ref.url);
      lines.push('');
    });
  } else {
    // Generate from formula body + monographs
    const sections = parseSections(f.body);
    let refCounter = 1;

    sections.forEach((s) => {
      if (s.title === 'SUPPLEMENT FACTS') {
        lines.push('');
        lines.push(hr2);
        lines.push('  SUPPLEMENT FACTS');
        lines.push(hr2);
        lines.push('');
        s.lines.forEach((l) => lines.push('  ' + l));
        lines.push('');
      } else {
        lines.push('');
        lines.push(hr2);
        lines.push('  ' + s.title);
        lines.push(hr2);
        lines.push('');
        s.lines.forEach((l) => {
          wrapText(l, 70).forEach((wl) => lines.push('  ' + wl));
          lines.push('');
        });
      }
    });

    // Add monograph-derived ingredient profiles
    if (relatedMonographs.length > 0) {
      lines.push('');
      lines.push(hr2);
      lines.push('  INGREDIENT-BY-INGREDIENT EVIDENCE PROFILES');
      lines.push(hr2);

      relatedMonographs.forEach((m, i) => {
        lines.push('');
        lines.push('  ' + (i + 1) + '. ' + m.commonName + ' (' + m.latinName + ')');
        lines.push('  Category: ' + m.category);
        lines.push('');
        lines.push('  Historical Use:');
        wrapText(m.historicalUse, 66).forEach((l) => lines.push('    ' + l));
        lines.push('');
        lines.push('  Modern Evidence:');
        wrapText(m.modernEvidence, 66).forEach((l) => lines.push('    ' + l));
        lines.push('');
        lines.push('  Active Compounds: ' + m.activeCompounds.join(', '));
        lines.push('  Safety: ' + m.safetyNotes);
        lines.push('');
      });
    }

    // Add references from monographs
    lines.push('');
    lines.push(hr2);
    lines.push('  REFERENCES');
    lines.push(hr2);
    lines.push('');

    relatedMonographs.forEach((m) => {
      m.references.forEach((ref) => {
        lines.push('  [' + refCounter + '] ' + ref.authors + ' (' + ref.year + '). ' + ref.title + '. ' + ref.journal + '.');
        if (ref.url) lines.push('      ' + ref.url);
        lines.push('');
        refCounter++;
      });
    });
  }

  lines.push('');
  lines.push(hr);
  lines.push('');
  lines.push('  \u00a9 2026 Historical Translation Project\u2122. All rights reserved.');
  lines.push('  Prepared by Axella Research for clinical reference use.');
  lines.push('');
  lines.push('  *These statements have not been evaluated by the Food and Drug');
  lines.push('  Administration. This product is not intended to diagnose, treat,');
  lines.push('  cure, or prevent any disease.');
  lines.push('');
  lines.push(hr);

  return lines.join('\n');
}

function wrapText(text: string, width: number): string[] {
  const words = text.split(' ');
  const result: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > width) {
      result.push(line.trim());
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line.trim()) result.push(line.trim());
  return result;
}

function isHeading(s: string): boolean {
  const t = s.trim();
  if (!t || t.length > 42) return false;
  const letters = t.replace(/[^A-Za-z]/g, '');
  if (!letters) return false;
  return t === t.toUpperCase();
}

type Section = { title: string; lines: string[] };

function parseSections(body: string[]): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of body) {
    if (isHeading(line)) {
      if (current) sections.push(current);
      current = { title: line.trim(), lines: [] };
    } else {
      if (!current) current = { title: 'OVERVIEW', lines: [] };
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const f = formulas.find((x) => x.slug === slug);

  if (!f) {
    return NextResponse.json({ error: 'Formula not found' }, { status: 404 });
  }

  const content = generateDossier(slug);

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="' + slug + '-dossier.txt"',
    },
  });
}
