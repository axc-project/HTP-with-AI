import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shop \u2022 Historical Translation Project\u2122',
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl">
          <div className="kicker">Shop</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">
            Shopify-ready commerce architecture
          </h1>
          <p className="mt-6 text-ink-900/70 leading-relaxed text-lg">
            Even if you use a fulfillment center, Shopify can still handle
            checkout, payment processing, taxes, and order capture&mdash;then
            transmit shipping/line-item details to your fulfillment partner via
            native integrations or apps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <div className="h-serif text-2xl">What Shopify provides</div>
            <ul className="mt-4 space-y-2 text-ink-900/70">
              <li>&bull; Secure payments + checkout</li>
              <li>&bull; Product catalog + pricing</li>
              <li>&bull; Customer emails + order confirmations</li>
              <li>&bull; Discounts, subscriptions, and tax settings</li>
            </ul>
          </div>
          <div className="card p-8">
            <div className="h-serif text-2xl">Fulfillment flow</div>
            <ul className="mt-4 space-y-2 text-ink-900/70">
              <li>&bull; Customer places order on Shopify</li>
              <li>&bull; Order is routed to fulfillment center (API/app)</li>
              <li>&bull; Fulfillment center ships and returns tracking</li>
              <li>&bull; Shopify notifies customer and records status</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 card p-8">
          <div className="kicker">Status</div>
          <div className="mt-2 h-serif text-2xl">Storefront coming soon</div>
          <p className="mt-3 text-ink-900/70">
            This site is structured so purchase buttons can point to Shopify
            product pages as soon as your catalog is live.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
