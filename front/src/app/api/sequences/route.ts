import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongodb";
import { sequencesCollection, type SequenceStep } from "@/lib/coldEmail";

export const dynamic = "force-dynamic";

function serialize(doc: Document) {
  return { ...doc, _id: String(doc._id) };
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

export async function GET() {
  try {
    const col = await sequencesCollection();
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ sequences: docs.map(serialize) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    const now = new Date().toISOString();
    const doc = { name, steps: cleanSteps(body.steps), createdAt: now, updatedAt: now };
    const col = await sequencesCollection();
    const result = await col.insertOne(doc);
    return NextResponse.json({ sequence: { ...doc, _id: String(result.insertedId) } }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
