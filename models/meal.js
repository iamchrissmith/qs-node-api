const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database      = require('knex')(configuration);
const pry  = require('pryjs')

class Meal {
  static all() {
    return database.raw(
      'SELECT * FROM meals'
    )
    .then((data) => {
      return data.rows;
    });
  };
}

module.exports = Meal