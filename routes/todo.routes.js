const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodos);
router.get("/:todoId", todoController.getTodosById);
router.put("/:todoId", todoController.updateTodo);

module.exports = router;
