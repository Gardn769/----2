const express = require('express');
const path = require('path');
const fs = require('fs');

const error404 = require('./middleware/error-404')
const indexRouter = require('./routes/index')
const booksRouter = require('./routes/api/books')
const usersRouter = require('./routes/api/users')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views",  path.join(process.env.APP_ROOT || 'src', 'views'))
app.use('/', indexRouter)

app.use('/api/books', booksRouter)
app.use('/api/users', usersRouter)

const publicPath = path.join('', 'storage')
app.use('/storage', express.static(publicPath) )

if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}

app.use(error404)


app.listen(PORT, console.log(`App listening on port ${PORT}`));