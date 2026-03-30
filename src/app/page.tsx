import { EstimateBuilder } from "@/components/estimate-builder";

const platformHighlights = [
  {
    title: "BAR-first workflow",
    description:
      "The product is designed around California's estimate, authorization, towing, and tear-down requirements instead of treating compliance as an afterthought.",
  },
  {
    title: "Advisor-friendly drafting",
    description:
      "Technical line items are translated into consumer-friendly language so service advisors can move faster without sending confusing estimates.",
  },
  {
    title: "Production-minded foundation",
    description:
      "This starter version is intentionally structured so it can grow into a multi-tenant SaaS with authentication, persistence, and audit logs.",
  },
];

const roadmap = [
  "Persist estimates to PostgreSQL with immutable authorization history.",
  "Add role-based authentication for advisors, managers, and dealership admins.",
  "Generate printable PDFs and customer approval links.",
  "Integrate Tekion/CDK/Reynolds data sources for RO, VIN, and labor guide sync.",
];

export default function Home() {
  // The landing page doubles as both a portfolio demo and a future product shell.
  // Keep copy blocks declarative here so future contributors can swap content
  // without digging into the estimate-builder internals.
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.25),_transparent_45%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)] px-6 py-10 text-white md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-950/65 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              FC Developments • vertical SaaS
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              BAR Estimate Compliance Writer
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              A production-leaning prototype for California dealerships and repair
              shops that need customer-friendly estimates, audit-ready
              disclosures, and a cleaner handoff between service advisors and
              customers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              {[
                "Next.js 15",
                "TypeScript",
                "Tailwind CSS",
                "Compliance-aware estimate drafting",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              Why this matters
            </p>
            <div className="mt-5 space-y-5">
              {platformHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <h2 className="text-lg font-semibold text-white">{highlight.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <EstimateBuilder />

        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/65 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Production roadmap
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Ready to evolve into a real dealership product
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              This repo is intentionally opinionated: typed business logic lives
              in a dedicated compliance library, the UI is split into reusable
              components, and the README outlines what to add next for a full
              SaaS rollout.
            </p>
          </div>
          <div className="space-y-3">
            {roadmap.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm leading-6 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
