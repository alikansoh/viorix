"use client";

import { useEffect, useState } from "react";
import { Sequence, SequenceStep } from "@/lib/coldEmailShared";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2670a8] focus:ring-2 focus:ring-[#2670a8]/25";

const blankStep = (): SequenceStep => ({ label: "", dayOffset: 0, notes: "" });

export default function SequencesPage() {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const d = await fetch("/api/sequences").then((r) => r.json());
      if (d.error) throw new Error(d.error);
      setSequences(d.sequences || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (seq: Sequence) => {
    const isNew = seq._id === "new";
    const res = await fetch(isNew ? "/api/sequences" : `/api/sequences/${seq._id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: seq.name, steps: seq.steps }),
    });
    const d = await res.json();
    if (!res.ok) {
      alert(d.error || "Failed to save.");
      return;
    }
    await load();
  };

  const remove = async (id: string) => {
    if (id === "new") {
      setSequences((prev) => prev.filter((s) => s._id !== "new"));
      return;
    }
    if (!confirm("Delete this sequence? Prospects using it will be unassigned.")) return;
    await fetch(`/api/sequences/${id}`, { method: "DELETE" });
    await load();
  };

  const addDraft = () =>
    setSequences((prev) => [
      {
        _id: "new",
        name: "",
        steps: [
          { label: "Initial email", dayOffset: 0 },
          { label: "Follow-up 1", dayOffset: 3 },
          { label: "Follow-up 2", dayOffset: 7 },
        ],
        createdAt: "",
        updatedAt: "",
      },
      ...prev,
    ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Follow-up sequences</h1>
          <p className="mt-1 text-sm text-stone-500">
            Define step cadences (day offsets from first contact). Assign a sequence to a prospect
            and each logged touch advances it.
          </p>
        </div>
        <button
          onClick={addDraft}
          className="rounded-md bg-[#134a73] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a5c8f]"
        >
          + New sequence
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error} — check that <code>MONGODB_URI</code> is set.
        </div>
      )}

      {loading && <p className="text-sm text-stone-500">Loading…</p>}
      {!loading && sequences.length === 0 && (
        <p className="text-sm text-stone-400">No sequences yet.</p>
      )}

      <div className="space-y-4">
        {sequences.map((seq) => (
          <SequenceCard key={seq._id} seq={seq} onSave={save} onRemove={remove} />
        ))}
      </div>
    </div>
  );
}

function SequenceCard({
  seq,
  onSave,
  onRemove,
}: {
  seq: Sequence;
  onSave: (s: Sequence) => void;
  onRemove: (id: string) => void;
}) {
  const [draft, setDraft] = useState<Sequence>(seq);
  const dirty = JSON.stringify(draft) !== JSON.stringify(seq);

  const setStep = (i: number, patch: Partial<SequenceStep>) =>
    setDraft((d) => ({
      ...d,
      steps: d.steps.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <input
          className={`${inputCls} max-w-xs font-medium`}
          placeholder="Sequence name"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        />
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => onSave(draft)}
            disabled={!dirty || !draft.name.trim()}
            className="rounded-md bg-[#134a73] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a5c8f] disabled:opacity-40"
          >
            {seq._id === "new" ? "Create" : "Save"}
          </button>
          <button
            onClick={() => onRemove(draft._id)}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            {seq._id === "new" ? "Discard" : "Delete"}
          </button>
        </div>
      </div>

      <table className="mt-3 w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-stone-500">
            <th className="py-1.5 font-medium">Step</th>
            <th className="w-28 py-1.5 font-medium">Day offset</th>
            <th className="py-1.5 font-medium">Notes</th>
            <th className="w-8" />
          </tr>
        </thead>
        <tbody>
          {draft.steps.map((s, i) => (
            <tr key={i}>
              <td className="py-1 pr-2">
                <input
                  className={inputCls}
                  value={s.label}
                  onChange={(e) => setStep(i, { label: e.target.value })}
                />
              </td>
              <td className="py-1 pr-2">
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  value={s.dayOffset}
                  onChange={(e) => setStep(i, { dayOffset: Number(e.target.value) })}
                />
              </td>
              <td className="py-1 pr-2">
                <input
                  className={inputCls}
                  value={s.notes || ""}
                  onChange={(e) => setStep(i, { notes: e.target.value })}
                />
              </td>
              <td className="py-1 text-center">
                <button
                  onClick={() =>
                    setDraft((d) => ({ ...d, steps: d.steps.filter((_, idx) => idx !== i) }))
                  }
                  className="text-stone-400 hover:text-red-600"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setDraft((d) => ({ ...d, steps: [...d.steps, blankStep()] }))}
        className="mt-2 rounded-md border border-dashed border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 hover:border-[#2670a8]"
      >
        + Add step
      </button>
    </div>
  );
}
