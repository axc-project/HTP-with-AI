'use client';

import { useState } from 'react';
import { monographs, categories } from '@/data/monographs';

export default function MonographBrowser() {
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = active
    ? monographs.filter((m) => m.category === active)
    : monographs;

  return (
    <div className="mt-8">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={
            'rounded-full px-4 py-2 text-xs font-semibold transition ' +
            (active === null
              ? 'bg-gold-500 text-ink-900'
              : 'bg-white/70 ring-1 ring-ink-900/10 text-ink-900/70 hover:bg-white')
          }
        >
          All ({monographs.length})
        </button>
        {categories.map((cat) => {
          const count = monographs.filter((m) => m.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? null : cat)}
              className={
                'rounded-full px-4 py-2 text-xs font-semibold transition ' +
                (active === cat
                  ? 'bg-gold-500 text-ink-900'
                  : 'bg-white/70 ring-1 ring-ink-900/10 text-ink-900/70 hover:bg-white')
              }
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Monograph cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((m) => (
          <div key={m.id} className="card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="h-serif text-xl">{m.commonName}</h3>
                <p className="text-sm italic text-ink-900/60">{m.latinName}</p>
                <span className="mt-1 inline-block rounded-full bg-parchment-100 px-3 py-1 text-[10px] uppercase tracking-wider text-ink-900/60">
                  {m.category}
                </span>
              </div>
            </div>

            {expanded === m.id ? (
              <div className="mt-4 space-y-4 text-sm text-ink-900/75 leading-relaxed">
                <div>
                  <div className="font-semibold text-ink-900/90">Historical Use</div>
                  <p className="mt-1">{m.historicalUse}</p>
                </div>
                <div>
                  <div className="font-semibold text-ink-900/90">Modern Evidence</div>
                  <p className="mt-1">{m.modernEvidence}</p>
                </div>
                <div>
                  <div className="font-semibold text-ink-900/90">Active Compounds</div>
                  <p className="mt-1">{m.activeCompounds.join(', ')}</p>
                </div>
                <div>
                  <div className="font-semibold text-ink-900/90">Safety Notes</div>
                  <p className="mt-1">{m.safetyNotes}</p>
                </div>
                {m.formulaAppearance.length > 0 && (
                  <div>
                    <div className="font-semibold text-ink-900/90">Appears In</div>
                    <p className="mt-1">{m.formulaAppearance.join(', ')}</p>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-ink-900/90">References</div>
                  <ol className="mt-2 list-decimal list-inside space-y-2">
                    {m.references.map((ref) => (
                      <li key={ref.id} className="text-xs leading-relaxed">
                        {ref.authors} ({ref.year}). {ref.title}. <em>{ref.journal}</em>.{' '}
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gold-600 underline hover:text-gold-500"
                        >
                          {ref.url.includes('doi.org') ? 'DOI' : 'PubMed'}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
                <button
                  onClick={() => setExpanded(null)}
                  className="text-xs font-semibold text-gold-600 hover:text-gold-500"
                >
                  Collapse &uarr;
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm text-ink-900/70 line-clamp-2">
                  {m.modernEvidence}
                </p>
                <button
                  onClick={() => setExpanded(m.id)}
                  className="mt-2 text-xs font-semibold text-gold-600 hover:text-gold-500"
                >
                  Read full monograph &darr;
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
