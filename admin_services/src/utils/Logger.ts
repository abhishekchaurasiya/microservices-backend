import path from "path";
import fs from "fs";
import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { environment, logDirectory } from "../config/config";

// File based routing
let dir = logDirectory ?? "logs";
if (!dir) dir = path.resolve("logs");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = environment === "development" ? "debug" : "warn";

// Optional: emoji indicators per log level
const levelEmojis: Record<string, string> = {
  error: "❌",
  warn: "⚠️",
  info: "ℹ️",
  http: "🌐",
  verbose: "🔍",
  debug: "🐛",
  silly: "🎉",
};

// Custom log format with colors and metadata
const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }),
  format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
  format.colorize({ all: true }),
  format.printf(({ timestamp, level, message, metadata, stack }) => {
    const emoji = levelEmojis[level] || "";
    let meta =
      metadata && Object.keys(metadata).length > 0
        ? `\n📦 Metadata: ${JSON.stringify(metadata, null, 2)}`
        : "";

    let stackMsg = stack ? `\n🧵 Stack:\n${stack}` : "";
    return `🔹 [${timestamp}] ${emoji} ${level}: ${message}${meta}${stackMsg}`;
  })
);

const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  filename: `${dir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  handleExceptions: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: customFormat,
});

export default createLogger({
  level: logLevel,
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console({
      level: logLevel,
      format: customFormat,
    }),
    dailyRotateFile,
    new transports.File({
      filename: path.join(dir, "error.log"),
      level: "error",
      format: customFormat,
    }),
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false,
});
