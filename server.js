require('dotenv').config();
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser()); // Add this after you initialize express.



// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware

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
app.use(checkAuth);

// Add after body parser initialization!
app.use(expressValidator());

// Set db
require('./data/reddit-db');
require('./controllers/comments.js')(app);
require('./controllers/posts.js')(app);
require('./controllers/auth.js')(app);


app.listen(3000, () => {
  console.log('Reddit listening on port localhost:3000!');
});



//Routes

module.exports = app;