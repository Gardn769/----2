const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');

const error404 = require('./middleware/error-404')
const indexRouter = require('./routes/index')
const booksRouter = require('./routes/api/books')
const usersRouter = require('./routes/api/users')


const { PORT, URL_MONGO } = require('./config')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'keyboard cat'}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views",  path.join(process.env.APP_ROOT || 'src', 'views'));
app.use('/', indexRouter);

app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

const publicPath = path.join('', 'storage');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}
app.use('/storage', express.static(publicPath) );


app.use(error404)

async function start() {
  try {
    await mongoose.connect(URL_MONGO)
    app.listen(PORT, console.log(`App listening on port ${PORT}`));
  } catch (e) {
    console.error(e)
  }
}

start()