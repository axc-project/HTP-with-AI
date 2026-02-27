'use client';

import { useState } from 'react';

export default function AddToCartButton({ slug, title }: { slug: string; title: string }) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title, qty: 1 }),
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // silently fail for scaffold
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="btn-primary"
    >
      {added ? '\u2713 Added' : loading ? 'Adding\u2026' : 'Add to Cart'}
    </button>
  );
}
