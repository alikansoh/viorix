import { NextRequest, NextResponse } from "next/server";
import { Document, ObjectId } from "mongodb";
import { PROSPECT_STATUSES, prospectsCollection, sequencesCollection, stepDueDate } from "@/lib/coldEmail";

export const dynamic = "force-dynamic";

function serialize(doc: Document) {
  return { ...doc, _id: String(doc._id) };
}

function oid(id: string): ObjectId | null {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const _id = oid(id);
  if (!_id) return NextResponse.json({ error: "Bad id." }, { status: 400 });
  const col = await prospectsCollection();
  const doc = await col.findOne({ _id });
  if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ prospect: serialize(doc) });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const _id = oid(id);
    if (!_id) return NextResponse.json({ error: "Bad id." }, { status: 400 });
    const body = await req.json();
    const col = await prospectsCollection();

    const set: Document = { updatedAt: new Date().toISOString() };
    const stringFields = ["name", "email", "company", "role", "website", "linkedin", "notes"];
    for (const f of stringFields) {
      if (typeof body[f] === "string") set[f] = f === "email" ? body[f].trim().toLowerCase() : body[f].trim();
    }
    if (body.status && PROSPECT_STATUSES.includes(body.status)) set.status = body.status;
    if (body.tags !== undefined) {
      set.tags = Array.isArray(body.tags)
        ? body.tags.map((t: string) => String(t).trim()).filter(Boolean)
        : String(body.tags || "")
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean);
    }
    if (body.nextFollowUpAt !== undefined) set.nextFollowUpAt = body.nextFollowUpAt || null;

    // Assign / clear a follow-up sequence.
    if (body.sequenceId !== undefined) {
      if (!body.sequenceId) {
        set.sequenceId = null;
        set.sequenceName = null;
        set.sequenceStep = 0;
        set.sequenceStartAt = null;
      } else {
        const seqId = oid(body.sequenceId);
        const seqCol = await sequencesCollection();
        const seq = seqId ? await seqCol.findOne({ _id: seqId }) : null;
        if (!seq) return NextResponse.json({ error: "Sequence not found." }, { status: 400 });
        const start = body.sequenceStartAt || new Date().toISOString();
        set.sequenceId = String(seq._id);
        set.sequenceName = seq.name;
        set.sequenceStep = 0;
        set.sequenceStartAt = start;
        const steps = (seq.steps || []) as { dayOffset: number; label: string }[];
        set.nextFollowUpAt = steps.length ? stepDueDate(start, steps[0]) : null;
      }
    }

    const res = await col.findOneAndUpdate({ _id }, { $set: set }, { returnDocument: "after" });
    const updated = res && "value" in res ? res.value : res;
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ prospect: serialize(updated as Document) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const _id = oid(id);
  if (!_id) return NextResponse.json({ error: "Bad id." }, { status: 400 });
  const col = await prospectsCollection();
  await col.deleteOne({ _id });
  return NextResponse.json({ ok: true });
}
