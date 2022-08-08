const express = require('express');
const path = require('path');
const fs = require('fs');

const error404 = require('./middleware/error-404')
const booksRouter = require('./routes/api/books')
const usersRouter = require('./routes/api/users')

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api/books', booksRouter)
app.use('/api/users', usersRouter)
app.use(error404)

const publicPath = path.join('', 'storage')
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}


app.listen(PORT, console.log(`App listening on port ${PORT}`));