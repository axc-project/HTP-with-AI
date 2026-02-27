import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formulas } from '@/data/formulas';
import AddToCartButton from '@/components/AddToCartButton';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return formulas.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const f = formulas.find((x) => x.slug === slug);
  return { title: f ? f.title + ' \u2022 Historical Translation Project\u2122' : 'Not Found' };
}

function isHeading(s: string): boolean {
  const t = s.trim();
  if (!t || t.length > 42) return false;
  const letters = t.replace(/[^A-Za-z]/g, '');
  if (!letters) return false;
  return t === t.toUpperCase();
}

type Section = { title: string; lines: string[] };

function parseSections(body: string[]): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of body) {
    if (isHeading(line)) {
      if (current) sections.push(current);
      current = { title: line.trim(), lines: [] };
    } else {
      if (!current) current = { title: 'OVERVIEW', lines: [] };
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

export default async function FormulationDetail(props: Props) {
  const { slug } = await props.params;
  const f = formulas.find((x) => x.slug === slug);
  if (!f) notFound();

  const sections = parseSections(f.body);
  const facts = sections.find((s) => s.title === 'SUPPLEMENT FACTS');
  const factLines = (facts?.lines ?? []).map((x) => x.trim()).filter(Boolean);
  const servingLine = factLines.find((l) =>
    l.toLowerCase().startsWith('serving size')
  );
  const otherLine = factLines.find((l) =>
    l.toLowerCase().startsWith('other ingredients')
  );
  const ingredientLines = factLines
    .filter((l) => l.includes('\u2014'))
    .filter((l) => !l.toLowerCase().startsWith('other ingredients'));

  const ingredients = ingredientLines.map((l) => {
    const parts = l.split('\u2014');
    return {
      name: parts[0].trim().replace(/\s\s+/g, ' '),
      amount: (parts[1] ?? '').trim(),
    };
  });

  const contentSections = sections.filter((s) => s.title !== 'SUPPLEMENT FACTS');

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
          <div>
            <div className="kicker">Program</div>
            <h1 className="mt-3 h-serif text-4xl sm:text-5xl">{f.title}</h1>
            <p className="mt-5 text-ink-900/70 leading-relaxed text-lg">
              {f.excerpt}
            </p>

            <div className="mt-10 space-y-6">
              {contentSections.map((s, i) => (
                <section key={i} className="card p-8">
                  <h2 className="h-serif text-2xl">
                    {s.title.replace(/_/g, ' ')}
                  </h2>
                  <div className="mt-4 space-y-4 text-ink-900/75 leading-relaxed">
                    {s.lines.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="card p-8">
                <h2 className="h-serif text-2xl">Compliance</h2>
                <p className="mt-4 text-ink-900/70 leading-relaxed">
                  Educational content only; not medical advice. Supplements are
                  not intended to diagnose, treat, cure, or prevent any disease.
                  Always consult a qualified clinician before
                  use&mdash;especially if pregnant/nursing or taking medication.
                </p>
              </section>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card overflow-hidden">
              <img
                src={f.image}
                alt={f.title}
                className="w-full h-auto"
                loading="eager"
              />
            </div>

            {facts && (
              <div className="card p-8">
                <h2 className="h-serif text-2xl">Supplement Facts</h2>
                {servingLine && (
                  <p className="mt-3 text-sm text-ink-900/70">{servingLine}</p>
                )}

                <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-ink-900/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-parchment-100">
                        <th className="text-left font-medium px-4 py-3">
                          Ingredient
                        </th>
                        <th className="text-right font-medium px-4 py-3">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredients.map((ing, i) => (
                        <tr key={i} className="border-t border-ink-900/10">
                          <td className="px-4 py-3 align-top">{ing.name}</td>
                          <td className="px-4 py-3 text-right whitespace-nowrap align-top">
                            {ing.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {otherLine && (
                  <p className="mt-4 text-xs text-ink-900/60">{otherLine}</p>
                )}

                <div className="mt-6">
                  <AddToCartButton slug={f.slug} title={f.title} />
                </div>
              </div>
            )}

            <div className="card p-8">
              <h2 className="h-serif text-2xl">Technical dossier</h2>
              <p className="mt-4 text-ink-900/70 leading-relaxed">
                Download the technical dossier for complete ingredient evidence
                tables, citation index, and safety/interaction analysis.
              </p>
              <div className="mt-6">
                <Link
                  className="btn-primary"
                  href={'/api/dossier/' + f.slug}
                  target="_blank"
                >
                  Download PDF
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
