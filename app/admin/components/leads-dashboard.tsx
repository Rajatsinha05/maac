"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { LeadListItem, LeadStatus } from "@/app/lib/leads";

type Stats = {
  total: number;
  fresh: number;
  contacted: number;
  closed: number;
};

const statusStyles: Record<LeadStatus, string> = {
  new: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  contacted: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  closed: "border-zinc-600 bg-zinc-800 text-zinc-300",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function LeadsDashboard({
  username,
  initialLeads,
  stats,
}: {
  username: string;
  initialLeads: LeadListItem[];
  stats: Stats;
}) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function changeStatus(id: string, status: LeadStatus) {
    setError("");
    const previous = leads;
    setLeads((rows) =>
      rows.map((row) => (row.id === id ? { ...row, status } : row)),
    );
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        setLeads(previous);
        const data = (await res.json()) as { error?: string };
        setError(data.error || "Could not update status.");
        return;
      }
      startTransition(() => router.refresh());
    } catch {
      setLeads(previous);
      setError("Network error while updating status.");
    }
  }

  return (
    <main className="min-h-full flex-1 bg-[#07060a] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-400">
              MAAC admin
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-white">
              Leads dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Signed in as <span className="text-zinc-200">{username}</span>
            </p>
          </div>
          <button
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:border-amber-400/40"
            onClick={logout}
            type="button"
          >
            Log out
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Total", stats.total],
            ["New", stats.fresh],
            ["Contacted", stats.contacted],
            ["Closed", stats.closed],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className="rounded-2xl border border-white/8 bg-zinc-950/80 p-4"
            >
              <p className="text-xs uppercase tracking-[0.06em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        {error ? (
          <p className="mb-3 text-sm font-semibold text-red-400">{error}</p>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-white/8 bg-zinc-950/80">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/8 bg-zinc-900/80 text-xs uppercase tracking-[0.06em] text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Program</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-10 text-center text-zinc-500"
                      colSpan={6}
                    >
                      No leads yet. Submissions from the website will show up
                      here.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        {lead.name}
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        <a
                          className="hover:text-amber-300"
                          href={`tel:+91${lead.phone}`}
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="max-w-[14rem] px-4 py-3 text-zinc-300">
                        {lead.program}
                      </td>
                      <td className="px-4 py-3 capitalize text-zinc-400">
                        {lead.source}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold outline-none ${statusStyles[lead.status]}`}
                          disabled={pending}
                          value={lead.status}
                          onChange={(e) =>
                            changeStatus(
                              lead.id,
                              e.target.value as LeadStatus,
                            )
                          }
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-400">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
