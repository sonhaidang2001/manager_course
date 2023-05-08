const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./database')
const {engine} = require('express-handlebars');
const methodOverride = require('method-override');

const siteRoute = require('./routes/site.route')
const newRoute = require('./routes/new.route')
const courseRoute = require('./routes/course.route')

// connect db 
db.connect();

app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());
app.use(methodOverride('_method'));

// Use static folder
app.use('/',express.static(path.join(__dirname, 'public')));

// view engie 
app.engine('.hbs', engine(
  {
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
  },
  }
));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


app.use('/courses', courseRoute)
app.use('/news', newRoute)
app.use('/', siteRoute)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})