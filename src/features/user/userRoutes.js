import express from "express";
import userController from "./userController.js";
import {
  authenticate,
  authorizeAdmin,
} from "../../middlwares/authMiddleware.js";

const router = express.Router();

//everyone
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

//admin
router.get("/all", authenticate, authorizeAdmin, userController.getAllUser);
router.get("/:id", authenticate, authorizeAdmin, userController.getUserById);
router.post(
  "/register",
  authenticate,
  authorizeAdmin,
  userController.registerUser,
);

export default router;
