// Pure constants / types / helpers — safe to import from client components.

export const PROSPECT_STATUSES = [
  "new",
  "contacted",
  "replied",
  "interested",
  "not_interested",
  "bounced",
  "won",
  "lost",
] as const;

export type ProspectStatus = (typeof PROSPECT_STATUSES)[number];

export const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: "New",
  contacted: "Contacted",
  replied: "Replied",
  interested: "Interested",
  not_interested: "Not interested",
  bounced: "Bounced",
  won: "Won",
  lost: "Lost",
};

export const STATUS_COLORS: Record<ProspectStatus, string> = {
  new: "bg-stone-100 text-stone-700",
  contacted: "bg-blue-100 text-blue-700",
  replied: "bg-amber-100 text-amber-800",
  interested: "bg-violet-100 text-violet-700",
  not_interested: "bg-stone-200 text-stone-600",
  bounced: "bg-red-100 text-red-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-stone-200 text-stone-500",
};

export interface SequenceStep {
  label: string;
  dayOffset: number;
  notes?: string;
}

export interface Sequence {
  _id: string;
  name: string;
  steps: SequenceStep[];
  createdAt: string;
  updatedAt: string;
}

export interface ProspectHistoryEntry {
  at: string;
  step: number;
  label: string;
  note?: string;
}

export interface Prospect {
  _id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  website?: string;
  linkedin?: string;
  status: ProspectStatus;
  tags: string[];
  notes?: string;
  sequenceId?: string | null;
  sequenceName?: string | null;
  sequenceStep: number;
  sequenceStartAt?: string | null;
  nextFollowUpAt?: string | null;
  lastContactedAt?: string | null;
  history: ProspectHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export function stepDueDate(startISO: string, step: SequenceStep): string {
  const d = new Date(startISO);
  d.setDate(d.getDate() + (step?.dayOffset ?? 0));
  return d.toISOString();
}

export function fmtDate(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function dueClass(iso?: string | null): string {
  if (!iso) return "text-stone-400";
  const d = new Date(iso).getTime();
  const now = Date.now();
  if (d < now) return "text-red-600 font-medium";
  if (d < now + 1000 * 60 * 60 * 24) return "text-amber-600 font-medium";
  return "text-stone-600";
}
