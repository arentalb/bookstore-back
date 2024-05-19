import express from "express";
import dotenv from "dotenv";
import usersRoute from "./src/features/user/userRoutes.js";
import bookRoutes from "./src/features/book/bookRoutes.js";
import uploadRoutes from "./src/utils/fileupload.js";

import {connectDB} from "./src/config/db.js";

import cookieParser from "cookie-parser";
import {sendError, sendFailure} from "./src/utils/resposeSender.js";
import cors from "cors";
import path from "path";
import reservationRoutes from "./src/features/reservation/reservationRoutes.js";
// import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;

await connectDB();

const server = express();
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:4200", // Replace with your frontend URL
    credentials: true,
  }),
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/user", usersRoute);
server.use("/api/book", bookRoutes);
server.use("/api/upload", uploadRoutes);
server.use("/api/requests", reservationRoutes);

const __dirname = path.resolve();
server.use("/uploads", express.static(path.join(__dirname + "/uploads")));

server.use((err, req, res, next) => {
  // console.log(err);
  if (err instanceof SyntaxError) {
    sendFailure(res, err.message || "Invalid JSON payload provided", 400);
  } else {
    sendError(res, err.message || "Internal server error", 500);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
