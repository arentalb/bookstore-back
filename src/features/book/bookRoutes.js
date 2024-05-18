import express from "express";
import {
  authenticate,
  authorizeAdmin,
} from "../../middlwares/authMiddleware.js";
import bookController from "./bookController.js";

const router = express.Router();

//everyone
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

//admin
router.post("/", authenticate, authorizeAdmin, bookController.createBook);
router.put("/:id", authenticate, authorizeAdmin, bookController.updateBook);
router.delete("/:id", authenticate, authorizeAdmin, bookController.deleteBook);

export default router;
