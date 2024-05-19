import express from "express";
import {
  authenticate,
  authorizeAdmin,
} from "../../middlwares/authMiddleware.js";
import reservationController from "./reservationController.js";

const router = express.Router();

// User
// Create a new request (User)
router.post("/new", authenticate, reservationController.createNewRequest);
// Get user requests (User)
router.get("/", authenticate, reservationController.getUserRequests);

// Admin
// Get all requests (Admin)
router.get(
  "/all",
  authenticate,
  authorizeAdmin,
  reservationController.getAllRequests,
);
// Update request status and create a reservation if approved (Admin)
router.put(
  "/update/:id",
  authenticate,
  authorizeAdmin,
  reservationController.updateRequestStatus,
);
router.get(
  "/reservations",
  authenticate,
  authorizeAdmin,
  reservationController.getAllReservations,
);

export default router;
