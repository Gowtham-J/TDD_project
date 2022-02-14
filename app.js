const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.routes");
const util = require("util");
const encoder = new util.TextEncoder("utf-8");
const mangodb = require("./mongodb/mongodb.connect");

mangodb.connect();

app.use(express.json());

app.use("/todos", todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get("/", (req, res) => {
  res.json("Hello world!");
});

module.exports = app;
