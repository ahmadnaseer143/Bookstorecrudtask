const express = require("express");
const router = express.Router();
const Todo = require("../model/todo");

router.get("/gettodos", (req, res, next) => {
  Todo.find({}, (err, result) => {
    if (err) return next(err);
    res.status(200).json(result);
  });
});

router.post("/posttodos", (req, res, next) => {
  console.log(req.body);
  var newTodo = new Todo(req.body);
  newTodo.save((err, result) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(result);
  });
});

module.exports = router;
