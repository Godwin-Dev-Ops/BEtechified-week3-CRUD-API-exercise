//Load environment variables from .env file
require("dotenv").config();

//Import express
const express = require("express");
//Create express app
const app = express();

//body parsing middleware
app.use(express.json());

//In-memory "database"
let todos = [
  { id: 1, task: "learn node.js", completed: true },
  { id: 2, task: "Build CRUD API", completed: true },
  { id: 3, task: "done group project", completed: false },
  { id: 4, task: "choose team leader", completed: false },
  { id: 5, task: "repeated learning", completed: false },
];

//GET all todos
app.get("/todos", (req, res) => {
  res.status(200).json(todos); //Send array as JSON
});

//GET active todos (completed === false)
app.get("/todos/active", (req, res) => {
  const activeTodos = todos.filter((t) => !t.completed);
  res.status(200).json(activeTodos);
});

//GET completed todos (completed === true)
app.get("/todos/completed", (req, res) => {
  const completedTodos = todos.filter((t) => t.completed);
  res.status(200).json(completedTodos);
});

//GET todo by ID
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.status(200).json(todo);
});

//POST Create new todo
app.post("/todos", (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body }; //Auto -ID
  todos.push(newTodo);
  res.status(201).json(newTodo); //Echo back the created todo
});

//PATCH UPDATE --Partial Update
app.patch("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); //Array,find
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  Object.assign(todo, req.body); //Merge e.g.. {completed:true}
  res.status(200).json(todo);
});

//DELETE Remove
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); //Array filter - non-destructive
  if (todos.lenght === initialLength)
    return res.status(404).json({ message: "Todo not found" });
  res.status(204).send(); //Silent success
});

//Global error handler
app.use((err, req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.status(500).json({ error: "Server error" });
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});
