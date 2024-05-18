import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: [
      "English",
      "Spanish",
      "French",
      "German",
      "Chinese",
      "Japanese",
      "Russian",
      "Other",
    ],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Fantasy",
      "Science Fiction",
      "Mystery",
      "Thriller",
      "Romance",
      "Non-Fiction",
      "Other",
    ],
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
