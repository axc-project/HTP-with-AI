import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { formulations } from '@/data/formulations';
import { ingredientMonographs } from '@/data/monographs';

export const metadata: Metadata = {
  title: 'Research & Monographs',
  description:
    'Ingredient monographs, formulation dossiers, and translational research from the Historical Translation Project™. Educational content only.',
};

const categoryLabels: Record<string, string> = {
  digestive: 'Digestive System',
  cognitive: 'Cognitive / Neurological',
  respiratory: 'Respiratory System',
  cardiovascular: 'Cardiovascular System',
  urinary: 'Urinary System',
  hepatoprotective: 'Hepatoprotective',
  'anti-inflammatory': 'Anti-Inflammatory',
  nervine: 'Nervine / Emotional',
  antimicrobial: 'Antimicrobial',
  'glycemic-metabolic': 'Glycemic-Metabolic',
  'multi-system': 'Multi-System',
};

const categoryColors: Record<string, string> = {
  digestive: '#2d6a4f',
  cognitive: '#7c3aed',
  respiratory: '#0369a1',
  cardiovascular: '#b91c1c',
  urinary: '#0e7490',
  hepatoprotective: '#92400e',
  'anti-inflammatory': '#dc2626',
  nervine: '#6d28d9',
  antimicrobial: '#15803d',
  'glycemic-metabolic': '#ca8a04',
  'multi-system': '#64748b',
};

