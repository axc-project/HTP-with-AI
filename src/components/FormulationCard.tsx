import Link from 'next/link';
import type { Formulation } from '@/data/formulations';

const categoryColors: Record<Formulation['category'], string> = {
  digestive:      'badge-emerald',
  cognitive:      'badge-gold',
  respiratory:    'badge-ink',
  botanical:      'badge-emerald',
  cardiovascular: 'badge-gold',
};

const statusLabels: Record<Formulation['researchStatus'], string> = {
  'peer-reviewed': 'Peer-Reviewed',
  'historical':    'Historical Source',
  'in-progress':   'Research In Progress',
};

interface Props {
  formulation: Formulation;
  index?: number;
}

export default function FormulationCard({ formulation: f, index = 0 }: Props) {
  return (
    <article
      className="card-manuscript flex flex-col fade-on-scroll"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Top accent bar */}
      <div style={{ height: '3px', background: 'var(--color-accent)', width: '100%' }} />

      <div className="flex flex-col flex-1 p-7">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`badge ${categoryColors[f.category]}`}>
            {f.category}
          </span>
          <span className="badge badge-ink">{statusLabels[f.researchStatus]}</span>
        </div>

        {/* Name */}
        <h3
          className="t-heading-3 mb-1"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {f.name}
        </h3>
        <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
          {f.tradeName}
        </p>

        {/* Tagline */}
        <p
          className="italic text-sm mb-4"
          style={{ color: 'var(--color-ink-muted)', lineHeight: 1.6 }}
        >
          {f.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--color-border)',
            marginBlock: '1rem',
          }}
        />

        {/* Scholar */}
        <div className="mb-4">
          <p className="t-label mb-0.5" style={{ color: 'var(--color-ink-faint)' }}>
            Primary Scholar
          </p>
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            {f.primaryScholar}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-faint)' }}>
            {f.period}
          </p>
        </div>

        {/* Key Ingredients preview */}
        <div className="mb-5">
          <p className="t-label mb-2" style={{ color: 'var(--color-ink-faint)' }}>
            Key Ingredients
          </p>
          <div className="flex flex-wrap gap-1">
            {f.keyIngredients.slice(0, 3).map((ing) => (
              <span
                key={ing.name}
                className="text-xs px-2 py-0.5"
                style={{
                  background: 'rgba(201,140,36,0.07)',
                  color: 'var(--color-ink-muted)',
                  border: '1px solid rgba(201,140,36,0.15)',
                }}
              >
                {ing.name}
              </span>
            ))}
            {f.keyIngredients.length > 3 && (
              <span
                className="text-xs px-2 py-0.5"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                +{f.keyIngredients.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            href={`/formulations/${f.slug}`}
            className="btn btn-outline w-full justify-center"
            style={{ fontSize: '0.75rem' }}
          >
            View Dossier →
          </Link>
        </div>
      </div>
    </article>
  );
}
