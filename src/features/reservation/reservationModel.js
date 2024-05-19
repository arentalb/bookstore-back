import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reservedUntil: {
      type: Date,
      default: null, // Only set when the status is "Approved"
    },
  },
  { timestamps: true },
);

const RequestReservationModel = mongoose.model(
  "reservation",
  ReservationSchema,
);

export default RequestReservationModel;
