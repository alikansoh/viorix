import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongodb";
import { PROSPECT_STATUSES, prospectsCollection, type ProspectStatus } from "@/lib/coldEmail";

export const dynamic = "force-dynamic";

function serialize(doc: Document) {
  return { ...doc, _id: String(doc._id) };
}

export async function GET(req: NextRequest) {
  try {
    const col = await prospectsCollection();
    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q")?.trim();
    const status = searchParams.get("status")?.trim();
    const due = searchParams.get("due"); // "overdue" | "today" | "week"

    const filter: Document = {};
    if (status && PROSPECT_STATUSES.includes(status as ProspectStatus)) {
      filter.status = status;
    }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ];
    }
    if (due) {
      const now = new Date();
      const endOfToday = new Date(now);
      endOfToday.setHours(23, 59, 59, 999);
      if (due === "overdue") {
        filter.nextFollowUpAt = { $ne: null, $lt: now.toISOString() };
      } else if (due === "today") {
        filter.nextFollowUpAt = { $ne: null, $lte: endOfToday.toISOString() };
      } else if (due === "week") {
        const inWeek = new Date(now);
        inWeek.setDate(inWeek.getDate() + 7);
        filter.nextFollowUpAt = { $ne: null, $lte: inWeek.toISOString() };
      }
    }

    const docs = await col.find(filter).sort({ nextFollowUpAt: 1, createdAt: -1 }).limit(500).toArray();
    return NextResponse.json({ prospects: docs.map(serialize) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const name = (body.name || "").trim();
    if (!name && !email) {
      return NextResponse.json({ error: "Name or email is required." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const doc = {
      name,
      email,
      company: (body.company || "").trim(),
      role: (body.role || "").trim(),
      website: (body.website || "").trim(),
      linkedin: (body.linkedin || "").trim(),
      status: (PROSPECT_STATUSES.includes(body.status) ? body.status : "new") as ProspectStatus,
      tags: Array.isArray(body.tags)
        ? body.tags.map((t: string) => String(t).trim()).filter(Boolean)
        : String(body.tags || "")
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean),
      notes: (body.notes || "").trim(),
      sequenceId: null,
      sequenceName: null,
      sequenceStep: 0,
      sequenceStartAt: null,
      nextFollowUpAt: body.nextFollowUpAt || null,
      lastContactedAt: null,
      history: [],
      createdAt: now,
      updatedAt: now,
    };

    const col = await prospectsCollection();
    const result = await col.insertOne(doc);
    return NextResponse.json({ prospect: { ...doc, _id: String(result.insertedId) } }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
