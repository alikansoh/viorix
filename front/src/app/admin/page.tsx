"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Prospect,
  PROSPECT_STATUSES,
  STATUS_LABELS,
  STATUS_COLORS,
  fmtDate,
  dueClass,
} from "@/lib/coldEmailShared";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const [prospects, setProspects] = useState<Prospect[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/prospects")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setProspects(d.prospects);
      })
      .catch((e) => setError(String(e)));
  }, []);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
        <p className="mt-2 text-red-600/80">
          Make sure <code>MONGODB_URI</code> is set in your environment.
        </p>
      </div>
    );
  }

  if (!prospects) return <p className="text-sm text-stone-500">Loading…</p>;

  const now = Date.now();
  const overdue = prospects.filter(
    (p) => p.nextFollowUpAt && new Date(p.nextFollowUpAt).getTime() < now
  );
  const dueSoon = prospects.filter((p) => {
    if (!p.nextFollowUpAt) return false;
    const t = new Date(p.nextFollowUpAt).getTime();
    return t >= now && t < now + 1000 * 60 * 60 * 24 * 7;
  });

  const counts = PROSPECT_STATUSES.map((s) => ({
    status: s,
    n: prospects.filter((p) => p.status === s).length,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Cold email dashboard</h1>
        <p className="mt-1 text-sm text-stone-500">
          {prospects.length} prospect{prospects.length === 1 ? "" : "s"} tracked ·{" "}
          <span className="text-red-600">{overdue.length} overdue</span> ·{" "}
          <span className="text-amber-600">{dueSoon.length} due this week</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {counts.map((c) => (
          <span
            key={c.status}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[c.status]}`}
          >
            {STATUS_LABELS[c.status]} <span className="opacity-60">{c.n}</span>
          </span>
        ))}
      </div>

      <FollowUpList title="Overdue follow-ups" rows={overdue} empty="Nothing overdue. 🎉" />
      <FollowUpList title="Due in the next 7 days" rows={dueSoon} empty="Nothing due soon." />

      <Link
        href="/admin/prospects"
        className="inline-block rounded-md bg-[#134a73] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a5c8f]"
      >
        Manage prospects →
      </Link>
    </div>
  );
}

function FollowUpList({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: Prospect[];
  empty: string;
}) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-stone-500">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-stone-400">{empty}</p>
      ) : (
        <ul className="divide-y divide-stone-200 overflow-hidden rounded-lg border border-stone-200 bg-white">
          {rows.map((p) => (
            <li key={p._id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-sm">
              <Link href={`/admin/prospects?focus=${p._id}`} className="font-medium hover:underline">
                {p.name || p.email || "Untitled"}
              </Link>
              {p.company && <span className="text-stone-500">{p.company}</span>}
              <span className={`ml-auto ${dueClass(p.nextFollowUpAt)}`}>
                {fmtDate(p.nextFollowUpAt)}
              </span>
              {p.sequenceName && (
                <span className="rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-500">
                  {p.sequenceName} · step {(p.sequenceStep ?? 0) + 1}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
