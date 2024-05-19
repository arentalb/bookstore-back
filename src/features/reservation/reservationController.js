import expressAsyncHandler from "express-async-handler";
import reservationService from "./reservationService.js";
import { sendFailure, sendSuccess } from "../../utils/resposeSender.js";

const createNewRequest = expressAsyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user._id;

  const response = await reservationService.createNewRequest(userId, bookId);
  sendSuccess(res, response, 201);
});

const getUserRequests = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const response = await reservationService.getUserRequests(userId);
  sendSuccess(res, response, 200);
});

const getAllRequests = expressAsyncHandler(async (req, res) => {
  const response = await reservationService.getAllRequests();
  sendSuccess(res, response, 200);
});

const updateRequestStatus = expressAsyncHandler(async (req, res) => {
  const { status, reservedUntil } = req.body;
  const requestId = req.params.id;

  if (!requestId || !status) {
    sendFailure(res, "Please provide request details to update.", 400);
    return;
  }

  if (status === "Approved" && !reservedUntil) {
    sendFailure(res, "Please provide a reservation deadline.", 400);
    return;
  }

  const response = await reservationService.updateRequestStatus(
    requestId,
    status,
    reservedUntil,
  );
  sendSuccess(res, response, 200);
});
const getAllReservations = expressAsyncHandler(async (req, res) => {
  const response = await reservationService.getAllReservations();
  sendSuccess(res, response, 200);
});

export default {
  createNewRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus,
  getAllReservations,
};
