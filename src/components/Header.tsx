'use client';

import { useState } from 'react';
import Link from 'next/link';

const nav = [
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/formulations', label: 'Formulations' },
  { href: '/method', label: 'Method' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-950/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/brand/logo.png"
              alt="Historical Translation Project logo"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-[0.9rem] ring-1 ring-white/10"
            />
            <div className="hidden sm:block">
              <div className="h-serif text-white text-lg leading-none">
                Historical Translation Project&trade;
              </div>
              <div className="text-white/70 text-xs tracking-widest uppercase mt-1">
                Research &bull; Publications &bull; Formulations
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm text-white/80">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="hover:text-white transition"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="hidden sm:inline-flex btn-ghost !bg-white/10 !text-white !ring-white/15 hover:!bg-white/15"
            >
              Shop
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-full ring-1 ring-white/15 text-white/90 hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              &#9776;
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-4 grid gap-2 text-white/90">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="py-2"
                  onClick={() => setOpen(false)}
                >
                  {i.label}
                </Link>
              ))}
              <Link
                href="/shop"
                className="py-2"
                onClick={() => setOpen(false)}
              >
                Shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
