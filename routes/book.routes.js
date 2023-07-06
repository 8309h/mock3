const express = require("express");
const { BookModel } = require("../model/book.model");

const bookRouter = express.Router();

bookRouter.get("/get-book", async (req, res) => {
    try {
      const { genre } = req.query;
      let filter = {};
      if (genre) {
        filter = { genre };
      }
  
      const books = await BookModel.find(filter).sort({ price: 1 });
      res.send(books);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  

bookRouter.post("/add-book", async (req, res) => {
  try {
    const { title, author, genre, description, price } = req.body;

    const ifBookPresent = await BookModel.findOne({ title, author });
    if (ifBookPresent) {
      return res.status(400).json({ msg: "Book already present" });
    } else {
      const addBook = new BookModel({ title, author, genre, description, price });
      await addBook.save();

      res.send({ msg: "Book added successfully" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Could not add book", error: err.message });
  }
});


bookRouter.delete("/delete-book/:id", async (req, res) => {

    const ID = req.params.id;
    try {
      await BookModel.findByIdAndDelete({ _id: ID });
      res.send({ msg: "Book deleted successfully" });
    } catch (err) {
      res.send({ msg: "Cannot delete the book", error: err.message });
    }
  });
  




module.exports = {
  bookRouter
};
