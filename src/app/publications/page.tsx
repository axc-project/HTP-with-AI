import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Foundational publications from the Historical Translation Project™ — bridging medieval Islamic-Jewish medical scholarship with modern science.',
};

const books = [
  {
    title: "Rambam's Guide to Health",
    subtitle: 'A Practical Modern Interpretation of Medieval Preventive Medicine',
    cover: '/images/books/rambam-cover.jpg',
    author: 'Historical Translation Project™',
    description:
      'This foundational text translates the preventive medical principles of Rabbi Moses ben Maimon (Maimonides / Rambam) into a practical, modern framework. Drawing on the Regimen of Health, Medical Aphorisms, and lesser-known treatises, the book bridges twelve centuries of clinical wisdom with contemporary evidence-based approaches to nutrition, lifestyle, and botanical wellness.',
    highlights: [
      'Complete translation of key dietetic passages from the Regimen of Health',
      'Modern phytochemical context for Maimonidean botanical recommendations',
      'The Six Non-Naturals framework applied to contemporary preventive medicine',
      'Historical commentary on sleep, exercise, digestion, and emotional equilibrium',
    ],
    amazonUrl: '#', // Replace with actual Amazon URL when published
    status: 'Available',
  },
  {
    title: 'Cancer Across Time and Civilizations',
    subtitle: 'A Historical and Biological Translation',
    cover: '/images/books/cancer-cover.jpg',
    author: 'Historical Translation Project™',
    description:
      'A comprehensive exploration of how civilizations across millennia have understood, documented, and responded to cancer — from ancient Egyptian papyri and Hippocratic texts through medieval Islamic-Jewish medical treatises to the molecular biology of the modern era. This work traces the intellectual lineage of oncological thought and examines how historical botanical interventions align with contemporary research.',
    highlights: [
      'Cancer documentation in Egyptian, Greek, Roman, Islamic, and Jewish medical traditions',
      'Medieval approaches to tumors and abnormal growths in Arabic medical literature',
      'Maimonidean and Avicennian perspectives on pathological humoral imbalance',
      'Modern molecular parallels to historically documented botanical interventions',
    ],
    amazonUrl: '#', // Replace with actual Amazon URL when published
    status: 'Available',
  },
];

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Foundational Texts"
        subtitle="The books that anchor the Historical Translation Project™ mission — rigorous scholarship presented for scholars, clinicians, and curious readers alike."
        arabicQuote="اقرأ باسم ربك الذي خلق"
        arabicAttribution="Quran 96:1 — 'Read in the name of your Lord who created.'"
      />

      <section className="section">
        <div className="container">
          <div className="space-y-20">
            {books.map((book, i) => (
              <article
                key={book.title}
                className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start fade-on-scroll"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Cover image */}
                <div className={`md:col-span-2 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div
                    className="relative"
                    style={{
                      boxShadow: '0 12px 40px rgba(30,23,20,0.25), 0 4px 12px rgba(30,23,20,0.15)',
                    }}
                  >
                    <img
                      src={book.cover}
                      alt={`${book.title} book cover`}
                      className="w-full"
                      style={{
                        display: 'block',
                        maxWidth: '380px',
                        marginInline: 'auto',
                      }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className={`md:col-span-3 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge badge-gold">{book.status}</span>
                  </div>

                  <h2
                    className="t-heading-1 mb-2"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {book.title}
                  </h2>
                  <p
                    className="text-base italic mb-6"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {book.subtitle}
                  </p>

                  <p
                    className="t-body mb-8"
                    style={{ color: 'var(--color-ink-muted)', lineHeight: 1.8 }}
                  >
                    {book.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-8">
                    <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
                      Key Topics
                    </p>
                    <div className="space-y-2">
                      {book.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-3"
                        >
                          <span
                            className="geo-diamond mt-1.5 shrink-0"
                            style={{ width: '5px', height: '5px' }}
                          />
                          <p
                            className="text-sm"
                            style={{ color: 'var(--color-ink-muted)' }}
                          >
                            {h}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {book.amazonUrl && book.amazonUrl !== '#' ? (
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold"
                      >
                        Purchase on Amazon
                      </a>
                    ) : (
                      <span
                        className="btn btn-gold"
                        style={{ opacity: 0.6, cursor: 'default' }}
                      >
                        Amazon Link Coming Soon
                      </span>
                    )}
                    <Link href="/contact" className="btn btn-outline">
                      Request Review Copy
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-20 text-center fade-on-scroll"
            style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}
          >
            <div className="ornament-rule mb-8" />
            <h3 className="t-heading-2 mb-4">Upcoming Publications</h3>
            <p
              className="t-body mb-8"
              style={{ color: 'var(--color-ink-muted)', maxWidth: '36rem', marginInline: 'auto' }}
            >
              Additional volumes covering the pharmacognostic corpora of Ibn Sīnā, Ibn Zuhr,
              and al-Rāzī are in active preparation. Join our mailing list or contact us to be
              notified of new releases.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Stay Informed
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
