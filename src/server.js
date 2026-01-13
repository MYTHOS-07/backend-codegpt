import config from "./config/config.js";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoute.js";
import logger from "./middlewares/logger.js";

const app = express();
const PORT = config.port;

//DB Connect
connectDB();

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(logger)

//Routes
app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.PORT,
    status: "OK",
    version: config.version,
  });
});

app.listen(PORT, () => {
  console.log(`Server is up at Port ${PORT}`);
});
