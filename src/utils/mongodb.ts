import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export const findAllDocuments = async (collectionName: string) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(collectionName);

    // Fetch data from the MongoDB collection
    const cursor = collection.find();
    const documents = await cursor.toArray();
    return documents;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const updateADocument = async (
  collectionName: string,
  filter: any,
  newData: any
) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(collectionName);
    const updateOperation = { $set: newData };
    const options = { upsert: true };
    await collection.findOneAndUpdate(filter, updateOperation, options);
  } catch (error) {
    console.error("Error storing fetched RSS:", error);
    return null;
  }
};
