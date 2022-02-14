const TodoModel = require("../model/todo.model");

exports.deleteTodo = async (req, res, next) => {
  try {
    const todoIdDelete = await TodoModel.findByIdAndDelete(req.params.todoId);
    if (todoIdDelete) {
      res.status(200).json(todoIdDelete);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todoIdUpdate = await TodoModel.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (todoIdUpdate) {
      res.status(200).json(todoIdUpdate);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const createTodoModel = await TodoModel.create(req.body);
    res.status(201).json(createTodoModel);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    next(error);
  }
};

exports.getTodosById = async (req, res, next) => {
  try {
    const todoById = await TodoModel.findById(req.params.todoId);
    if (todoById) {
      res.status(200).json(todoById);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
