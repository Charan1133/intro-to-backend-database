import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

// mount user routes
app.use("/api/v1/users", userRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port: ${process.env.PORT || 4000}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed!!", error);
  }
};

startServer();
