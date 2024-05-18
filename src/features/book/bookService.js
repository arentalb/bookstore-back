import bookModel from "./bookModel.js";

async function getAllBooks() {
  try {
    return await bookModel.find();
  } catch (error) {
    throw new Error("Error fetching all books");
  }
}

async function getBookById(id) {
  try {
    return await bookModel.findOne({ _id: id });
  } catch (error) {
    throw new Error("Error fetching book by is ");
  }
}

async function createBook(book) {
  try {
    return await bookModel.create(book);
  } catch (error) {
    throw new Error("Error creating book");
  }
}

async function updateBook(id, book) {
  try {
    await bookModel.updateOne({ _id: id }, book);

    return await bookModel.findById(id);
  } catch (error) {
    throw new Error("Error updating book");
  }
}

async function deleteBook(id) {
  try {
    return await bookModel.deleteOne({ _id: id });
  } catch (error) {
    throw new Error("Error deleting book");
  }
}

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
