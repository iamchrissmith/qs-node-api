const express       = require('express');
const path          = require('path');

const app           = express();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database      = require('knex')(configuration);
// const pry           = require('pryjs')


app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

app.locals.title = 'Quantified Self';

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/public/home/index.html'));
})

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
