const Book = require("../../database/entity/book")
const { books } = require("../../store")
const path = require('path')
const express = require('express')
const router = express.Router()
const fileMulter = require('../../middleware/filemulter')


// .post('/upload-img',
//     fileMulter.single('cover-img'),
//     (req, res) => {
//         if(req.file){
//             const {path} = req.file
//             res.json({path})
//         }
//         res.json()
//     })
router
.get('/:id/download', (req, res) => {
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.status(404)
        res.send('книга не найдена')
        return
    }

    const { fileBook } = books[idx]
    const file = path.join(process.env.APP_ROOT, 'public', 'books', fileBook)
    res.download(file)
    })

.get("/", (req, res) => {
    // const { books } = store;
    res.json(books);
  })

.get("/:id", (req, res) => {
    // const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx == -1) {
      res.status(404);
      res.json("404 | книга не найдена");
      return;
    };

   res.json(books[idx]);
  })

.post("/",  fileMulter.single('book'), (req, res) => {
    // const { books } = store;
    console.log(req.body);
    console.log('post');
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

    console.log(newbook);
    res.status(201);
    res.json(newbook);
    // res.json(true);
  })

.put("/:id", (req, res) => {
    // const { books } = store;
    console.log('put');
    console.log( req.body);
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
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
      };

      res.json(books[idx]);

  })

.delete("/:id", (req, res) => {
    // const { books } = store;
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