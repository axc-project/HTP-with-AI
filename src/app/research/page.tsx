import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MonographBrowser from '@/components/MonographBrowser';

export const metadata: Metadata = {
  title: 'Research \u2022 Historical Translation Project\u2122',
};

const optimization = [
  'HISTORICAL TRANSLATION PROJECT\u2122',
  'Formulation Optimization Review',
  'Four-Formula Comprehensive Assessment',
  'Bridging Historically Documented Botanical Practices with Modern Supplement Science',
  'February 2026',
  'Prepared for Axella Research',
  'This document is for educational and product development purposes only. No claims to treat, cure, or prevent any disease are made. All language conforms to FDA structure/function requirements. Not medical advice.',
  'Table of Contents',
  'Part A \u2014 Modern-Day Supplement Landscape',
  'A.1 Digestive Support Category',
  'A.2 Circulatory Support Category',
  'A.3 Cellular/Immune Resilience Category',
  'A.4 Urinary Flow Support Category',
  'Part B \u2014 Formula-by-Formula Optimization',
  'B.1 Digestive Metabolic Core\u2122',
  'B.2 Circulatory Vitality Core\u2122',
  'B.3 Cellular Resilience Complex\u2122',
  'B.4 Urinary Flow Support\u2122',
];

const addendum = [
  'ADDENDUM',
  'Pill Burden Optimization & Berberine Evaluation',
  'Supplement to: Formulation Optimization Review (February 2026)',
  'Historical Translation Project\u2122 / Axella Research',
  'Section 1 \u2014 Pill Burden Optimization',
  '1.1 \u2014 The Compliance Problem',
  'Supplement adherence declines sharply as daily pill count increases. Research consistently shows that compliance rates drop below 50% when daily dosing exceeds 4-6 capsules from a single product line.',
  'This is not merely a consumer convenience issue. It directly impacts the economic viability of the product line, because low adherence drives low repeat purchase rates. Pill burden optimization is therefore both a health outcomes concern and a business concern.',
  '1.2 \u2014 Current Burden Analysis',
  '1.3 \u2014 Optimization Strategies',
  'Strategy A: Tiered Product Architecture (Recommended)',
  'Rather than expecting consumers to take all four cores simultaneously, position the products as a choose your focus system.',
];

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl">
          <div className="kicker">Research</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">
            Historical foundations + modern evidence
          </h1>
          <p className="mt-6 text-ink-900/70 leading-relaxed text-lg">
            This page hosts our translational notes and formulation reviews. It
            is educational content only; not medical advice.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="card p-8">
            <div className="kicker">Paper</div>
            <div className="mt-2 h-serif text-2xl">Formulation Optimization Review</div>
            <p className="mt-3 text-ink-900/70">Excerpts below; a downloadable PDF will be linked here once published.</p>
            <div className="mt-6 space-y-3">
              {optimization.map((p, i) => (
                <p key={i} className="text-ink-900/80 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>

          <section className="card p-8">
            <div className="kicker">Addendum</div>
            <div className="mt-2 h-serif text-2xl">Pill burden + berberine considerations</div>
            <p className="mt-3 text-ink-900/70">Excerpts below; a downloadable PDF will be linked here once published.</p>
            <div className="mt-6 space-y-3">
              {addendum.map((p, i) => (
                <p key={i} className="text-ink-900/80 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-10 card p-8">
          <div className="kicker">Dossiers</div>
          <div className="mt-2 h-serif text-2xl">Clinician-ready formula dossiers</div>
          <p className="mt-3 text-ink-900/70 leading-relaxed">
            Each formulation has a dossier with: historical lineage, modern evidence signals,
            ingredient rationale, safety and stacking guidance, and a curated publication list.
          </p>
        </section>

        <section className="mt-14">
          <div className="kicker">Monograph Database</div>
          <h2 className="mt-3 h-serif text-3xl sm:text-4xl">49-Ingredient Evidence Library</h2>
          <p className="mt-4 text-ink-900/70 leading-relaxed max-w-3xl">
            Browse our curated monographs by category. Each entry includes historical context,
            modern evidence summary, active compounds, safety notes, and peer-reviewed references
            with clickable links.
          </p>
          <MonographBrowser />
        </section>
      </main>
      <Footer />
    </>
  );
}
