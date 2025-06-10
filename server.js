import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import notesRouter from "./routes/notes.route.js";
import usersRouter from "./routes/users.route.js";
import { connectDB } from "./config/db.js";
import cors from 'cors'
import crypto from 'crypto';
//console.log(crypto.randomBytes(64).toString('hex'))

const app = express();

// Load environment variables from config.env file
// dotenv.config({ path: "./config/config.env" });
dotenv.config();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/users", usersRouter);

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB(); // Connect to the database
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Execute the function to start the server
startServer();
