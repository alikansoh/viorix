import { NextRequest, NextResponse } from "next/server";
import { Document, ObjectId } from "mongodb";
import { sequencesCollection, prospectsCollection, type SequenceStep } from "@/lib/coldEmail";

export const dynamic = "force-dynamic";

function oid(id: string): ObjectId | null {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

function cleanSteps(input: unknown): SequenceStep[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((s) => ({
      label: String((s as SequenceStep)?.label || "").trim(),
      dayOffset: Math.max(0, Math.round(Number((s as SequenceStep)?.dayOffset) || 0)),
      notes: String((s as SequenceStep)?.notes || "").trim() || undefined,
    }))
    .filter((s) => s.label)
    .sort((a, b) => a.dayOffset - b.dayOffset);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const _id = oid(id);
    if (!_id) return NextResponse.json({ error: "Bad id." }, { status: 400 });
    const body = await req.json();
    const set: Document = { updatedAt: new Date().toISOString() };
    if (typeof body.name === "string" && body.name.trim()) set.name = body.name.trim();
    if (body.steps !== undefined) set.steps = cleanSteps(body.steps);
    const col = await sequencesCollection();
    const res = await col.findOneAndUpdate({ _id }, { $set: set }, { returnDocument: "after" });
    const updated = res && "value" in res ? res.value : res;
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
    if (set.name) {
      const pcol = await prospectsCollection();
      await pcol.updateMany({ sequenceId: id }, { $set: { sequenceName: set.name } });
    }
    return NextResponse.json({ sequence: { ...(updated as Document), _id: String((updated as Document)._id) } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const _id = oid(id);
  if (!_id) return NextResponse.json({ error: "Bad id." }, { status: 400 });
  const col = await sequencesCollection();
  await col.deleteOne({ _id });
  const pcol = await prospectsCollection();
  await pcol.updateMany(
    { sequenceId: id },
    { $set: { sequenceId: null, sequenceName: null, sequenceStep: 0, sequenceStartAt: null, nextFollowUpAt: null } }
  );
  return NextResponse.json({ ok: true });
}
