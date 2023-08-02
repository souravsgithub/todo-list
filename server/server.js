const express = require("express");
const app = express();
const PORT = 8000;
const todos = require("./todos");

app.get("/", (req, res) => {
  res.json(todos);
});
app.listen(process.env.PORT || PORT, (req, res) => {
  console.log("The server has started on port 8000!");
});
