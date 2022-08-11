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

.post('/books/create', fileMulter.fields([{name: 'fileBook'}, {name: 'fileCover'}]), async (req, res) => {
    const {
      title,
      description,
      authors,
      favorite,
    } = req.body
    const fileCover = req.files.fileCover ? req.files.fileCover[0].filename : null
    const fileName = req.files.fileBook ? req.files.fileBook[0].originalname : null
    const fileBook = req.files.fileBook ? req.files.fileBook[0].filename : null
    console.log(req.body);
    console.log(fileCover);
    console.log(fileBook);

    const newBook = new Book({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
})
    try {
      await newBook.save()
      res.redirect('/books')
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
  })

.get('/books/update/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const book = await Book.findById(id).select('-__v')
      res.render('books/create', {
        title: 'update',
        book: book,
      })
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }

  })

.post('/books/update/:id', fileMulter.fields([{name: 'fileBook'}, {name: 'fileCover'}]), async (req, res) => {
    const { id } = req.params
    const {
      title,
      description,
      authors,
      favorite,
    } = req.body
  
    data = {
      title,
      description,
      authors,
      favorite,
    }
    if (req.files.fileCover) {
      data.fileCover = req.files.fileCover[0].filename
    }
    if (req.files.fileBook) {
      data.fileName = req.files.fileBook[0].originalname
      data.fileBook = req.files.fileBook[0].filename
    }
    console.log(req.body);
    console.log(data);

    try {
      await Book.findByIdAndUpdate(id, data)
      res.redirect('/books')
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

.post('/books/delete/:id',  async (req, res) => {;
    const { id } = req.params
    try {
      await Book.deleteOne({_id: id})
      res.redirect('/books');

    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }

  })

module.exports = router;