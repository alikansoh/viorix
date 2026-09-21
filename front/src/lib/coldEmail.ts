import { Collection, Document } from "mongodb";
import { getDb } from "./mongodb";

export * from "./coldEmailShared";

export async function prospectsCollection(): Promise<Collection<Document>> {
  const db = await getDb();
  return db.collection("prospects");
}

export async function sequencesCollection(): Promise<Collection<Document>> {
  const db = await getDb();
  return db.collection("sequences");
}
