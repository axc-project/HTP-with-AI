import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Method \u2022 Historical Translation Project\u2122',
};

const steps = [
  {
    step: 'Step 1',
    title: 'Text-first extraction',
    body: 'We start with primary sources\u2014classical physicians, materia medica, and preventive frameworks\u2014then translate recurring themes: digestion first, vitality distribution, resilience of terrain, and disciplined daily routines.',
  },
  {
    step: 'Step 2',
    title: 'Evidence signals',
    body: 'We map historical observations to modern physiology (not disease claims): motility, endothelial function, antioxidant response, immune modulation, and urinary comfort\u2014supported with published reviews and mechanistic literature.',
  },
  {
    step: 'Step 3',
    title: 'Non-overlap design',
    body: 'Core formulas are built to avoid unnecessary duplication and contraindication risk. Add-ons are only curated when they add a distinct, complementary layer\u2014while minimizing pill burden.',
  },
  {
    step: 'Step 4',
    title: 'Physician-ready dossiers',
    body: 'Each program is documented with ingredient rationale, historical lineage, safety notes, and a publication list\u2014so clinicians can evaluate fit within a patient\u2019s broader plan of care.',
  },
];

export default function MethodPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl">
          <div className="kicker">Method</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">
            How we translate history into modern, targeted support
          </h1>
          <p className="mt-6 text-ink-900/70 leading-relaxed text-lg">
            Our formulations bridge historically proven approaches with
            modern-day data and studies to create targeted support
            supplements&mdash;designed for physician-directed use and compliant
            structure/function positioning.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.step} className="card p-8">
              <div className="kicker">{s.step}</div>
              <div className="mt-2 h-serif text-2xl">{s.title}</div>
              <p className="mt-3 text-ink-900/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
