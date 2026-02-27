"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { formulations } from "@/data/formulations";
import AddToCartButton from "@/components/AddToCartButton";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════ */

const FULL_DISCLAIMER =
  "This is an educational wellness tool, not a medical recommendation engine. It does not diagnose, treat, cure, or prevent any disease. All information is for educational purposes only. These statements have not been evaluated by the Food and Drug Administration. Consult a qualified healthcare practitioner before use, especially if pregnant, nursing, taking medication, or managing any health condition.";

const WELLNESS_DOMAINS = [
  { id: "digestive", label: "Digestive Comfort", desc: "Supports healthy digestion, motility, and gastric comfort" },
  { id: "cognitive", label: "Cognitive Vitality", desc: "Supports healthy memory, focus, and neurological function" },
  { id: "respiratory", label: "Respiratory Wellness", desc: "Supports healthy airways and comfortable breathing" },
  { id: "cardiovascular", label: "Circulatory Health", desc: "Supports healthy circulation and cardiovascular function" },
  { id: "cellular", label: "Cellular Resilience", desc: "Supports healthy immune balance and antioxidant pathways" },
  { id: "metabolic", label: "Metabolic Balance", desc: "Supports healthy metabolic signaling and energy" },
  { id: "vitality", label: "Vitality & Longevity", desc: "Supports mitochondrial function and healthy cellular energy" },
  { id: "urinary", label: "Urinary Comfort", desc: "Supports healthy urinary flow and prostate physiology" },
];

const MED_CLASSES = [
  { id: "anticoagulant", label: "Blood thinners (warfarin, aspirin, etc.)" },
  { id: "antihypertensive", label: "Blood pressure medications" },
  { id: "diabetes", label: "Diabetes / blood sugar medications" },
  { id: "statin", label: "Cholesterol medications (statins)" },
  { id: "immunosuppressant", label: "Immunosuppressants (transplant / autoimmune)" },
  { id: "ssri", label: "Antidepressants (SSRIs, SNRIs)" },
  { id: "seizure", label: "Seizure / epilepsy medications" },
  { id: "chemo", label: "Cancer treatment (chemo, immunotherapy, radiation)" },
  { id: "none", label: "None of the above" },
];

const DOMAIN_MAP: Record<string, string[]> = {
  digestive: ["digestive-balance-complex"],
  cognitive: ["cognitive-clarity-blend"],
  respiratory: ["respiratory-harmony-formula"],
  cardiovascular: ["cardiovascular-reserve-compound"],
  cellular: ["digestive-balance-complex", "cardiovascular-reserve-compound"],
  metabolic: ["digestive-balance-complex"],
  vitality: ["cardiovascular-reserve-compound"],
  urinary: [],
};

const INTERACTION_RULES: Record<string, { meds: string[]; severity: "caution" | "warning"; message: string }[]> = {
  "digestive-balance-complex": [
    { meds: ["anticoagulant"], severity: "caution", message: "Ginger has mild antiplatelet activity. Discuss with your healthcare provider if taking blood thinners." },
  ],
  "cognitive-clarity-blend": [
    { meds: ["ssri"], severity: "caution", message: "Saffron has mild serotonergic activity. Discuss with your healthcare provider if taking antidepressants." },
    { meds: ["seizure"], severity: "caution", message: "Bacopa may have additive effects with cholinergic medications. Consult your physician." },
  ],
  "cardiovascular-reserve-compound": [
    { meds: ["anticoagulant"], severity: "warning", message: "This formulation contains ingredients with antiplatelet properties. Discuss with your healthcare provider before use with blood thinners." },
    { meds: ["antihypertensive"], severity: "caution", message: "Hawthorn may have additive effects with blood pressure medications. Monitor blood pressure and consult your physician." },
    { meds: ["diabetes"], severity: "caution", message: "Cinnamon may support healthy blood sugar levels. Monitor glucose if taking diabetes medications." },
  ],
  "respiratory-harmony-formula": [
    { meds: ["antihypertensive"], severity: "caution", message: "Licorice root may affect blood pressure. Discuss with your healthcare provider." },
    { meds: ["immunosuppressant"], severity: "caution", message: "Some ingredients may modulate immune function. Consult your physician." },
  ],
};

const SURGERY_WARNING =
  "Discontinue all botanical supplements 7–10 days before any scheduled surgical procedure. Share your complete supplement list with your surgical team.";

