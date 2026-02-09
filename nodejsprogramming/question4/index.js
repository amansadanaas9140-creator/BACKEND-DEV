import express from "express";
import {
  createTodo,
  getTodos,
  getTodoByBookId,
  updateTodo,
  deleteTodo
} from "./todo.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/books", createTodo);
app.get("/books", getTodos);
app.get("/books/:bookid", getTodoByBookId);
app.put("/books/:bookid", updateTodo);
app.delete("/books/:bookid", deleteTodo);

app.listen(PORT, () => {
  console.log(`Book API running at http://localhost:${PORT}`);
});