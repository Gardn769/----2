const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')

const error404 = require('./middleware/error-404')
const booksRouter = require('./routes/api/books')
const usersRouter = require('./routes/api/users')

const PORT = process.env.PORT || 3000;

const app = express();
// app.use('/public', express.static(__dirname+'/public'))

app.use(bodyParser.json())
app.use('/api/books', booksRouter)
app.use('/api/users', usersRouter)
app.use(error404)

const publicPath = path.join('', 'storage')
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}


app.listen(PORT, console.log(`App listening on port ${PORT}`));