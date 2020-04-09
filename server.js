const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');


app.listen(3000, () => {
  console.log('Reddit listening on port localhost:3000!');
});



//Routes


app.get('/posts/new', (req, res) => {
  res.render('posts-new')

})

