import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = { title: 'Terms \u2022 Historical Translation Project\u2122' };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl card p-8">
          <h1 className="h-serif text-3xl">Terms</h1>
          <p className="mt-4 text-ink-900/70 leading-relaxed">
            Placeholder. Replace with your final terms policy text before launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
