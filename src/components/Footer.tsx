import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20">
      <div className="bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="h-serif text-xl">
                Historical Translation Project&trade;
              </div>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                We translate preventive principles from across global medical
                history into modern, evidence-forward education&mdash;and
                thoughtfully designed botanical formulations framed in compliant
                structure/function language.
              </p>
            </div>
            <div className="text-sm">
              <div className="uppercase tracking-[0.2em] text-white/70 text-xs">
                Explore
              </div>
              <div className="mt-3 grid gap-2">
                <Link className="text-white/85 hover:text-white" href="/research">Research</Link>
                <Link className="text-white/85 hover:text-white" href="/publications">Publications</Link>
                <Link className="text-white/85 hover:text-white" href="/formulations">Formulations</Link>
                <Link className="text-white/85 hover:text-white" href="/method">Method</Link>
                <Link className="text-white/85 hover:text-white" href="/about">About</Link>
                <Link className="text-white/85 hover:text-white" href="/contact">Contact</Link>
              </div>
            </div>
            <div className="text-sm">
              <div className="uppercase tracking-[0.2em] text-white/70 text-xs">
                Compliance
              </div>
              <p className="mt-3 text-white/70 leading-relaxed">
                Educational content only; not medical advice. Supplements are
                not intended to diagnose, treat, cure, or prevent disease.
                Consult a qualified healthcare professional before use, especially
                if pregnant, nursing, taking medication, or managing a condition.
              </p>
            </div>
          </div>
          <div className="mt-10 hr-gold"></div>
          <div className="mt-6 text-white/60 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>&copy; {year} Historical Translation Project&trade;. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
