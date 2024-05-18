import expressAsyncHandler from "express-async-handler";
import { sendFailure, sendSuccess } from "../../utils/resposeSender.js";
import bookService from "./bookService.js";

const getAllBooks = expressAsyncHandler(async (req, res) => {
  const bookResponse = await bookService.getAllBooks();
  sendSuccess(res, bookResponse, 201);
});
const getBookById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  if (id) {
    const book = await bookService.getBookById(id);
    if (!book) {
      sendFailure(res, "Could not find this book ");
    }
    sendSuccess(res, book, 201);
  } else {
    sendFailure(res, "Could not find this book ");
  }
});

const createBook = expressAsyncHandler(async (req, res) => {
  const book = req.body;
  if (!book) {
    sendFailure(res, "Please provide book details ", 400);
    return;
  }

  const bookResponse = await bookService.createBook(book);
  sendSuccess(res, bookResponse, 201);
});
const updateBook = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const book = req.body;

  if (id && book) {
    const bookResponse = await bookService.updateBook(id, book);
    sendSuccess(res, bookResponse, 201);
  } else {
    sendFailure(res, "Please provide book details and id to update ", 400);
  }
});
const deleteBook = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  if (id) {
    const bookResponse = await bookService.deleteBook(id);
    sendSuccess(res, bookResponse, 201);
  } else {
    sendFailure(res, "Please provide book id to be deleted ", 400);
  }
});

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
