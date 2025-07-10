import express from "express";
import proxyRouter from "./routes/proxy.route";

const app = express();

app.use(proxyRouter);

export default app;
