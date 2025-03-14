import express from "express";
import { config } from "./config/env.js";
import { connectDB } from  "./config/db.js";
import indexRoutes from "./routes/indexRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const { PORT } = config;

app.use(express.json());

app.use("/", indexRoutes);
app.use("/google", authRoutes);

const start = async() => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log("listening on port 2233"))
    } catch (err) {
        console.error("Failed to start server:", err);
    }
}

start();
