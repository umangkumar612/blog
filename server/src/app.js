import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import postRoutes from "./routes/post.routes.js";
import socialRoutes from "./routes/social.routes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/user.routes.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"].filter(Boolean),
    credentials: true
  })
);
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(apiLimiter);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Blogify Social API is running",
    health: "/health",
    docs: {
      auth: "/api/auth",
      users: "/api/users",
      posts: "/api/posts",
      social: "/api/social",
      upload: "/api/upload"
    }
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "blogify-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", commentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
