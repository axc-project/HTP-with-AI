import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formulations, getFormulationBySlug } from '@/data/formulations';
import { getMonographsByFormulation, ingredientMonographs } from '@/data/monographs';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import AddToCartButton from '@/components/AddToCartButton';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return formulations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFormulationBySlug(params.slug);
  if (!f) return {};
  return {
    title: f.name,
    description: f.tagline,
  };
}

const statusMeta = {
  'peer-reviewed': { label: 'Peer-Reviewed Evidence', color: '#1f9f6e' },
  'historical':    { label: 'Historical Documentation', color: '#c98c24' },
  'in-progress':   { label: 'Research In Progress', color: '#9a8b77' },
};

export default function FormulationDetailPage({ params }: Props) {
  const f = getFormulationBySlug(params.slug);
  if (!f) notFound();

  const status = statusMeta[f.researchStatus];

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'var(--color-ink)',
          paddingBlock: 'clamp(4rem,8vw,7rem)',
          borderBottom: '3px solid var(--color-accent)',
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link
              href="/formulations"
              className="t-label"
              style={{ color: 'rgba(253,248,240,0.4)', textDecoration: 'none' }}
            >
              Formulations
            </Link>
            <span style={{ color: 'rgba(253,248,240,0.2)' }}>›</span>
            <span className="t-label" style={{ color: 'var(--color-accent)' }}>
              {f.tradeName}
            </span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>
                  {f.category}
                </span>
                <span
                  className="badge"
                  style={{
                    background: `${status.color}18`,
                    color: status.color,
                    borderColor: `${status.color}40`,
                  }}
                >
                  {status.label}
                </span>
              </div>

              <h1
                className="t-heading-1 mb-2"
                style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-cormorant)' }}
              >
                {f.name}
              </h1>
              <p className="t-label mb-6" style={{ color: 'var(--color-accent)' }}>
                Reference Code: {f.tradeName}
              </p>
              <p
                className="text-base italic mb-0"
                style={{ color: 'rgba(253,248,240,0.65)', lineHeight: 1.7 }}
              >
                {f.tagline}
              </p>
            </div>

            <div className="space-y-6 self-start">
              {/* Product image */}
              {f.image && (
                <div
                  className="flex items-center justify-center p-8"
                  style={{
                    background: 'rgba(253,248,240,0.06)',
                    border: '1px solid rgba(253,248,240,0.08)',
                  }}
                >
                  <img
                    src={f.image}
                    alt={f.name}
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
              )}

              {/* Source card */}
              <div
                className="card-manuscript p-6"
                style={{ background: 'rgba(253,248,240,0.04)' }}
              >
              <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
                Historical Source
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.3rem',
                  color: 'rgba(253,248,240,0.9)',
                  marginBottom: '0.5rem',
                }}
              >
                {f.historicalSource}
              </p>
              {f.historicalSourceArabic && (
                <p
                  className="t-arabic mb-1"
                  style={{ color: 'rgba(253,248,240,0.6)', fontSize: '1.1rem' }}
                >
                  {f.historicalSourceArabic}
                </p>
              )}
              {f.historicalSourceHebrew && (
                <p
                  className="t-hebrew"
                  style={{ color: 'rgba(253,248,240,0.6)', fontSize: '1rem' }}
                >
                  {f.historicalSourceHebrew}
                </p>
              )}
              <div
                style={{
                  marginTop: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(201,140,36,0.2)',
                }}
              >
                <p className="t-label mb-0.5" style={{ color: 'rgba(253,248,240,0.4)' }}>
                  Primary Scholar
                </p>
                <p style={{ color: 'rgba(253,248,240,0.85)', fontSize: '0.95rem' }}>
                  {f.primaryScholar}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(253,248,240,0.4)' }}>
                  {f.period}
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner text={f.disclaimer} />

      {/* ── BODY ── */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="md:col-span-2">
              {/* Summary */}
              <div className="mb-12 fade-on-scroll">
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                  Historical Context & Pharmacognostic Summary
                </p>
                <p
                  className="prose-htp t-body"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                    color: 'var(--color-ink)',
                  }}
                >
                  {f.summary}
                </p>
              </div>

              {/* Ingredients table */}
              <div className="mb-12 fade-on-scroll">
                <p className="t-label mb-6" style={{ color: 'var(--color-accent)' }}>
                  Key Ingredients & Botanical Identification
                </p>
                <div className="space-y-4">
                  {f.keyIngredients.map((ing, i) => (
                    <div
                      key={ing.name}
                      className="card-manuscript p-5 fade-on-scroll"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p
                            style={{
                              fontFamily: 'var(--font-cormorant)',
                              fontSize: '1.2rem',
                              fontWeight: 500,
                              marginBottom: '0.25rem',
                            }}
                          >
                            {ing.name}
                          </p>
                          {ing.arabicName && (
                            <p
                              className="t-arabic text-sm"
                              style={{ color: 'var(--color-ink-muted)' }}
                            >
                              {ing.arabicName}
                            </p>
                          )}
                          {ing.hebrewName && (
                            <p
                              className="t-hebrew text-sm"
                              style={{ color: 'var(--color-ink-muted)' }}
                            >
                              {ing.hebrewName}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="t-label mb-1" style={{ color: 'var(--color-ink-faint)' }}>
                            Therapeutic Role
                          </p>
                          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                            {ing.role}
                          </p>
                          {ing.modernEquivalent && (
                            <>
                              <p
                                className="t-label mt-2 mb-1"
                                style={{ color: 'var(--color-ink-faint)' }}
                              >
                                Modern Botanical ID
                              </p>
                              <p
                                className="text-xs"
                                style={{
                                  fontFamily: 'var(--font-ibm-mono)',
                                  color: 'var(--color-emerald)',
                                }}
                              >
                                {ing.modernEquivalent}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical notes */}
              <div className="fade-on-scroll">
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                  Clinical Research Notes
                </p>
                <div
                  className="p-6"
                  style={{
                    background: 'rgba(31,159,110,0.05)',
                    border: '1px solid rgba(31,159,110,0.2)',
                  }}
                >
                  <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                    {f.clinicalNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredient Monographs */}
            <div id="ingredients" className="fade-on-scroll" style={{ animationDelay: '0.3s' }}>
              <div className="ornament-rule mb-6" />
              <p className="t-label mb-6" style={{ color: 'var(--color-accent)' }}>Ingredient Monographs</p>
              <div className="space-y-3">
                {(() => {
                  const monographs = getMonographsByFormulation(f.slug);
                  return monographs.length > 0 ? monographs.map((m) => (
                    <details key={m.name} className="card-manuscript overflow-hidden">
                      <summary className="p-4 cursor-pointer flex items-center gap-3" style={{ listStyle: 'none' }}>
                        <span style={{ color: 'var(--color-accent)', fontSize: '0.7rem' }}>▶</span>
                        <div>
                          <p className="font-medium text-sm" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem' }}>{m.name}</p>
                          <p className="text-xs italic" style={{ color: 'var(--color-ink-faint)' }}>
                            {m.latinBinomial}{m.arabicName ? ` · ${m.arabicName}` : ''}{m.hebrewName ? ` · ${m.hebrewName}` : ''}
                          </p>
                        </div>
                      </summary>
                      <div className="px-4 pb-4 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                        <div className="space-y-4">
                          <div>
                            <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.55rem' }}>Historical Documentation</p>
                            <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>{m.historicalUse}</p>
                          </div>
                          <div>
                            <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.55rem' }}>Key Compounds</p>
                            <div className="flex flex-wrap gap-1">{m.activeCompounds.map((c) => (
                              <span key={c} className="text-xs px-1.5 py-0.5" style={{ background: 'rgba(201,140,36,0.06)', border: '1px solid rgba(201,140,36,0.15)', fontFamily: 'var(--font-ibm)' }}>{c}</span>
                            ))}</div>
                          </div>
                          <div>
                            <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.55rem' }}>Modern Research</p>
                            <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>{m.modernResearch}</p>
                          </div>
                          <div>
                            <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.55rem' }}>Safety</p>
                            <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>{m.safetyNotes}</p>
                          </div>
                          <div className="space-y-1">{m.references.map((r, i) => (<p key={i} className="text-xs" style={{ color: 'var(--color-ink-faint)', lineHeight: 1.5 }}>{r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-dark)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{r.citation}</a> : <span>{r.citation}</span>}{' '}<span style={{ fontSize: '0.5rem', opacity: 0.7 }}>[{r.type}]</span></p>))}</div>
                        </div>
                      </div>
                    </details>
                  )) : (
                    <p className="text-sm" style={{ color: 'var(--color-ink-faint)' }}>Monographs for this formulation are in preparation.</p>
                  );
                })()}
              </div>
              <Link href="/research#monographs" className="btn btn-outline mt-4" style={{ fontSize: '0.7rem' }}>
                View All {ingredientMonographs.length} Monographs →
              </Link>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick facts */}
              <div className="card-manuscript p-6 fade-on-scroll">
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                  Quick Reference
                </p>
                <dl className="space-y-3">
                  {[
                    { dt: 'Category',    dd: f.category.charAt(0).toUpperCase() + f.category.slice(1) },
                    { dt: 'Code',        dd: f.tradeName },
                    { dt: 'Scholar',     dd: f.primaryScholar },
                    { dt: 'Period',      dd: f.period },
                    { dt: 'Ingredients', dd: `${f.keyIngredients.length} documented` },
                    { dt: 'Status',      dd: statusMeta[f.researchStatus].label },
                  ].map(({ dt, dd }) => (
                    <div
                      key={dt}
                      className="flex justify-between gap-3"
                      style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}
                    >
                      <dt className="t-label text-xs" style={{ color: 'var(--color-ink-faint)' }}>
                        {dt}
                      </dt>
                      <dd className="text-xs text-right" style={{ color: 'var(--color-ink-muted)' }}>
                        {dd}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Purchase */}
              <div className="card-manuscript p-6 text-center fade-on-scroll">
                <p
                  className="t-label mb-3"
                  style={{ color: 'var(--color-accent)', fontSize: '0.65rem' }}
                >
                  {f.availableForPurchase ? 'Purchase' : 'Available Soon'}
                </p>
                {f.price !== null ? (
                  <p className="t-heading-3 mb-4" style={{ color: 'var(--color-accent)' }}>
                    ${(f.price / 100).toFixed(2)}
                  </p>
                ) : (
                  <p className="text-sm mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                    Pricing is being finalized. Add your interest and we will notify you when available.
                  </p>
                )}
                <AddToCartButton formulation={f} />
              </div>

              {/* Dossier section */}
              <div id="dossier" className="card-manuscript p-6 fade-on-scroll">
                <p className="t-label mb-2" style={{ color: 'var(--color-accent)', fontSize: '0.65rem' }}>
                  Technical Dossier
                </p>
                <p className="text-sm mb-4" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                  Complete ingredient evidence tables, manuscript citations, phytochemical references, safety/interaction analysis, and curated publication list.
                </p>
                <div className="space-y-2">
                  <Link
                    href={`/formulations/${f.slug}#ingredients`}
                    className="btn btn-primary w-full justify-center text-xs"
                  >
                    View Dossier Online
                  </Link>
                  <a
                    href={`/api/dossier/${f.slug}`}
                    className="btn btn-outline w-full justify-center text-xs"
                    download
                  >
                    ↓ Download as PDF
                  </a>
                </div>
              </div>

              {/* Institutional Access */}
              <div
                className="p-6 text-center fade-on-scroll"
                style={{
                  background: 'var(--color-ink)',
                  border: '1px solid rgba(201,140,36,0.25)',
                }}
              >
                <p
                  className="t-label mb-3"
                  style={{ color: 'var(--color-accent)', fontSize: '0.65rem' }}
                >
                  Institutional Access
                </p>
                <p className="text-sm mb-4" style={{ color: 'rgba(253,248,240,0.65)' }}>
                  Request expanded dossiers with full manuscript facsimiles, compound interaction matrices, and GRADE evidence summaries.
                </p>
                <Link href="/contact" className="btn btn-gold w-full justify-center text-xs">
                  Request Full Dossier
                </Link>
              </div>

              {/* Back */}
              <Link
                href="/formulations"
                className="btn btn-outline w-full justify-center fade-on-scroll"
                style={{ fontSize: '0.75rem' }}
              >
                ← All Formulations
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
