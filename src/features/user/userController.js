import expressAsyncHandler from "express-async-handler";
import userService from "./userService.js";
import bcrypt from "bcrypt";
import createToken from "../../utils/createToken.js";
import {
  sendError,
  sendFailure,
  sendSuccess,
} from "../../utils/resposeSender.js";

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    sendFailure(res, "Please provide all inputs", 400);
    return;
  }
  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (isPasswordValid) {
      createToken(res, existingUser._id);
      const userResponse = {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      };
      sendSuccess(res, userResponse, 201);
    } else {
      sendFailure(res, "Wrong password", 401);
    }
  } else {
    sendFailure(res, "User dose not exists ", 404);
  }
});
const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  sendSuccess(res, "Logout successfully", 200);
});

const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password, who, isAdmin } = req.body;
  if (!username || !email || !password || !who) {
    res.status(400).json({ message: "Please provide all inputs" });
  }

  const userExists = await userService.getUserByEmail(email);
  if (userExists) {
    sendFailure(res, "User already exists with that email", 409);
  } else {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userService.createUser({
      username,
      email,
      password: hashedPassword,
      who: who,
      isAdmin: isAdmin,
    });
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };
    sendSuccess(res, userResponse, 201);
  }
});
const getAllUser = expressAsyncHandler(async (req, res) => {
  const allUsers = await userService.getAllUser();
  sendSuccess(res, allUsers, 201);
});
const getUserById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    sendError(res, "Provide user id", 400);
    return;
  }

  const user = await userService.getUserById(id);

  if (user) {
    sendSuccess(res, user, 201);
  } else {
    sendFailure(res, "User not found", 404);
  }
});

export default {
  registerUser,
  loginUser,
  logoutUser,
  getAllUser,
  getUserById,
};
