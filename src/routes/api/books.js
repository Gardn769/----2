const Book = require("../../database/entity/book")
const { books } = require("../../store")
const path = require('path')
const express = require('express')
const router = express.Router()
const fileMulter = require('../../middleware/filemulter')


router
.get("/", (req, res) => {
    res.json(books);
})

.get("/:id", (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx == -1) {
      res.status(404);
      res.redirect('/');
      return;
    };

   res.json(books[idx]);
})

.get('/:id/download', (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.status(404);
        res.send('книга не найдена');
        return
    }

    const { fileBook } = books[idx];
    const file = path.join('storage', fileBook);
    res.download(file);
})

.post("/",  fileMulter.single('fileBook'), (req, res) => {
    const { title, description, authors, favorite, fileCover, } = req.body;

    const newbook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName = req.file.originalname,
      fileBook = req.file.filename,
    );
    books.push(newbook);

    res.status(201);
    res.json(newbook);
})

.put("/:id",  fileMulter.single('fileBook'), (req, res) => {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const idx = books.findIndex((el) => el.id === id);

    if (idx == -1) {
      res.status(404);
      res.json("404 | книга не найдена");
      return
    };

      books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
      };

      res.json(books[idx]);

  })

.delete("/:id", (req, res) => {
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

module.exports = router