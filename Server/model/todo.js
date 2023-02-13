var mongoose = require("mongoose");

//Define a schema
var todoSchema = mongoose.Schema({
  madeBy: {
    type: String,
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = Todo = mongoose.model("todo", todoSchema);
