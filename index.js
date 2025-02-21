const express = require("express");
const app = express();
const port = 3000;

// Масив за съхранение на "книгите"
let books = [
  { id: 1, title: "Под Игото", author: "Иван Вазов" },
  { id: 2, title: "Бай Ганьо", author: "Алеко Константинов" }
];

app.use(express.json());

// 1. GET /books -> връща списъка с книги
app.get("/books", (req, res) => {
  res.json(books);
});

// 2. GET /books/:id -> връща конкретна книга по ID
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Книгата не е намерена" });
  }

  res.json(book);
});

// 3. POST /books -> добавя нова книга
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Заглавието и авторът са задължителни" });
  }

  const newBook = {
    id: books.length + 1, // Прост начин за задаване на ID
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// 4. PUT /books/:id -> обновява информация за книга
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Книгата не е намерена" });
  }

  books[bookIndex] = { ...books[bookIndex], title, author };
  res.json(books[bookIndex]);
});

// 5. DELETE /books/:id -> изтрива книга
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Книгата не е намерена" });
  }

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook[0]);
});

// Старт на сървъра
app.listen(port, () => {
  console.log(`Сървърът слуша на http://localhost:${port}`);
});
