"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Prospect,
  Sequence,
  PROSPECT_STATUSES,
  ProspectStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  fmtDate,
  dueClass,
} from "@/lib/coldEmailShared";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2670a8] focus:ring-2 focus:ring-[#2670a8]/25";

export default function ProspectsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-stone-500">Loading…</p>}>
      <ProspectsInner />
    </Suspense>
  );
}

function ProspectsInner() {
  const params = useSearchParams();
  const focusId = params.get("focus");

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [due, setDue] = useState("");
  const [expanded, setExpanded] = useState<string | null>(focusId);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const usp = new URLSearchParams();
      if (q) usp.set("q", q);
      if (status) usp.set("status", status);
      if (due) usp.set("due", due);
      const [pr, sr] = await Promise.all([
        fetch(`/api/prospects?${usp.toString()}`).then((r) => r.json()),
        fetch(`/api/sequences`).then((r) => r.json()),
      ]);
      if (pr.error) throw new Error(pr.error);
      setProspects(pr.prospects || []);
      setSequences(sr.sequences || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [q, status, due]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    const res = await fetch(`/api/prospects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.prospect) setProspects((prev) => prev.map((p) => (p._id === id ? data.prospect : p)));
  };

  const logStep = async (id: string, note: string, newStatus?: string) => {
    const res = await fetch(`/api/prospects/${id}/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note, status: newStatus }),
    });
    const data = await res.json();
    if (data.prospect) setProspects((prev) => prev.map((p) => (p._id === id ? data.prospect : p)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this prospect?")) return;
    await fetch(`/api/prospects/${id}`, { method: "DELETE" });
    setProspects((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl font-semibold">Prospects</h1>
        <AddProspect onAdded={(p) => setProspects((prev) => [p, ...prev])} />
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Search name, email, company, tag…"
          className={`${inputCls} max-w-xs`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className={`${inputCls} max-w-[180px]`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {PROSPECT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select className={`${inputCls} max-w-[180px]`} value={due} onChange={(e) => setDue(e.target.value)}>
          <option value="">Any follow-up date</option>
          <option value="overdue">Overdue</option>
          <option value="today">Due today</option>
          <option value="week">Due this week</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error} — check that <code>MONGODB_URI</code> is set.
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-left text-[11px] uppercase tracking-wider text-stone-500">
              <th className="px-4 py-2.5 font-medium">Prospect</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Sequence</th>
              <th className="px-4 py-2.5 font-medium">Next follow-up</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {loading && prospects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && prospects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">
                  No prospects yet.
                </td>
              </tr>
            )}
            {prospects.map((p) => (
              <Row
                key={p._id}
                p={p}
                sequences={sequences}
                open={expanded === p._id}
                onToggle={() => setExpanded((cur) => (cur === p._id ? null : p._id))}
                onPatch={patch}
                onLog={logStep}
                onRemove={remove}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({
  p,
  sequences,
  open,
  onToggle,
  onPatch,
  onLog,
  onRemove,
}: {
  p: Prospect;
  sequences: Sequence[];
  open: boolean;
  onToggle: () => void;
  onPatch: (id: string, body: Record<string, unknown>) => void;
  onLog: (id: string, note: string, status?: string) => void;
  onRemove: (id: string) => void;
}) {
  const [note, setNote] = useState("");
  const [tags, setTags] = useState(p.tags.join(", "));
  const [notes, setNotes] = useState(p.notes || "");

  return (
    <>
      <tr className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60">
        <td className="px-4 py-3">
          <button onClick={onToggle} className="text-left">
            <span className="font-medium">{p.name || p.email || "Untitled"}</span>
            <span className="block text-xs text-stone-500">
              {[p.company, p.email].filter(Boolean).join(" · ")}
            </span>
          </button>
        </td>
        <td className="px-4 py-3">
          <select
            value={p.status}
            onChange={(e) => onPatch(p._id, { status: e.target.value })}
            className={`rounded-full border-0 px-2 py-1 text-xs font-medium ${STATUS_COLORS[p.status as ProspectStatus]}`}
          >
            {PROSPECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3 text-stone-600">
          {p.sequenceName ? (
            <span>
              {p.sequenceName}
              <span className="ml-1 text-xs text-stone-400">step {(p.sequenceStep ?? 0) + 1}</span>
            </span>
          ) : (
            <span className="text-stone-400">—</span>
          )}
        </td>
        <td className={`px-4 py-3 ${dueClass(p.nextFollowUpAt)}`}>{fmtDate(p.nextFollowUpAt)}</td>
        <td className="px-4 py-3 text-right">
          <button onClick={onToggle} className="text-xs font-medium text-[#2670a8] hover:underline">
            {open ? "Close" : "Open"}
          </button>
        </td>
      </tr>

      {open && (
        <tr className="bg-stone-50">
          <td colSpan={5} className="px-4 py-4">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Left: details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <LabeledInput label="Name" defaultValue={p.name} onBlur={(v) => onPatch(p._id, { name: v })} />
                  <LabeledInput label="Email" defaultValue={p.email} onBlur={(v) => onPatch(p._id, { email: v })} />
                  <LabeledInput label="Company" defaultValue={p.company || ""} onBlur={(v) => onPatch(p._id, { company: v })} />
                  <LabeledInput label="Role" defaultValue={p.role || ""} onBlur={(v) => onPatch(p._id, { role: v })} />
                  <LabeledInput label="Website" defaultValue={p.website || ""} onBlur={(v) => onPatch(p._id, { website: v })} />
                  <LabeledInput label="LinkedIn" defaultValue={p.linkedin || ""} onBlur={(v) => onPatch(p._id, { linkedin: v })} />
                </div>

                <div>
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    Tags (comma separated)
                  </span>
                  <input
                    className={inputCls}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    onBlur={() => onPatch(p._id, { tags })}
                  />
                </div>

                <div>
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    Notes
                  </span>
                  <textarea
                    rows={3}
                    className={`${inputCls} resize-none`}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={() => onPatch(p._id, { notes })}
                  />
                </div>

                <button
                  onClick={() => onRemove(p._id)}
                  className="text-xs font-medium text-red-500 hover:text-red-700 hover:underline"
                >
                  Delete prospect
                </button>
              </div>

              {/* Right: sequence + follow-up */}
              <div className="space-y-3">
                <div>
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    Follow-up sequence
                  </span>
                  <select
                    className={inputCls}
                    value={p.sequenceId || ""}
                    onChange={(e) => onPatch(p._id, { sequenceId: e.target.value || null })}
                  >
                    <option value="">No sequence</option>
                    {sequences.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.steps.length} steps)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    Next follow-up date
                  </span>
                  <input
                    type="date"
                    className={inputCls}
                    value={p.nextFollowUpAt ? p.nextFollowUpAt.slice(0, 10) : ""}
                    onChange={(e) =>
                      onPatch(p._id, {
                        nextFollowUpAt: e.target.value ? new Date(e.target.value).toISOString() : null,
                      })
                    }
                  />
                </div>

                <div className="rounded-md border border-stone-200 bg-white p-3">
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    Log a touch (email sent / call made)
                  </span>
                  <textarea
                    rows={2}
                    placeholder="What did you send / say?"
                    className={`${inputCls} resize-none`}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      onLog(p._id, note);
                      setNote("");
                    }}
                    className="mt-2 rounded-md bg-[#134a73] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a5c8f]"
                  >
                    Log & advance sequence
                  </button>
                  <p className="mt-1 text-[11px] text-stone-400">
                    Advances to the next step and sets the next follow-up date automatically.
                  </p>
                </div>

                {p.history.length > 0 && (
                  <div>
                    <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                      History
                    </span>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {[...p.history].reverse().map((h, i) => (
                        <li key={i} className="rounded bg-white px-2 py-1.5 ring-1 ring-stone-200">
                          <span className="font-medium">{fmtDate(h.at)}</span> · {h.label}
                          {h.note && <span className="block text-stone-500">{h.note}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function LabeledInput({
  label,
  defaultValue,
  onBlur,
}: {
  label: string;
  defaultValue: string;
  onBlur: (v: string) => void;
}) {
  const [v, setV] = useState(defaultValue);
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
        {label}
      </span>
      <input className={inputCls} value={v} onChange={(e) => setV(e.target.value)} onBlur={() => onBlur(v)} />
    </label>
  );
}

function AddProspect({ onAdded }: { onAdded: (p: Prospect) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", tags: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed.");
      onAdded(data.prospect);
      setForm({ name: "", email: "", company: "", tags: "" });
      setOpen(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-[#134a73] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a5c8f]"
      >
        + Add prospect
      </button>
    );
  }

  return (
    <div className="w-full rounded-lg border border-stone-200 bg-white p-4">
      <div className="grid gap-2 sm:grid-cols-4">
        <input
          placeholder="Name"
          className={inputCls}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className={inputCls}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Company"
          className={inputCls}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <input
          placeholder="Tags (comma sep)"
          className={inputCls}
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
      </div>
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
      <div className="mt-3 flex gap-2">
        <button
          onClick={submit}
          disabled={busy}
          className="rounded-md bg-[#134a73] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#1a5c8f] disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save"}
        </button>
        <button onClick={() => setOpen(false)} className="rounded-md px-3 py-1.5 text-sm text-stone-500 hover:bg-stone-100">
          Cancel
        </button>
      </div>
    </div>
  );
}
