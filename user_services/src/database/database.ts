import mongoose from "mongoose";
import { db } from "../config/config";
import Logger from "../utils/Logger";

// encodeURIComponent() is for correct URI syntax, not for hiding.
export const mongodb_uri = `mongodb+srv://${db.username}:${encodeURIComponent(
  db.password as string
)}@dbcluster.gqsm2.mongodb.net/${db.name}`;

class DatabaseService {
  private static instance: DatabaseService;
  private readonly uri: string;
  private readonly options: mongoose.ConnectOptions;

  private constructor() {
    this.uri = mongodb_uri;
    this.options = {
      autoIndex: true,
      maxPoolSize: db.maxPoolSize as number,
      minPoolSize: db.minPoolSize as number,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };
    this.initializeEvents();
    this.applyPlugins();
    mongoose.set("strictQuery", true);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, this.options);
      Logger.info("✅ Mongoose connected successfully!");
    } catch (err) {
      Logger.error("❌ Mongoose connection error");
      Logger.error(err);
      process.exit(1);
    }
  }

  public async applyPlugins() {
    const setRunValidators = () => ({ runValidators: true });
    mongoose.plugin((schema: mongoose.Schema) => {
      schema.pre("findOneAndUpdate", setRunValidators);
      schema.pre("updateMany", setRunValidators);
      schema.pre("updateOne", setRunValidators);
    });
  }

  public async initializeEvents() {
    // When successfully connected
    mongoose.connection.on("connected", () => {
      Logger.debug(`🔌 Mongoose connected to: ${this.uri}`);
    });

    // If the connection throws an error
    mongoose.connection.on("error", (err) => {
      Logger.error(`🚨 Mongoose connection error: ${err}`);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", () => {
      Logger.info("⚠️ Mongoose connection disconnected");
    });

    // If the node process ends, close the mongoose connection
    // Gracefull shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      Logger.info("🧨 Mongoose disconnected on app termination");
      process.exit(0);
    });
  }
}

const dbService = DatabaseService.getInstance();
export default dbService;
