const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

class Book {
  constructor(
    id = uuid(),
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = ""
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

const store = {
  books: [new Book(), new Book()],
};

app.post('/api/user/login', function (req, res) {
  res.status(201);
  res.send({ id: 1, mail: "test@mail.ru" })
})

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

app.get("/api/books", (req, res) => {
  const { books } = store;
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx == -1) {
    res.status(404);
    res.json("404 | книга не найдена");
    return;
  }

 res.json(books[idx]);
});

app.post("/api/books/", (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const newbook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  books.push(newbook);

  res.status(201);
  res.json(newbook);
});

app.put("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const idx = books.findIndex((el) => el.id === id);

  if (idx == -1) {
    res.status(404);
    res.json("404 | книга не найдена");
    return
  }

    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    };

    res.json(books[idx]);

});

app.delete("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx == -1) {
    res.status(404);
    res.json("404 | книга не найдена");
    return
  }

  books.splice(idx, 1);
  res.json("ok");

});


app.listen(PORT, console.log(`App listening on port ${PORT}`));
