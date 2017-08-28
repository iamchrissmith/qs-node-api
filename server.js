const express       = require('express');
const app           = express();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database      = require('knex')(configuration);
// const pry           = require('pryjs')

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self';

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}