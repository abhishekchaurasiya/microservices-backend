import { Router } from "express";
import proxy from "express-http-proxy";
import "dotenv/config";

const proxyRouter = Router();

const user_service_url = process.env.USER_SERVICE_URL as string;
const admin_service_url = process.env.ADMIN_SERVICE_URL as string;

proxyRouter.use(
  "/api/v1/user",
  proxy(user_service_url, {
    proxyReqPathResolver: (req) => `/api/v1/user${req.url}`,
  })
);

proxyRouter.use(
  "/api/v1/admin",
  proxy(admin_service_url, {
    proxyReqPathResolver: (req) => `/api/v1/admin${req.url}`,
  })
);

export default proxyRouter;