const SUGGESTED_QUESTIONS = [
  "What is the historical basis for these formulations?",
  "How does HTP authenticate its manuscript sources?",
  "Tell me more about the ingredients in my matched formulations",
  "What does Maimonides say about digestive health?",
  "How are modern phytochemical methods used in HTP research?",
  "What should I discuss with my doctor before trying these?",
];

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

type Step = "disclaimer" | "type" | "interests" | "medications" | "surgery" | "results";
type ChatMessage = { role: "user" | "assistant"; content: string };

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function AdvisorClient() {
  /* ── Assessment State ── */
  const [step, setStep] = useState<Step>("disclaimer");
  const [accepted, setAccepted] = useState(false);
  const [userType, setUserType] = useState<"individual" | "practitioner" | "">("");
  const [interests, setInterests] = useState<string[]>([]);
  const [meds, setMeds] = useState<string[]>([]);
  const [surgeryPlanned, setSurgeryPlanned] = useState<boolean | null>(null);

  /* ── Chat State ── */
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const stepOrder: Step[] = ["disclaimer", "type", "interests", "medications", "surgery", "results"];
  const currentIdx = stepOrder.indexOf(step);
  const progress = (currentIdx / (stepOrder.length - 1)) * 100;

  /* ── Helpers ── */
  const toggleInterest = (id: string) =>
    setInterests((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleMed = (id: string) => {
    if (id === "none") { setMeds(["none"]); return; }
    setMeds((prev) => {
      const next = prev.filter((x) => x !== "none");
      return next.includes(id) ? next.filter((x) => x !== id) : [...next, id];
    });
  };

  /* ── Compute Results ── */
  const getResults = useCallback(() => {
    const slugSet = new Set<string>();
    interests.forEach((d) => (DOMAIN_MAP[d] || []).forEach((s) => slugSet.add(s)));
    const matched = Array.from(slugSet)
      .map((slug) => formulations.find((f) => f.slug === slug))
      .filter((f): f is typeof formulations[number] => !!f);
    const alerts: { slug: string; severity: "caution" | "warning"; message: string }[] = [];
    matched.forEach((f) => {
      const rules = INTERACTION_RULES[f.slug] || [];
      rules.forEach((r) => {
        if (r.meds.some((m) => meds.includes(m))) {
          alerts.push({ slug: f.slug, severity: r.severity, message: r.message });
        }
      });
    });
    return { matched, alerts };
  }, [interests, meds]);

  /* ── Chat Context for API ── */
  const getChatContext = useCallback(() => ({
    userType,
    interests: interests.map((id) => WELLNESS_DOMAINS.find((d) => d.id === id)?.label || id),
    medications: meds.filter((m) => m !== "none").map((id) => MED_CLASSES.find((m) => m.id === id)?.label || id),
    surgeryPlanned,
    matchedFormulations: getResults().matched.map((f) => f.name),
  }), [userType, interests, meds, surgeryPlanned, getResults]);

  /* ── Send Chat Message ── */
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || chatLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    setChatError("");

    try {
      const allMessages = [...chatMessages, userMsg].map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages,
          context: getChatContext(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setChatError(data.error || data.message || "Something went wrong.");
        // If it's a config issue, still show a helpful message
        if (data.status === "needs_api_key") {
          setChatMessages((prev) => [...prev, {
            role: "assistant",
            content: "The AI advisor is currently being configured by the site administrator. In the meantime, you can explore the matched formulations above, browse the full dossiers on our Formulations page, or reach out to us directly via the Contact page. We'd be happy to answer your questions personally.",
          }]);
        }
        return;
      }

      setChatMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setChatError("Network error — please check your connection and try again.");
    } finally {
      setChatLoading(false);
    }
  }, [chatMessages, chatLoading, getChatContext]);

  /* ── Auto-scroll chat ── */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  /* ── Auto-resize textarea ── */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput);
    }
  };

  /* ── Send welcome message when entering results ── */
  useEffect(() => {
    if (step === "results" && chatMessages.length === 0) {
      const { matched } = getResults();
      const names = matched.map((f) => f.name).join(", ");
      const welcome = names
        ? `Welcome to the HTP Botanical Wellness Advisor. Based on your wellness interests, I've identified ${matched.length} formulation${matched.length > 1 ? "s" : ""} for you to explore: ${names}. I can answer questions about their historical foundations, ingredients, research methodology, or anything else about our scholarship. What would you like to know?`
        : `Welcome to the HTP Botanical Wellness Advisor. I'm here to help you explore our botanical scholarship — from Maimonides' medical writings to modern phytochemical research. What would you like to know?`;
      setChatMessages([{ role: "assistant", content: welcome }]);
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ═══════════════════════════════════════════════════════════════
     RENDER HELPERS
     ═══════════════════════════════════════════════════════════════ */

  const Btn = ({ onClick, disabled, children, variant = "primary" }: {
    onClick: () => void; disabled?: boolean; children: React.ReactNode; variant?: "primary" | "outline";
  }) => (
    <button onClick={onClick} disabled={disabled}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-outline"}`}
      style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
      {children}
    </button>
  );

  const StepCard = ({ children, title, eyebrow }: { children: React.ReactNode; title: string; eyebrow?: string }) => (
    <div className="card-manuscript p-8 md:p-10" style={{ maxWidth: "48rem", marginInline: "auto" }}>
      {eyebrow && <p className="t-label mb-3" style={{ color: "var(--color-accent)" }}>{eyebrow}</p>}
      <h2 className="t-heading-2 mb-6">{title}</h2>
      {children}
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  return (
    <section className="section" style={{ background: "var(--color-bg)", minHeight: "calc(100vh - 80px)" }}>
      <div className="container" style={{ maxWidth: "72rem" }}>

        {/* ── Progress Bar ── */}
        {step !== "disclaimer" && step !== "results" && (
          <div className="mb-10" style={{ maxWidth: "48rem", marginInline: "auto" }}>
            <div className="flex justify-between items-center mb-2">
              <p className="t-label" style={{ color: "var(--color-accent)" }}>Wellness Assessment</p>
              <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>Step {currentIdx} of {stepOrder.length - 1}</p>
            </div>
            <div style={{ height: "2px", background: "var(--color-border)", width: "100%" }}>
              <div style={{ height: "2px", background: "var(--color-accent)", width: `${progress}%`, transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {/* ══════════ STEP: Disclaimer ══════════ */}
        {step === "disclaimer" && (
          <StepCard title="Botanical Wellness Advisor" eyebrow="AI-Powered Educational Tool">
            <p className="t-body mb-6" style={{ color: "var(--color-ink-muted)" }}>
              This advisor combines a guided wellness assessment with a live AI research assistant trained on nine centuries of Islamic-Jewish medical scholarship. It provides educational information only — never medical advice.
            </p>
            <div className="mb-8" style={{ background: "rgba(201,140,36,0.06)", border: "1px solid rgba(201,140,36,0.2)", padding: "1.5rem" }}>
              <p className="text-sm" style={{ color: "var(--color-ink-muted)", lineHeight: 1.75 }}>
                <strong style={{ color: "var(--color-accent-dark)" }}>Important — Please Read Carefully.</strong>{" "}
                {FULL_DISCLAIMER}
              </p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer mb-8">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1" style={{ accentColor: "var(--color-accent)", width: "18px", height: "18px" }} />
              <span className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                I understand that this is an educational tool and does not provide medical advice. I will consult my healthcare provider before making any decisions about supplements.
              </span>
            </label>
            <Btn onClick={() => setStep("type")} disabled={!accepted}>I Understand — Continue</Btn>
          </StepCard>
        )}

        {/* ══════════ STEP: User Type ══════════ */}
        {step === "type" && (
          <StepCard title="How would you describe yourself?" eyebrow="Step 1 · User Profile">
            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {([
                { id: "individual" as const, label: "Individual", desc: "Exploring botanical wellness options for personal use." },
                { id: "practitioner" as const, label: "Healthcare Practitioner", desc: "Reviewing options for patients as a physician, pharmacist, or licensed practitioner." },
              ]).map((opt) => (
                <button key={opt.id} onClick={() => setUserType(opt.id)}
                  className="card-manuscript p-6 text-left transition-all"
                  style={{ borderColor: userType === opt.id ? "var(--color-accent)" : "var(--color-border)", borderWidth: "2px" }}>
                  <p className="font-medium mb-1" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem" }}>{opt.label}</p>
                  <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{opt.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Btn onClick={() => setStep("disclaimer")} variant="outline">Back</Btn>
              <Btn onClick={() => setStep("interests")} disabled={!userType}>Continue</Btn>
            </div>
          </StepCard>
        )}

        {/* ══════════ STEP: Wellness Interests ══════════ */}
        {step === "interests" && (
          <StepCard title="What wellness areas interest you?" eyebrow="Step 2 · Wellness Interests">
            <p className="text-sm mb-6" style={{ color: "var(--color-ink-muted)" }}>
              Select one or more areas. These are general wellness domains — not diagnoses or conditions.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 mb-8">
              {WELLNESS_DOMAINS.map((d) => (
                <button key={d.id} onClick={() => toggleInterest(d.id)}
                  className="card-manuscript p-5 text-left transition-all flex gap-3"
                  style={{ borderColor: interests.includes(d.id) ? "var(--color-accent)" : "var(--color-border)", borderWidth: interests.includes(d.id) ? "2px" : "1px" }}>
                  <span style={{ color: interests.includes(d.id) ? "var(--color-accent)" : "var(--color-ink-faint)", fontSize: "1.1rem" }}>◈</span>
                  <div>
                    <p className="font-medium text-sm">{d.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-ink-faint)" }}>{d.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Btn onClick={() => setStep("type")} variant="outline">Back</Btn>
              <Btn onClick={() => setStep("medications")} disabled={interests.length === 0}>Continue</Btn>
            </div>
          </StepCard>
        )}

        {/* ══════════ STEP: Medication Screening ══════════ */}
        {step === "medications" && (
          <StepCard title="Current Medication Classes" eyebrow="Step 3 · Safety Screening">
            <div className="mb-4" style={{ background: "rgba(201,140,36,0.06)", border: "1px solid rgba(201,140,36,0.2)", padding: "1rem" }}>
              <p className="text-xs" style={{ color: "var(--color-accent-dark)" }}>
                <strong>Educational screening only.</strong> This does not replace a pharmacist or physician review. We ask about medication <em>classes</em> to flag ingredients that may require discussion with your healthcare provider.
              </p>
            </div>
            <div className="space-y-2 mb-8">
              {MED_CLASSES.map((m) => (
                <label key={m.id} className="flex items-center gap-3 p-3 cursor-pointer transition-all"
                  style={{ background: meds.includes(m.id) ? "rgba(201,140,36,0.06)" : "transparent", border: `1px solid ${meds.includes(m.id) ? "rgba(201,140,36,0.3)" : "var(--color-border)"}` }}>
                  <input type="checkbox" checked={meds.includes(m.id)} onChange={() => toggleMed(m.id)}
                    style={{ accentColor: "var(--color-accent)", width: "16px", height: "16px" }} />
                  <span className="text-sm">{m.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <Btn onClick={() => setStep("interests")} variant="outline">Back</Btn>
              <Btn onClick={() => setStep("surgery")} disabled={meds.length === 0}>Continue</Btn>
            </div>
          </StepCard>
        )}

        {/* ══════════ STEP: Surgery Check ══════════ */}
        {step === "surgery" && (
          <StepCard title="Upcoming Procedures" eyebrow="Step 4 · Surgery Screening">
            <p className="text-sm mb-6" style={{ color: "var(--color-ink-muted)" }}>
              Do you have any surgical or dental procedures scheduled within the next 30 days?
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {[{ val: true, label: "Yes" }, { val: false, label: "No" }].map((opt) => (
                <button key={String(opt.val)} onClick={() => setSurgeryPlanned(opt.val)}
                  className="card-manuscript p-5 text-center transition-all"
                  style={{ borderColor: surgeryPlanned === opt.val ? "var(--color-accent)" : "var(--color-border)", borderWidth: "2px" }}>
                  <p className="font-medium" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem" }}>{opt.label}</p>
                </button>
              ))}
            </div>
            {surgeryPlanned && (
              <div className="mb-6 p-4" style={{ background: "rgba(200,60,60,0.06)", border: "1px solid rgba(200,60,60,0.25)" }}>
                <p className="text-sm" style={{ color: "#8b3030" }}><strong>Important:</strong> {SURGERY_WARNING}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Btn onClick={() => setStep("medications")} variant="outline">Back</Btn>
              <Btn onClick={() => setStep("results")} disabled={surgeryPlanned === null}>Launch Advisor</Btn>
            </div>
          </StepCard>
        )}

        {/* ══════════════════════════════════════════════════════
           STEP: RESULTS + LIVE AI CHAT
           ══════════════════════════════════════════════════════ */}
        {step === "results" && (() => {
          const { matched, alerts } = getResults();
          return (
            <div>
              {/* Persistent disclaimer */}
              <div className="disclaimer-banner mb-8" style={{ padding: "0.8rem 0" }}>
                <div className="container">
                  <p className="text-xs" style={{ color: "var(--color-accent-dark)" }}>
                    <strong>Educational Information Only — Not Medical Advice.</strong>{" "}
                    Discuss any changes to your wellness routine with your healthcare provider.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8">
                {/* ── LEFT: Formulation Results ── */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <p className="t-label mb-2" style={{ color: "var(--color-accent)" }}>Your Wellness Profile</p>
                    <h2 className="t-heading-2 mb-2">Matched Formulations</h2>
                  </div>

                  {/* Safety Alerts */}
                  {alerts.length > 0 && (
                    <div className="space-y-2">
                      {alerts.map((a, i) => (
                        <div key={i} className="p-3 flex gap-2"
                          style={{ background: a.severity === "warning" ? "rgba(200,60,60,0.06)" : "rgba(201,140,36,0.06)", border: `1px solid ${a.severity === "warning" ? "rgba(200,60,60,0.25)" : "rgba(201,140,36,0.25)"}` }}>
                          <span style={{ color: a.severity === "warning" ? "#8b3030" : "var(--color-accent-dark)", flexShrink: 0 }}>⚠</span>
                          <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{a.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {surgeryPlanned && (
                    <div className="p-3" style={{ background: "rgba(200,60,60,0.06)", border: "1px solid rgba(200,60,60,0.25)" }}>
                      <p className="text-xs" style={{ color: "#8b3030" }}><strong>Surgery:</strong> {SURGERY_WARNING}</p>
                    </div>
                  )}

                  {/* Matched cards */}
                  {matched.length > 0 ? matched.map((f) => {
                    const formulaAlerts = alerts.filter((a) => a.slug === f.slug);
                    return (
                      <div key={f.slug} className="card-manuscript overflow-hidden">
                        <div style={{ height: "3px", background: "var(--color-accent)" }} />
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="badge badge-gold" style={{ textTransform: "capitalize" }}>{f.category}</span>
                            {formulaAlerts.length > 0 && <span className="badge" style={{ background: "rgba(200,60,60,0.08)", color: "#8b3030", borderColor: "rgba(200,60,60,0.3)" }}>Flag</span>}
                          </div>
                          <h3 className="t-heading-3 mb-1" style={{ fontSize: "1.1rem" }}>{f.name}</h3>
                          <p className="text-xs italic mb-3" style={{ color: "var(--color-ink-muted)" }}>{f.tagline}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {f.keyIngredients.slice(0, 3).map((ing) => (
                              <span key={ing.name} className="text-xs px-2 py-0.5" style={{ background: "rgba(201,140,36,0.07)", border: "1px solid rgba(201,140,36,0.15)" }}>{ing.name}</span>
                            ))}
                            {f.keyIngredients.length > 3 && <span className="text-xs px-1" style={{ color: "var(--color-ink-faint)" }}>+{f.keyIngredients.length - 3}</span>}
                          </div>
                          <div className="space-y-2">
                            <Link href={`/formulations/${f.slug}`} className="btn btn-outline w-full justify-center" style={{ fontSize: "0.7rem", padding: "0.5rem 1rem" }}>
                              View Full Dossier →
                            </Link>
                            <AddToCartButton formulation={f} compact />
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="card-manuscript p-6 text-center">
                      <p className="t-heading-3 mb-2" style={{ fontSize: "1.1rem" }}>No Exact Matches</p>
                      <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                        Ask the advisor about your interests — or <Link href="/formulations" style={{ color: "var(--color-accent)" }}>browse all formulations</Link>.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => { setStep("disclaimer"); setAccepted(false); setUserType(""); setInterests([]); setMeds([]); setSurgeryPlanned(null); setChatMessages([]); setChatError(""); }}
                      className="btn btn-outline" style={{ fontSize: "0.7rem" }}>Start Over</button>
                    <Link href="/formulations" className="btn btn-outline" style={{ fontSize: "0.7rem" }}>All Formulations</Link>
                  </div>
                </div>

                {/* ── RIGHT: AI Chat ── */}
                <div className="lg:col-span-3 flex flex-col" style={{ minHeight: "600px" }}>
                  <div className="card-manuscript flex flex-col flex-1 overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--color-emerald)", animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }} />
                          <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: "var(--color-emerald)" }} />
                        </span>
                        <style>{`@keyframes ping { 75%,100% { transform: scale(2); opacity: 0 } }`}</style>
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}>HTP Research Advisor</p>
                        <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>AI-powered · Educational only</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "500px" }}>
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className="max-w-[85%]" style={{
                            padding: "0.75rem 1rem",
                            background: msg.role === "user" ? "var(--color-ink)" : "var(--color-surface)",
                            color: msg.role === "user" ? "var(--color-bg)" : "var(--color-ink)",
                            border: msg.role === "assistant" ? "1px solid var(--color-border)" : "none",
                            fontSize: "0.9rem",
                            lineHeight: 1.65,
                          }}>
                            {msg.content.split("\n\n").map((p, j) => (
                              <p key={j} style={{ marginTop: j > 0 ? "0.75rem" : 0 }}>{p}</p>
                            ))}
                          </div>
                        </div>
                      ))}

                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className="px-4 py-3" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <span key={i} className="inline-block w-2 h-2 rounded-full" style={{
                                  background: "var(--color-accent)",
                                  animation: `dotPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
                                }} />
                              ))}
                              <style>{`@keyframes dotPulse { 0%,60%,100% { opacity: 0.3; transform: scale(0.8) } 30% { opacity: 1; transform: scale(1) } }`}</style>
                            </div>
                          </div>
                        </div>
                      )}

                      {chatError && (
                        <div className="p-3" style={{ background: "rgba(200,60,60,0.06)", border: "1px solid rgba(200,60,60,0.25)" }}>
                          <p className="text-xs" style={{ color: "#8b3030" }}>{chatError}</p>
                        </div>
                      )}

                      <div ref={chatEndRef} />
                    </div>

                    {/* Suggested Questions (show when few messages) */}
                    {chatMessages.length <= 2 && (
                      <div className="px-4 pb-2">
                        <p className="t-label mb-2" style={{ color: "var(--color-ink-faint)", fontSize: "0.55rem" }}>Suggested Questions</p>
                        <div className="flex flex-wrap gap-1.5">
                          {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                            <button key={q} onClick={() => sendMessage(q)}
                              className="text-xs px-2.5 py-1.5 transition-all"
                              style={{ background: "rgba(201,140,36,0.07)", border: "1px solid rgba(201,140,36,0.2)", color: "var(--color-ink-muted)", cursor: "pointer" }}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chat Input */}
                    <div className="p-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                      <div className="flex gap-2">
                        <textarea
                          ref={inputRef}
                          value={chatInput}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          placeholder="Ask about ingredients, history, methodology…"
                          rows={1}
                          style={{
                            flex: 1,
                            resize: "none",
                            padding: "0.6rem 0.9rem",
                            background: "var(--color-bg)",
                            border: "1px solid var(--color-border)",
                            color: "var(--color-ink)",
                            fontFamily: "var(--font-jost)",
                            fontSize: "0.9rem",
                            outline: "none",
                            lineHeight: 1.5,
                            maxHeight: "120px",
                          }}
                          onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--color-accent)"; }}
                          onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--color-border)"; }}
                        />
                        <button
                          onClick={() => sendMessage(chatInput)}
                          disabled={!chatInput.trim() || chatLoading}
                          className="btn btn-primary"
                          style={{
                            padding: "0.6rem 1.2rem",
                            opacity: !chatInput.trim() || chatLoading ? 0.4 : 1,
                            cursor: !chatInput.trim() || chatLoading ? "not-allowed" : "pointer",
                            alignSelf: "flex-end",
                          }}
                        >
                          Send
                        </button>
                      </div>
                      <p className="text-xs mt-2" style={{ color: "var(--color-ink-faint)" }}>
                        Educational only · Not medical advice · Press Enter to send
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom disclaimer */}
              <div className="mt-8 p-6" style={{ background: "rgba(201,140,36,0.05)", border: "1px solid rgba(201,140,36,0.15)" }}>
                <p className="text-xs" style={{ color: "var(--color-accent-dark)", lineHeight: 1.65 }}>
                  <strong>Educational Information Only.</strong> {FULL_DISCLAIMER}
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
