import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { corsUrl } from "./config/config";
import { notFoundError } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalError";
import adminRouter from "./routes/admin.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

const app = express();

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: [corsUrl as string],
    credentials: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Built in parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable response compression to reduce payload size and improve performance
app.use(compression({ thresholdd: 1024 }));

// Misc middleware
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/v1/admin", adminRouter);

app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Api is live with admin" });
});

// app.use(notFoundError);

app.use(globalErrorHandler);

export default app;
