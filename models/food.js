const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database      = require('knex')(configuration);

class Food {
  static find(food_id) {
    return database.raw(
      'SELECT id, name, calories FROM foods' +
      ' WHERE foods.id = ?', food_id
    ).then(data => data.rows);
  }
}

module.exports = Food;