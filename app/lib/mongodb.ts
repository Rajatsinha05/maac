import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __maacMongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var __maacMemoryUri: string | undefined;
}

async function resolveUri(): Promise<string> {
  const configured = process.env.MONGODB_URI?.trim();
  if (!configured) {
    throw new Error(
      "Missing MONGODB_URI. Add it to .env.local (see .env.example).",
    );
  }

  if (configured !== "memory") {
    return configured;
  }

  if (global.__maacMemoryUri) {
    return global.__maacMemoryUri;
  }

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const memory = await MongoMemoryServer.create();
  global.__maacMemoryUri = memory.getUri();
  return global.__maacMemoryUri;
}

function getClientPromise(): Promise<MongoClient> {
  if (!global.__maacMongoClientPromise) {
    global.__maacMongoClientPromise = (async () => {
      const uri = await resolveUri();
      const client = new MongoClient(uri);
      return client.connect();
    })();
  }
  return global.__maacMongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "maac");
}
