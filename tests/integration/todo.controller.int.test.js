const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

let firstTodo, newTodoId;
describe(endpointUrl, () => {
  it("GET" + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  it("GET by Id" + endpointUrl + "/:todoId", async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  it("GET todoId is doesn't exist" + endpointUrl + "/:todoId", async () => {
    const response = await request(app).get(
      endpointUrl + "6206653f609ad9bbb99b99fc"
    );
    expect(response.statusCode).toBe(404);
  });

  it("POST" + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });

  it(
    "should return 500 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "missing done property" });

      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required.",
      });
    }
  );

  it("PUT" + endpointUrl + "/:todoId", async () => {
    const testData = { title: "make integration test for PUT", done: true };
    const response = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  });
  it("PUT todoId is doesn't exist" + endpointUrl + "/:todoId", async () => {
    const response = await request(app).get(
      endpointUrl + "6206653f609ad9bbb99b99fc"
    );
    expect(response.statusCode).toBe(404);
  });
});
