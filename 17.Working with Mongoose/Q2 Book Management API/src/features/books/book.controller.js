import mongoose from "mongoose";
import BookRepository from "./book.repository.js";

export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  //------change code in below functions only--------

  // creation of book
  createBook = async (req, res) => {
    try {
      const { title, author, genre, copies, availableCopies } = req.body;
      const bookData = {
        title,
        author,
        genre,
        copies,
        availableCopies,
      };
      const book = await this.bookRepository.createBook(bookData);
      res.status(201).json(book);
    } catch (err) {
      console.log(err);
    }
  };

  // filtering of book by id
  getOne = async (req, res) => {
    const bookId = req.params.bookId;
    try {
      const book = await this.bookRepository.getOne(bookId);
      if (!book) {
        res.status(404).json({ message: "Book not found." });
      } else {
        res.status(200).json(book);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to find book" });
    }
  };
}
