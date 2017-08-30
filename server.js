const express    = require('express');
const path       = require('path');
const cors       = require('cors')

const app        = express();

const bodyParser = require('body-parser');

const foodRoutes = require('./routes/foods');
const mealRoutes = require('./routes/meals')

// const environment   = process.env.NODE_ENV || 'development';
// const configuration = require('./knexfile')[environment];
// const database      = require('knex')(configuration);
// const pry           = require('pryjs')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

app.locals.title = 'Quantified Self';

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/public/home/index.html'));
});

app.use('/api/v1/foods', foodRoutes);
app.use('/api/v1/meals', mealRoutes);

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
