import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Publications \u2022 Historical Translation Project\u2122',
};

const rambamAmazon = 'https://www.amazon.com/dp/REPLACE-RAMBAM';
const cancerAmazon = 'https://www.amazon.com/dp/REPLACE-CANCER';

export default function PublicationsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl">
          <div className="kicker">Publications</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">
            Foundational books
          </h1>
          <p className="mt-6 text-ink-900/70 leading-relaxed text-lg">
            These publications are the source texts that anchor our mission and
            inform our formulation systems.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="card overflow-hidden">
            <div className="grid sm:grid-cols-[220px,1fr]">
              <div className="bg-parchment-100">
                <img
                  src="/images/books/rambam-cover.jpg"
                  alt="Rambam&apos;s Guide to Health cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="kicker">Book</div>
                <h2 className="mt-2 h-serif text-2xl">
                  Rambam&apos;s Guide to Health
                </h2>
                <p className="mt-3 text-ink-900/70 leading-relaxed">
                  A practical modern interpretation of medieval preventive
                  medicine&mdash;focused on daily routine, digestion, balance,
                  and long-term resilience.
                </p>
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-medium text-ink-900/80 hover:text-ink-900">
                    Read a summary
                  </summary>
                  <div className="mt-3 text-sm leading-relaxed text-ink-900/70">
                    A structured guide to preventive health drawn from
                    Rambam&apos;s principles&mdash;translated into modern
                    language and organized into actionable frameworks. The book
                    emphasizes routine, digestion, timing, and constitutional
                    balance as the foundation of long-term resilience.
                  </div>
                </details>
                <div className="mt-6">
                  <a
                    className="btn-primary"
                    href={rambamAmazon}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Purchase on Amazon
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="card overflow-hidden">
            <div className="grid sm:grid-cols-[220px,1fr]">
              <div className="bg-parchment-100">
                <img
                  src="/images/books/cancer-cover-placeholder.svg"
                  alt="Cancer Across Time and Civilizations cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="kicker">Book</div>
                <h2 className="mt-2 h-serif text-2xl">
                  Cancer Across Time and Civilizations
                </h2>
                <p className="mt-3 text-ink-900/70 leading-relaxed">
                  A historical and biological translation&mdash;connecting
                  medical history with modern cellular systems, terrain,
                  resilience, and supportive care logic.
                </p>
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-medium text-ink-900/80 hover:text-ink-900">
                    Read a summary
                  </summary>
                  <div className="mt-3 text-sm leading-relaxed text-ink-900/70">
                    A sweeping narrative that tracks how civilizations described
                    &ldquo;malignant growth,&rdquo; systemic decline, and
                    terrain across time&mdash;then maps those observations onto
                    modern biology. Built for clinicians and serious readers, it
                    frames historical insight as a lens for supportive strategy
                    without making treatment claims.
                  </div>
                </details>
                <div className="mt-6">
                  <a
                    className="btn-primary"
                    href={cancerAmazon}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Purchase on Amazon
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
