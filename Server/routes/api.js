const express = require("express");
const router = express.Router();
const Book = require("../model/book");

// create,  read, update and delete books

// get all books
router.get("/getbooks", (req, res, next) => {
  Book.find({}, (err, result) => {
    if (err) return next(err);
    res.status(200).json(result);
  });
});

//  create a book in mongoose
router.post("/postbook", (req, res, next) => {
  // console.log(req.body);
  var newBook = new Book(req.body);
  newBook.save((err, result) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(result);
  });
});

// update a book
router.put("/updatebook", (req, res, next) => {
  // using findOneAndUpdate instead of updateone because we want the update document to return
  // we use new:true so that new updated object will be returned
  // console.log(req.body);
  Book.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, result) => {
      if (err) return next(err);
      res.status(200).json(result);
    }
  );
});

//delete a book
router.delete("/deletebook/:_id", (req, res, next) => {
  Book.findOneAndDelete({ _id: req.params._id }, (err, result) => {
    if (err) return next(err);
    res.status(200).json(result);
  });
});

module.exports = router;
