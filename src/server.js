import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoute.js";
import logger from "./middlewares/logger.js";
import config from "./config/config.js";

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use("/api", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    status: "OK",
    version: config.version,
  });
});

// **DO NOT USE app.listen()**
export default serverless(app);
