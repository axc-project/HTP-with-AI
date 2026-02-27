import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact \u2022 Historical Translation Project\u2122',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl">
          <div className="kicker">Contact</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">Reach out</h1>
          <p className="mt-6 text-ink-900/70 leading-relaxed text-lg">
            For physician dossiers, sourcing notes, research collaboration, or
            distribution discussions:
          </p>
          <div className="mt-8 card p-8">
            <div className="h-serif text-2xl">Email</div>
            <p className="mt-2 text-ink-900/70">info@axellaresearch.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
