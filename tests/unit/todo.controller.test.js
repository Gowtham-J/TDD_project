const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

jest.mock("../../model/todo.model");

let req, res, next;
const todoId = "6206653f609ad8bbb34b18fc";
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TodoController.deleteTodo", () => {
  it("should have a deleteTodo function", () => {
    expect(typeof TodoController.deleteTodo).toBe("function");
  });
  it("should delete with TodoModel.findByIdAndDelete", async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    await TodoController.deleteTodo(req, res, next);
    expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(todoId);
  });

  it("should return status code 200 and delete newTodo", async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
    await TodoController.deleteTodo(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it("should handle errors for deleteTodo", async () => {
    const errorMessage = { message: "Error " };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await TodoController.updateTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
  it("should return 404 for the unidentified Id", async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(null);
    await TodoController.deleteTodo(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(404);
  });
});

describe("TodoController.updateTodo", () => {
  it("should have a getTodoById function", () => {
    expect(typeof TodoController.updateTodo).toBe("function");
  });

  it("should update with TodoModel.findByIdAndUpdate", async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    await TodoController.updateTodo(req, res, next);
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
      new: true,
      useFindAndModify: false,
    });
  });

  it("should return a json data and status code 200", async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
    await TodoController.updateTodo(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors for updateTodo", async () => {
    const errorMessage = { message: "Error updating" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await TodoController.updateTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });

  it("should return 404 for the unidentified Id", async () => {
    // req.params.todoId = todoId;
    // req.body = newTodo;
    TodoModel.findByIdAndUpdate.mockReturnValue(null);
    await TodoController.updateTodo(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(404);
    // expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});

describe("TodoController.getTodosById", () => {
  it("should have a getTodoById function", () => {
    expect(typeof TodoController.getTodosById).toBe("function");
  });
  it("should call Todomodel.findById with route parameters", async () => {
    req.params.todoId = todoId;
    await TodoController.getTodosById(req, res, next);
    expect(TodoModel.findById).toHaveBeenCalledWith(todoId);
  });
  it("it should return with 200 status particular id's data", async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodosById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it("should handle errors for getTodosById", async () => {
    const errorMessage = { message: "Error finding" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectedPromise);
    await TodoController.getTodosById(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
  it("should send 404 if the id does not exists", async () => {
    TodoModel.findById.mockReturnValue(null);
    await TodoController.getTodosById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TodoController.getTodos", () => {
  it("should have a getTodos function", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });
  it("should call Todomodel.find({})", async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });
  it("should return with status 200 and all todos", async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });
  it("should handle error in getTodos", async () => {
    const errorMessage = { message: "Error finding" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("should call create a model", () => {
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});