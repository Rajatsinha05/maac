import type { ObjectId } from "mongodb";
import { getDb } from "@/app/lib/mongodb";

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  _id: ObjectId;
  name: string;
  phone: string;
  program: string;
  source: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type LeadInput = {
  name: string;
  phone: string;
  program: string;
  source?: string;
};

export type LeadListItem = {
  id: string;
  name: string;
  phone: string;
  program: string;
  source: string;
  status: LeadStatus;
  createdAt: string;
};

function serialize(lead: Lead): LeadListItem {
  return {
    id: lead._id.toString(),
    name: lead.name,
    phone: lead.phone,
    program: lead.program,
    source: lead.source,
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
  };
}

export async function createLead(input: LeadInput) {
  const db = await getDb();
  const now = new Date();
  const doc = {
    name: input.name.trim(),
    phone: input.phone.replace(/\D/g, ""),
    program: input.program.trim(),
    source: (input.source || "website").trim() || "website",
    status: "new" as LeadStatus,
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection("leads").insertOne(doc);
  return { id: result.insertedId.toString() };
}

export async function listLeads(limit = 200): Promise<LeadListItem[]> {
  const db = await getDb();
  const rows = await db
    .collection<Lead>("leads")
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return rows.map(serialize);
}

export async function getLeadStats() {
  const db = await getDb();
  const collection = db.collection("leads");
  const [total, fresh, contacted, closed] = await Promise.all([
    collection.countDocuments({}),
    collection.countDocuments({ status: "new" }),
    collection.countDocuments({ status: "contacted" }),
    collection.countDocuments({ status: "closed" }),
  ]);
  return { total, fresh, contacted, closed };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const db = await getDb();
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return false;
  const result = await db.collection("leads").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } },
  );
  return result.matchedCount > 0;
}
