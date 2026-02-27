import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-navy-900">
          <img
            src="/images/brand/brand-collage.jpg"
            alt=""
            aria-hidden={true}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,181,109,0.30),transparent_55%)]"></div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-900/55 via-navy-900/30 to-parchment-100"></div>

          <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-14 sm:pt-20 sm:pb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-4 py-2 shadow-soft">
                <span className="h-2 w-2 rounded-full bg-gold-500"></span>
                <span className="text-sm text-white/85">
                  Historical foundations + modern evidence
                </span>
              </div>

              <h1 className="mt-8 h-serif text-5xl sm:text-6xl leading-[0.95] text-white">
                A research-first approach to everyday botanical wellness.
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-white/80 max-w-2xl">
                We translate preventive principles from across global medical
                history into modern, evidence-forward educational
                dossiers&mdash;and thoughtfully designed botanical formulations
                framed in compliant structure/function language.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/formulations" className="btn-primary">
                  Explore Formulations
                </Link>
                <Link href="/research" className="btn-ghost">
                  Explore Research
                </Link>
              </div>

              <p className="mt-4 text-xs text-white/70">
                Educational content only; not medical advice. Supplements are
                not intended to diagnose, treat, cure, or prevent disease.
              </p>
            </div>
          </div>
        </section>

        {/* Section cards */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/research"
              className="card-dark p-7 hover:translate-y-[-2px] transition"
            >
              <div className="kicker kicker-on-dark">Research</div>
              <div className="mt-2 h-serif text-2xl text-white">
                Translational analyses
              </div>
              <p className="mt-3 text-white/80">
                Historical textual analysis, modern evidence signals, and
                pathway-level interpretation&mdash;written for clinicians and
                curious patients.
              </p>
            </Link>

            <Link
              href="/publications"
              className="card-dark p-7 hover:translate-y-[-2px] transition"
            >
              <div className="kicker kicker-on-dark">Publications</div>
              <div className="mt-2 h-serif text-2xl text-white">
                Foundational books
              </div>
              <p className="mt-3 text-white/80">
                The publications that anchor our mission and inform every
                formulation&mdash;presented with clear summaries and purchase
                links.
              </p>
            </Link>

            <Link
              href="/formulations"
              className="card-dark p-7 hover:translate-y-[-2px] transition"
            >
              <div className="kicker kicker-on-dark">Formulations</div>
              <div className="mt-2 h-serif text-2xl text-white">
                Structured programs
              </div>
              <p className="mt-3 text-white/80">
                Our formulations bridge historically proven methods with
                modern-day data and studies to create targeted support
                supplements.
              </p>
            </Link>

            <Link
              href="/method"
              className="card-dark p-7 hover:translate-y-[-2px] transition"
            >
              <div className="kicker kicker-on-dark">Method</div>
              <div className="mt-2 h-serif text-2xl text-white">
                Bridge old + new
              </div>
              <p className="mt-3 text-white/80">
                A disciplined process that ties each ingredient to historical
                lineage, modern evidence, and safety-first stacking logic.
              </p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
