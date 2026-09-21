import { NextRequest, NextResponse } from "next/server";
import { Document, ObjectId } from "mongodb";
import { prospectsCollection, sequencesCollection, stepDueDate } from "@/lib/coldEmail";

export const dynamic = "force-dynamic";

function oid(id: string): ObjectId | null {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

/**
 * Log that the current follow-up step was completed (email sent / touch made).
 * Advances the prospect to the next step in its sequence and recomputes
 * nextFollowUpAt. Body: { note?: string, status?: string }
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const _id = oid(id);
    if (!_id) return NextResponse.json({ error: "Bad id." }, { status: 400 });

    const body = await req.json().catch(() => ({}));
    const col = await prospectsCollection();
    const prospect = await col.findOne({ _id });
    if (!prospect) return NextResponse.json({ error: "Not found." }, { status: 404 });

    const now = new Date().toISOString();
    let steps: { dayOffset: number; label: string }[] = [];
    let start: string | null = prospect.sequenceStartAt || null;

    if (prospect.sequenceId) {
      const seqId = oid(prospect.sequenceId);
      const seq = seqId ? await (await sequencesCollection()).findOne({ _id: seqId }) : null;
      if (seq) steps = (seq.steps || []) as { dayOffset: number; label: string }[];
    }
    if (!start) start = now;

    const currentStepIdx: number = prospect.sequenceStep ?? 0;
    const currentStep = steps[currentStepIdx];
    const nextStepIdx = currentStepIdx + 1;
    const nextStep = steps[nextStepIdx];

    const historyEntry = {
      at: now,
      step: currentStepIdx,
      label: currentStep?.label || "Manual touch",
      note: (body.note || "").trim() || undefined,
    };

    const set: Document = {
      updatedAt: now,
      lastContactedAt: now,
      sequenceStep: nextStep ? nextStepIdx : currentStepIdx + 1,
      nextFollowUpAt: nextStep ? stepDueDate(start, nextStep) : null,
      sequenceStartAt: start,
    };
    if (body.status) set.status = body.status;
    else if (prospect.status === "new") set.status = "contacted";

    await col.updateOne({ _id }, { $set: set, $push: { history: historyEntry as never } });
    const updated = await col.findOne({ _id });
    return NextResponse.json({ prospect: { ...updated, _id: String(updated!._id) } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
