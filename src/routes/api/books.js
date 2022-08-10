const Book = require("../../database/entity/book")
const { books } = require("../../store")
const path = require('path')
const express = require('express')
const router = express.Router()
const fileMulter = require('../../middleware/filemulter')


router
.get("/", async (req, res) => {
  try {
    const books = await Book.find().select('-__v')
    res.json(books)
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findById(id).select('-__v')
      res.json(book)
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
})

.get('/:id/download', async (req, res) => {
    const { id } = req.params;
    try {
      const fileBook = await Book.findById(id).select('fileBook')
      const file = path.join(process.env.APP_ROOT, 'public', 'books', fileBook)
      res.download(file)
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
})

.post('/', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), async function (req, res) {
  const {
    title,
    description,
    authors,
  } = req.body
  const fileCover = req.files.cover ? req.files.cover[0].filename : null
  const fileName = req.files.book ? req.files.book[0].originalname : null
  const fileBook = req.files.book ? req.files.book[0].filename : null

  const newBook = new Book({
    title,
    description,
    authors,
    fileCover,
    fileName,
    fileBook,
  })

  try {
    await newBook.save()
    res.json(newBook)
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.put("/:id",  fileMulter.single('fileBook'), async (req, res) => {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const idx = books.findIndex((el) => el.id === id);
    data = {
      title,
      description,
      authors,
      favorite,
    }
    if (req.files.cover) {
      data.fileCover = req.files.cover[0].filename
    }
    if (req.files.book) {
      data.fileName = req.files.book[0].originalname
      data.fileBook = req.files.book[0].filename
    }
  
    try {
      await Book.findByIdAndUpdate(id, data)
      res.redirect(`/api/books/${id}`)
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
  })

.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Book.deleteOne({_id: id})
      res.json(true)
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }

  });

module.exports = router