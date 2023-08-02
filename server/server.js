const express = require("express");
const app = express();
const PORT = 8000;
const todos = require("./todos");
const cors = require("cors");

app.use(cors());

app.get("/api", (req, res) => {
  res.json({ allTodos: todos });
});
app.listen(process.env.PORT || PORT, (req, res) => {
  console.log("The server has started on port 8000!");
});
