const Book = require("../database/entity/book")
const { books } = require("../store")
const path = require('path')
const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/filemulter')
router
.get('/', (req, res) => {
    res.render('index', {
      title: 'Главная',
    });
})

.get('/books', async(req, res) => {
  try {
    const books = await Book.find().select('-__v')
    res.render('books/index', {
      title: 'index',
      books
    })
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.get('/books/create', (req, res) => {
    res.render('books/create', {
      title: 'create',
      book: {},
    });
  })

.post('/books/create', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), async (req, res) => {
    const {
      title,
      description,
      authors,
      favorite,
    } = req.body
    const fileCover = req.files.cover ? req.files.cover[0].filename : null
    const fileName = req.files.book ? req.files.book[0].originalname : null
    const fileBook = req.files.book ? req.files.book[0].filename : null

    const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    )
    try {
      await newBook.save()
      res.redirect('/')
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
  })

.get('/books/update/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    res.render('books/create', {
      title: 'update',
      book: books[idx],
    });
  })

.post('/books/update/:id', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), async (req, res) => {
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
      res.status(404)
      res.send('книга не найдена')
      return
    }

    const {
      title,
      description,
      authors,
      favorite,
    } = req.body

    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
    }

    books[idx].fileCover = req.files.cover ? req.files.cover[0].filename : books[idx].fileCover
    books[idx].fileName = req.files.cover ? req.files.cover[0].originalname : books[idx].fileName
    books[idx].fileBook = req.files.cover ? req.files.cover[0].filename : books[idx].fileBook

    try {
      await Book.findByIdAndUpdate(id, data)
      res.redirect('/')
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
  })

.get('/books/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const book = await Book.findById(id).select('-__v')
      res.render('books/view', {
        title: 'view',
        book,
      })
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
})

.post('/books/delete/:id', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), async (req, res) => {
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
      res.status(404)
      res.send('книга не найдена')
      return
    }

    books.splice(idx, 1);
    res.redirect('/books');
  })

module.exports = router;