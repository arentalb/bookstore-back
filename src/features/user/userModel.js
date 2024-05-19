import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    who: {
      type: String,
      enum: ["student", "teacher", "guest", "employee"],
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
