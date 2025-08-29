import "dotenv/config";
import express from "express";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { swaggerSpec } from "./docs/swagger.js";
import usersRouter from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const isDev = process.env.NODE_ENV !== "production";
const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
      .map((o) => o.trim())
      .filter(Boolean)
  : undefined;
const allowedOrigins = isDev
  ? [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      "http://localhost:8080",
    ]
  : envAllowedOrigins ?? [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      // In production, if no explicit allowed origins are set, reflect the request origin
      if (!isDev && allowedOrigins.length === 0) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("Blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api", (_req, res) => {
  res.send("This is the v1 API");
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/cors-test", (_req, res) => {
  res.json({
    message: "CORS is working!",
    origin: _req.headers.origin,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/users", usersRouter);

const clientDistPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.get(/^(?!\/api).*$/, (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
