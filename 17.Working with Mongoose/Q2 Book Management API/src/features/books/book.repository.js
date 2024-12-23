import mongoose from "mongoose";
import { bookSchema } from "./book.schema.js";

// create model from schema
const bookModel = mongoose.model("Book", bookSchema);

export default class BookRepository {
  // -----Change code in below functions only-----

  //book creation
  async createBook(bookData) {
    try {
      const newBook = new bookModel(bookData);
      const result = await newBook.save();
      return result;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  //filtering the book by id
  async getOne(id) {
    try {
      return await bookModel.findById(id);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }
}
