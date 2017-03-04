const methodOverride = require('method-override');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const conn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'developer',
  database: 'dayplans_db'
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


//============================================
// routes
// ===========================================
app.get('/', (req, res) => {
  res.end();
})

// END ROUTES ================================
app.listen(PORT, () => console.log(`Server Started: Listening on Port ${PORT}`));
