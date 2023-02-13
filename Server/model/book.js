var mongoose = require("mongoose");

//Define a schema
// title (string), author (string), no_of_pages (integer), and published_at(date)
var bookSchema = mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  no_of_pages: {
    type: Number,
  },
  published_at: {
    type: Date,
  },
});

module.exports = Book = mongoose.model("book", bookSchema);
