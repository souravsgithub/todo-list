const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(process.env.PORT || PORT, (req, res) => {
  console.log("The server has started on port 8000!");
});
