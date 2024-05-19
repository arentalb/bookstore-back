// Create a new request (User)
import ReservationModel from "./reservationModel.js";

async function createNewRequest(userId, bookId) {
  try {
    // Check if the book is already reserved
    // const existingReservation = await ReservationModel.findOne({
    //   book: bookId,
    //   status: "Approved",
    // });
    // if (existingReservation) {
    //   throw new Error("Book is already reserved");
    // }

    const request = new ReservationModel({
      book: bookId,
      user: userId,
    });

    await request.save();
    return request;
  } catch (error) {
    throw new Error(`Error creating new request: ${error.message}`);
  }
}

// Get user requests (User)
async function getUserRequests(userId) {
  try {
    const reservations = await ReservationModel.find({ user: userId }).populate(
      "book",
    );
    // Transform the data to match TRequest interface
    const requests = reservations.map((reservation) => ({
      _id: reservation._id,
      book: {
        _id: reservation.book._id,
        title: reservation.book.title,
      },
      status: reservation.status,
      createdAt: reservation.createdAt,
      reservedUntil: reservation.reservedUntil,
    }));

    return requests;
  } catch (error) {
    throw new Error(`Error getting user requests: ${error.message}`);
  }
}

// Get all requests (Admin)
async function getAllRequests() {
  try {
    const reservations = await ReservationModel.find().populate("book user");

    // Transform the data to match TRequest interface
    const requests = reservations.map((reservation) => ({
      _id: reservation._id,
      book: {
        title: reservation.book.title,
      },
      user: {
        username: reservation.user.username,
        email: reservation.user.email,
      },
      status: reservation.status,
      createdAt: reservation.createdAt,
      reservedUntil: reservation.reservedUntil,
    }));

    return requests;
  } catch (error) {
    throw new Error(`Error getting all requests: ${error.message}`);
  }
}

// Update request status (Admin)
async function updateRequestStatus(requestId, status, reservedUntil) {
  try {
    const request = await ReservationModel.findById(requestId);
    if (!request) {
      throw new Error("Request not found");
    }

    if (status === "Approved") {
      request.reservedUntil = reservedUntil;
    } else {
      request.reservedUntil = null;
    }

    request.status = status;
    await request.save();
    return request;
  } catch (error) {
    throw new Error(`Error updating request status: ${error.message}`);
  }
}

// Get all reservations (Admin)
async function getAllReservations() {
  try {
    const reservations = await ReservationModel.find({
      status: "Approved",
    }).populate("book user");

    // Transform the data to match TRequest interface
    const requests = reservations.map((reservation) => ({
      _id: reservation._id,
      book: {
        title: reservation.book.title,
      },
      user: {
        username: reservation.user.username,
        email: reservation.user.email,
      },
      status: reservation.status,
      updatedAt: reservation.updatedAt,
      reservedUntil: reservation.reservedUntil,
    }));

    return requests;
  } catch (error) {
    throw new Error(`Error getting all reservations: ${error.message}`);
  }
}

export default {
  createNewRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus,
  getAllReservations,
};
