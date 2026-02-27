import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const AdvisorClient = dynamic(() => import('@/components/AdvisorClient'), {
  ssr: false,
  loading: () => (
    <section
      style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container text-center">
        <div className="flex justify-center mb-4">
          <span className="relative flex h-4 w-4">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: 'var(--color-accent)', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}
            />
            <span className="relative inline-flex rounded-full h-4 w-4" style={{ background: 'var(--color-accent)' }} />
          </span>
          <style>{`@keyframes ping { 75%,100% { transform: scale(2); opacity: 0 } }`}</style>
        </div>
        <p className="t-label" style={{ color: 'var(--color-accent)' }}>
          Loading Botanical Wellness Advisor…
        </p>
      </div>
    </section>
  ),
});

export const metadata: Metadata = {
  title: 'Botanical Wellness Advisor — AI-Powered',
  description:
    'AI-powered botanical wellness education with live research guidance, grounded in nine centuries of Islamic-Jewish medical scholarship. Educational tool only — not medical advice.',
};

export default function AdvisorPage() {
  return <AdvisorClient />;
}
