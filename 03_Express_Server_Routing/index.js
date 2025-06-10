const express = require("express");
const routes = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
const PORT = 3000;

let books = [];
let id = 1;

app.get("/books", (req, res) => {
  if (books.length) {
    res.json(books);
    return;
  }
  res.json({
    message: "no books found",
  });
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const book = {
    id: id++,
    title,
    author,
  };
  books.push(book);
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  books = books.filter((b) => req.params.id === b.id);
  res.json({
    message: "deleted",
  });
});

app.put("/books/:id", (req, res) => {
  const { title } = req.body;
  res.json({
    title: title,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
