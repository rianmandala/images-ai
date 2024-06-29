import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/user", userRoutes);

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL, () => {
      app.listen(process.env.PORT, () => {
        console.log(`server has running at port ${process.env.PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
