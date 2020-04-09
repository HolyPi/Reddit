const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('Reddit listening on port localhost:3000!');
});



//Routes

app.get('/', (req, res) => {
  res.render('test')
})