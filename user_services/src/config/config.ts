import "dotenv/config";

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const adminUrl = process.env.ADMIN_URL;

export const mongodb_uri_string = process.env.MONGO_DB_URI;

export const logDirectory = process.env.LOG_DIR || "LOG_FILES";
export const corsUrl = process.env.CLIENT_URL as string;

export const db = {
  name: process.env.DATABASE_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD,
  minPoolSize: parseInt(process.env.MIN_POOLSIZE ?? "5"),
  maxPoolSize: parseInt(process.env.MAX_POOLSIZE ?? "10"),
};
