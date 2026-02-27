import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formulas } from '@/data/formulas';

export const metadata: Metadata = {
  title: 'Formulations \u2022 Historical Translation Project\u2122',
};

export default function FormulationsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center">
          <div className="kicker">Programs</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">
            Explore the current formulations
          </h1>
          <p className="mt-5 text-ink-900/70 max-w-3xl mx-auto leading-relaxed">
            Our catalog will expand as we publish more books and research new
            traditions. Each product page includes: an overview, historical
            foundations, modern evidence signals, a clean ingredient story, and
            optional add-on recommendations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {formulas.map((f) => (
            <div key={f.slug} className="card overflow-hidden">
              <div className="grid sm:grid-cols-[180px,1fr]">
                <div className="bg-parchment-100">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <h2 className="h-serif text-2xl">{f.title}</h2>
                  <p className="mt-3 text-ink-900/70 leading-relaxed">
                    {f.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      className="btn-ghost"
                      href={'/formulations/' + f.slug}
                    >
                      Learn More
                    </Link>
                    <Link
                      className="text-sm font-semibold text-ink-900/70 hover:text-ink-900"
                      href="/shop"
                    >
                      Purchase
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
