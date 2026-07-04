"use client";

import { useMemo, useState } from "react";
import {
  buildDisclosureNotes,
  calculateLineItemTotal,
  calculateTotals,
  defaultEstimateState,
  generateComplianceChecks,
  type EstimateFormState,
} from "@/lib/compliance";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function EstimateBuilder() {
  // This component currently owns local state for a fast demo loop.
  // In production, this same shape can be hydrated from a database record.
  const [state, setState] = useState<EstimateFormState>(defaultEstimateState);

  const totals = useMemo(() => calculateTotals(state), [state]);
  const checks = useMemo(() => generateComplianceChecks(state), [state]);
  const disclosures = useMemo(() => buildDisclosureNotes(state), [state]);

  const complianceScore = Math.round(
    (checks.filter((check) => check.passed).length / checks.length) * 100,
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Estimate Builder
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Build a BAR-ready estimate draft
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              This demo focuses on the hardest part of the workflow: producing a
              customer-friendly estimate with the disclosures California repair
              shops and dealerships need to track.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
              Compliance score
            </p>
            <p className="text-3xl font-semibold text-emerald-100">
              {complianceScore}%
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Dealership / shop</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-cyan-400"
              value={state.dealershipName}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  dealershipName: event.target.value,
                }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Advisor</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={state.advisorName}
              onChange={(event) =>
                setState((current) => ({ ...current, advisorName: event.target.value }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Customer</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={state.customer.fullName}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  customer: { ...current.customer, fullName: event.target.value },
                }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">RO number</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={state.repairOrderNumber}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  repairOrderNumber: event.target.value,
                }))
              }
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <label className="space-y-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-200">Year</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={state.vehicle.year}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  vehicle: { ...current.vehicle, year: event.target.value },
                }))
              }
            />
          </label>
          <label className="space-y-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-200">Make</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={state.vehicle.make}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  vehicle: { ...current.vehicle, make: event.target.value },
                }))
              }
            />
          </label>
          <label className="space-y-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-200">Model</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={state.vehicle.model}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  vehicle: { ...current.vehicle, model: event.target.value },
                }))
              }
            />
          </label>
          <label className="space-y-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-200">Mileage</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={state.vehicle.mileage}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  vehicle: { ...current.vehicle, mileage: event.target.value },
                }))
              }
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">Customer concern summary</span>
          <textarea
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
            value={state.concernSummary}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                concernSummary: event.target.value,
              }))
            }
          />
        </label>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Operations</h3>
              <p className="text-sm text-slate-400">
                Customer-facing descriptions and pricing are shown side-by-side.
              </p>
            </div>
          </div>

          {state.lineItems.map((item, index) => {
            const totalsForItem = calculateLineItemTotal(item);

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                      Line item {index + 1}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold text-white">{item.operation}</h4>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                    {formatCurrency(totalsForItem.total)}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-200">Technical notes</p>
                    <p className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-300">
                      {item.technicalNotes}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-200">
                      Customer-friendly explanation
                    </p>
                    <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/5 px-4 py-3 text-sm leading-6 text-cyan-50">
                      {item.customerFriendlyDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Labor hrs</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.laborHours}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Labor rate</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {formatCurrency(item.laborRate)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Parts</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {formatCurrency(item.partsCost)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Tax</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {formatCurrency(totalsForItem.tax)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <h3 className="text-xl font-semibold text-white">Totals</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Labor</span>
              <span>{formatCurrency(totals.labor)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Parts</span>
              <span>{formatCurrency(totals.parts)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>{formatCurrency(totals.tax)}</span>
            </div>
            {state.includeTowingDisclosure ? (
              <div className="flex items-center justify-between">
                <span>Separate towing estimate</span>
                <span>{formatCurrency(state.towingCharge)}</span>
              </div>
            ) : null}
            {state.includeTearDownDisclosure ? (
              <div className="flex items-center justify-between">
                <span>Tear-down estimate</span>
                <span>{formatCurrency(state.tearDownCost)}</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
              <span>Total estimated customer responsibility</span>
              <span>{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <h3 className="text-xl font-semibold text-white">Compliance checklist</h3>
          <div className="mt-4 space-y-3">
            {checks.map((check) => (
              <div
                key={check.label}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{check.label}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      check.passed
                        ? "bg-emerald-500/15 text-emerald-200"
                        : check.severity === "required"
                          ? "bg-rose-500/15 text-rose-200"
                          : "bg-amber-500/15 text-amber-200"
                    }`}
                  >
                    {check.passed ? "Pass" : check.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{check.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <h3 className="text-xl font-semibold text-white">Disclosure language</h3>
          <div className="mt-4 space-y-3">
            {disclosures.map((note) => (
              <div key={note} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <p className="text-sm leading-6 text-slate-300">{note}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
