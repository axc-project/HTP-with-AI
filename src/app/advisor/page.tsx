'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            'I apologize, but I encountered an error. Please try again or contact info@axellaresearch.com for assistance.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-14">
        <div className="text-center">
          <div className="kicker">AI Advisor</div>
          <h1 className="mt-3 h-serif text-4xl sm:text-5xl">
            Botanical Wellness Advisor
          </h1>
          <p className="mt-5 text-ink-900/70 max-w-2xl mx-auto leading-relaxed">
            Ask questions about botanical ingredients, historical medical
            traditions, formulation rationale, or general wellness
            education. Powered by Claude.
          </p>
        </div>

        {/* DSHEA Disclaimer */}
        <div className="mt-8 card p-6 bg-parchment-100/80">
          <p className="text-xs text-ink-900/60 leading-relaxed">
            <strong>Important:</strong> This AI advisor provides educational
            information only, consistent with the Dietary Supplement Health and
            Education Act (DSHEA) of 1994. It does not provide medical advice,
            diagnose conditions, or recommend treatments. All responses are
            framed in structure/function language. Supplements are not intended
            to diagnose, treat, cure, or prevent any disease. Always consult a
            qualified healthcare professional before starting any supplement
            regimen, especially if pregnant, nursing, taking medication, or
            managing a health condition.
          </p>
        </div>

        {/* Chat area */}
        <div className="mt-8 card p-6 min-h-[400px] flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-2">
            {messages.length === 0 && (
              <div className="text-center text-ink-900/40 py-16">
                <p className="h-serif text-xl">
                  Ask me about botanical ingredients, historical traditions, or
                  our formulations.
                </p>
                <p className="mt-2 text-sm">
                  Example: &ldquo;What is the evidence for hawthorn extract in
                  cardiovascular support?&rdquo;
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  'max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ' +
                  (m.role === 'user'
                    ? 'ml-auto bg-navy-900 text-white'
                    : 'mr-auto bg-parchment-100 text-ink-900')
                }
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-parchment-100 text-ink-900/50 rounded-2xl px-5 py-3 text-sm">
                Thinking&hellip;
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your question\u2026"
              className="flex-1 rounded-full border border-ink-900/10 bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="btn-primary"
            >
              Send
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-ink-900/50">
          *These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat, cure,
          or prevent any disease.
        </p>
      </main>
      <Footer />
    </>
  );
}
