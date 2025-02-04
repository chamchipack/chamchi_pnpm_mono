import {
  MongoClient,
  Db,
  Collection,
  ServerApiVersion,
  Document,
} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class MongoService {
  private client: MongoClient;
  private dbName: string;

  constructor() {
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`;

    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.dbName = process.env.DATABASE || '';
  }

  // Connect to the database
  async connect(): Promise<Db> {
    // if (!this.client.topology || !this.client.topology.isConnected()) {
    //   await this.client.connect();
    // }
    return this.client.db(this.dbName);
  }

  // Get a collection
  async getCollection<T extends Document>(
    collectionName: string,
  ): Promise<Collection<T>> {
    const db = await this.connect();
    return db.collection<T>(collectionName);
  }

  // Disconnect from the database
  async close(): Promise<void> {
    await this.client.close();
  }
}

export default new MongoService();