export default function ResearchPage() {
  // Group monographs by category
  const categories = Object.keys(categoryLabels);
  const grouped = categories
    .map((cat) => ({
      key: cat,
      label: categoryLabels[cat],
      color: categoryColors[cat],
      monographs: ingredientMonographs.filter((m) => m.category === cat),
    }))
    .filter((g) => g.monographs.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Monographs, Dossiers & Evidence"
        subtitle="Comprehensive ingredient monographs, clinician-ready formulation dossiers, and translational research — grounded in primary manuscripts and modern phytochemistry."
        arabicQuote="العلم نور والجهل ظلام"
        arabicAttribution="'Knowledge is light, and ignorance is darkness.' — Islamic scholarly tradition"
      />

      {/* ── NAV ANCHORS ── */}
      <section className="section" style={{ paddingBlock: '2rem' }}>
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#monographs" className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Ingredient Monographs</a>
            <a href="#dossiers" className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Formulation Dossiers</a>
            <a href="#methodology" className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Research Methodology</a>
            <a href="#corpus" className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Primary Corpus</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
         INGREDIENT MONOGRAPHS
         ══════════════════════════════════════════ */}
      <section className="section" id="monographs">
        <div className="container">
          <div className="text-center mb-12 fade-on-scroll">
            <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>Ingredient Monographs</p>
            <h2 className="t-heading-1 mb-4">
              {ingredientMonographs.length} Documented Ingredients
            </h2>
            <p className="t-body" style={{ color: 'var(--color-ink-muted)', maxWidth: '40rem', marginInline: 'auto' }}>
              Each monograph documents the ingredient&apos;s historical context in the Islamic-Jewish medical tradition, identified bioactive compounds, modern research signals, and safety considerations. All language conforms to DSHEA structure/function requirements.
            </p>
          </div>

          {grouped.map((group) => (
            <div key={group.key} className="mb-16 fade-on-scroll">
              <div className="flex items-center gap-3 mb-6">
                <span style={{ width: '4px', height: '24px', background: group.color, display: 'block' }} />
                <h3 className="t-heading-2">{group.label}</h3>
                <span className="badge" style={{ background: `${group.color}12`, color: group.color, borderColor: `${group.color}30` }}>
                  {group.monographs.length} ingredients
                </span>
              </div>

              <div className="space-y-4">
                {group.monographs.map((m) => (
                  <details key={m.name} className="card-manuscript overflow-hidden group">
                    <summary className="p-5 cursor-pointer flex items-center gap-4" style={{ listStyle: 'none' }}>
                      <span style={{ color: group.color, fontSize: '0.8rem', transition: 'transform 0.2s' }} className="group-open:rotate-90">▶</span>
                      <div className="flex-1">
                        <p className="font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
                          {m.name}
                        </p>
                        <p className="text-xs italic" style={{ color: 'var(--color-ink-faint)' }}>
                          {m.latinBinomial}
                          {m.arabicName && ` · ${m.arabicName}`}
                          {m.hebrewName && ` · ${m.hebrewName}`}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-0.5 hidden sm:inline-block" style={{ background: `${group.color}08`, color: group.color, border: `1px solid ${group.color}20` }}>
                        {m.formulationSlugs.map((s) => formulations.find((f) => f.slug === s)?.tradeName).filter(Boolean).join(', ')}
                      </span>
                    </summary>

                    <div className="px-5 pb-6 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Historical Use */}
                        <div>
                          <p className="t-label mb-2" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>Historical Documentation</p>
                          <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>{m.historicalUse}</p>
                        </div>

                        {/* Modern Research */}
                        <div>
                          <p className="t-label mb-2" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>Modern Research</p>
                          <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>{m.modernResearch}</p>
                        </div>

                        {/* Active Compounds */}
                        <div>
                          <p className="t-label mb-2" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>Key Bioactive Compounds</p>
                          <div className="flex flex-wrap gap-1.5">
                            {m.activeCompounds.map((c) => (
                              <span key={c.name} className="text-xs px-2 py-0.5" style={{ background: 'rgba(201,140,36,0.06)', border: '1px solid rgba(201,140,36,0.15)', fontFamily: 'var(--font-ibm)' }}>
                                {c.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Safety */}
                        <div>
                          <p className="t-label mb-2" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>Safety Notes</p>
                          <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>{m.safetyNotes}</p>
                        </div>
                      </div>

                      {/* References */}
                      <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                        <p className="t-label mb-1" style={{ color: 'var(--color-ink-faint)', fontSize: '0.55rem' }}>Supporting Publications</p>
                        <div className="space-y-1">
                          {m.references.map((r, ri) => (
                            <p key={ri} className="text-xs" style={{ color: 'var(--color-ink-faint)', lineHeight: 1.6 }}>
                              <span className="inline-block w-3 text-center" style={{ color: 'var(--color-accent)', fontSize: '0.55rem' }}>
                                {r.type === 'rct' ? '◆' : r.type === 'meta-analysis' || r.type === 'systematic-review' ? '◈' : r.type === 'pharmacopoeia' || r.type === 'monograph' ? '◇' : '○'}
                              </span>{' '}
                              {r.url ? (
                                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-dark)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                                  {r.citation}
                                </a>
                              ) : (
                                <span>{r.citation}</span>
                              )}
                              {' '}
                              <span className="uppercase" style={{ fontSize: '0.5rem', color: 'var(--color-ink-faint)', opacity: 0.7 }}>
                                [{r.type.replace('-', ' ')}]
                              </span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
         FORMULATION DOSSIERS
         ══════════════════════════════════════════ */}
      <section className="section" id="dossiers" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div className="text-center mb-12 fade-on-scroll">
            <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>Formulation Dossiers</p>
            <h2 className="t-heading-1 mb-4">Clinician-Ready Documentation</h2>
            <p className="t-body" style={{ color: 'var(--color-ink-muted)', maxWidth: '40rem', marginInline: 'auto' }}>
              Each formulation has a complete dossier covering historical lineage, modern evidence signals, ingredient rationale, safety and stacking guidance, and a curated publication list. View online or download as PDF.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {formulations.map((f) => {
              const monographCount = ingredientMonographs.filter((m) => m.formulationSlugs.includes(f.slug)).length;
              return (
                <div key={f.slug} className="card-manuscript p-6 fade-on-scroll">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>{f.category}</span>
                      <h3 className="t-heading-3 mt-2" style={{ fontSize: '1.1rem' }}>{f.name}</h3>
                      <p className="text-xs italic mt-1" style={{ color: 'var(--color-ink-faint)' }}>{f.tradeName} · {f.primaryScholar} · {f.period}</p>
                    </div>
                    <span className="badge badge-emerald">{f.researchStatus}</span>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                    {f.summary.slice(0, 200)}…
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-4 text-xs mb-5" style={{ color: 'var(--color-ink-faint)' }}>
                    <span>{f.keyIngredients.length} ingredients</span>
                    <span>{monographCount} monographs</span>
                    <span>{f.historicalSource}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/formulations/${f.slug}`} className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.45rem 1rem' }}>
                      View Full Dossier
                    </Link>
                    <a
                      href={`/formulations/${f.slug}#dossier`}
                      className="btn btn-outline"
                      style={{ fontSize: '0.7rem', padding: '0.45rem 1rem' }}
                    >
                      ↓ Download PDF
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
         RESEARCH METHODOLOGY
         ══════════════════════════════════════════ */}
      <section className="section" id="methodology">
        <div className="container">
          <div className="text-center mb-12 fade-on-scroll">
            <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>Methodology</p>
            <h2 className="t-heading-1 mb-4">Four-Stage Research Process</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', title: 'Primary Manuscript Review', desc: 'All translations originate from authenticated manuscript traditions (Leiden Oriental Collection, Cairo National Library critical editions, Vatican Apostolic Library). Each text reviewed in original Judeo-Arabic, classical Arabic, or medieval Hebrew.' },
              { n: '02', title: 'Philological Translation', desc: 'Line-by-line rendering with apparatus noting manuscript variants, scribal errors (taḥrīf), lacunae, and editorial emendations. Critical collation where multiple recensions exist.' },
              { n: '03', title: 'Phytochemical Mapping', desc: 'Historical name → taxonomic identification → active compound fingerprint via HPLC, LC-MS, and NMR reference databases. Cross-referenced against WHO, ESCOP, and NCBI PubChem.' },
              { n: '04', title: 'Clinical Evidence Review', desc: 'Systematic review against PubMed, Cochrane Library, and EMBASE. Evidence graded using GRADE methodology. Dossiers distinguish historical documentation, preclinical evidence, and RCT data.' },
            ].map((step) => (
              <div key={step.n} className="card-manuscript p-6 fade-on-scroll">
                <p className="t-label mb-2" style={{ color: 'var(--color-accent)' }}>Stage {step.n}</p>
                <h3 className="t-heading-3 mb-3" style={{ fontSize: '1.05rem' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
         PRIMARY CORPUS
         ══════════════════════════════════════════ */}
      <section className="section" id="corpus" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div className="text-center mb-12 fade-on-scroll">
            <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>Primary Corpus</p>
            <h2 className="t-heading-1 mb-4">Source Texts Under Active Translation</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                scholar: 'Moses Maimonides (Rambam)',
                period: '1138–1204 CE',
                works: [
                  'Regimen of Health (Fī Tadbīr al-Ṣiḥḥa)',
                  'Medical Aphorisms (Fuṣūl Mūsā)',
                  'Treatise on Poisons (Maqāla fī al-Sumūm)',
                  'Glossary of Drug Names (Sharḥ Asmāʾ al-ʿUqqār)',
                ],
              },
              {
                scholar: 'Ibn Sīnā (Avicenna)',
                period: '980–1037 CE',
                works: [
                  'Al-Qānūn fī al-Ṭibb — Book II (Materia medica: 800+ drugs)',
                  'Al-Qānūn fī al-Ṭibb — Book IV (Compound remedies)',
                  'Al-Qānūn fī al-Ṭibb — Book V (Pharmacopoeia)',
                ],
              },
              {
                scholar: 'Ibn Zuhr (Avenzoar)',
                period: '1091–1162 CE',
                works: [
                  'Kitāb al-Taysīr (Book of Simplification)',
                  'Kitāb al-Aghdhiya (Book of Foods)',
                  'Clinical case notes on digestive and respiratory conditions',
                ],
              },
            ].map((s) => (
              <div key={s.scholar} className="card-manuscript p-6 fade-on-scroll">
                <h3 className="t-heading-3 mb-1" style={{ fontSize: '1.1rem' }}>{s.scholar}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--color-ink-faint)' }}>{s.period}</p>
                <div className="space-y-2">
                  {s.works.map((w) => (
                    <div key={w} className="flex items-start gap-2">
                      <span className="geo-diamond mt-1.5 shrink-0" style={{ width: '4px', height: '4px' }} />
                      <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>{w}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance footer */}
      <section className="section" style={{ paddingBlock: '2rem' }}>
        <div className="container">
          <div className="p-5" style={{ background: 'rgba(201,140,36,0.05)', border: '1px solid rgba(201,140,36,0.15)' }}>
            <p className="text-xs" style={{ color: 'var(--color-accent-dark)', lineHeight: 1.65 }}>
              <strong>Educational Information Only.</strong> All research content on this page is for educational purposes only and does not constitute medical advice. These statements have not been evaluated by the FDA. Botanical supplements are not intended to diagnose, treat, cure, or prevent any disease. Consult a qualified healthcare practitioner before use.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
