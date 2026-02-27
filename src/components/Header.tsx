'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, siteConfig } from '@/data/site';
import { useCart } from '@/components/CartProvider';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled
          ? 'rgba(253,248,240,0.97)'
          : 'rgba(253,248,240,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 2px 20px rgba(30,23,20,0.08)' : 'none',
      }}
    >
      <div className="container">
        <div
          className="flex items-center justify-between"
          style={{ paddingBlock: '1rem' }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline"
            style={{ color: 'var(--color-ink)' }}
          >
            {/* Logo image */}
            <img
              src="/images/brand/logo.png"
              alt="Historical Translation Project logo"
              style={{ width: '44px', height: '44px', objectFit: 'contain' }}
            />
            <div className="hidden sm:block">
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                {siteConfig.name}
              </p>
              <p
                className="t-label"
                style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}
              >
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                  style={{
                    fontFamily: 'var(--font-jost)',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                  {link.badge && (
                    <span className="badge badge-gold" style={{ fontSize: '0.55rem' }}>
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '1rem',
                        right: '1rem',
                        height: '1px',
                        background: 'var(--color-accent)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Cart + Mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* Cart indicator */}
            {itemCount > 0 && (
              <Link
                href="/formulations"
                className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors"
                style={{
                  fontFamily: 'var(--font-jost)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                  textDecoration: 'none',
                  border: '1px solid var(--color-accent)',
                  background: 'rgba(201,140,36,0.06)',
                }}
                title="View cart"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span style={{ color: 'var(--color-accent)' }}>{itemCount}</span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  background: 'var(--color-ink)',
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform:
                    menuOpen
                      ? i === 0 ? 'translateY(8px) rotate(45deg)'
                        : i === 2 ? 'translateY(-8px) rotate(-45deg)'
                        : 'none'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            className="md:hidden pb-4"
            style={{ borderTop: '1px solid var(--color-border)' }}
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 py-3 px-2"
                style={{
                  color: pathname === link.href ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.95rem',
                }}
              >
                {link.label}
                {link.badge && (
                  <span className="badge badge-gold" style={{ fontSize: '0.55rem' }}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
