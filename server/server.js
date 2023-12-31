const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

// I thhink mongoDB does not support the callback style anymore

MongoClient.connect(
  "mongodb+srv://souravsusername:souravspassword@mycluster.zuo6jdo.mongodb.net/?retryWrites=true&w=majority"
)
  .then((client) => {
    console.log("Connected to the database!");
    const db = client.db("todo-list");
    const todosCollection = db.collection("todos-collection");

    app.set("view-engine", "ejs");
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));

    app.get("/", async (req, res) => {
      try {
        const todos = await todosCollection.find().toArray();
        res.render("index.ejs", { todos });
      } catch (err) {
        console.log(err);
      }
    });

    app.post("/addTodo", (req, res) => {
      const todoName = req.body["todo-item"];
      todosCollection.insertOne({
        todoName,
        isCompleted: false,
        isDeleted: false,
      });
      res.redirect("/");
    });

    app.put("/completeTodo", async (req, res) => {
      todosCollection
        .findOneAndUpdate(
          { todoName: req.body.todoName },
          {
            $set: {
              todoName: req.body.todoName,
              isCompleted: req.body.isCompleted,
              isDeleted: req.body.isDeleted,
            },
          }
        )
        .then((response) => {
          res.json("Success");
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.delete("/deleteTodo", (req, res) => {
      todosCollection
        .deleteOne({ todoName: req.body.todoName }, {})
        .then((response) => {
          res.json("Successfully deleted the todo item!");
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.listen(process.env.PORT || PORT, (req, res) => {
      console.log("The server has started on port 8000!");
    });
  })
  .catch((err) => {
    console.error(err);
  });
