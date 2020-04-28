const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(checkAuth);


// Add controllers
require('./controllers/auth.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/posts.js')(app);
require('./data/reddit-db');




// Start Server
app.listen(3000, () => {
    console.log('Reddit listening on port localhost:3000!');
});

module.exports = app;