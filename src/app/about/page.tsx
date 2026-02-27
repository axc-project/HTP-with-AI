import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About \u2022 Historical Translation Project\u2122',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl">
          <div className="kicker">About</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">
            A long-term translation institute
          </h1>
          <p className="mt-6 text-ink-900/70 leading-relaxed text-lg">
            Historical Translation Project&trade; is a research-driven
            initiative translating classical medical traditions into structured
            modern frameworks&mdash;through publications, educational dossiers,
            and curated botanical formulations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <div className="h-serif text-2xl">Mission</div>
            <p className="mt-3 text-ink-900/70 leading-relaxed">
              Preserve and translate historically grounded health principles
              across civilizations&mdash;then responsibly integrate them with
              modern evidence.
            </p>
          </div>
          <div className="card p-8">
            <div className="h-serif text-2xl">Clinical posture</div>
            <p className="mt-3 text-ink-900/70 leading-relaxed">
              We do not provide medical advice. Our goal is to educate
              physicians and patients and support clinician-directed use with
              clean, transparent dossiers.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
