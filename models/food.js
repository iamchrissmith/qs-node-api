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

  static all() {
    return database.raw('SELECT id, name, calories FROM foods ORDER BY id ASC')
  }

  static create(food) {
    const attrs = [food.name, food.calories, new Date, new Date];

    return database.raw(
      'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id',
      attrs
    )
  }

  static update(food, id) {
    const attrs = [food.name, food.calories, new Date, id];

    return database.raw(
      'UPDATE foods SET name = ?, calories = ?, updated_at = ? WHERE id = ? RETURNING id, name, calories',
      attrs
    )
  }

  static delete(id) {
    return database.raw('DELETE FROM foods WHERE id = ?', id);
  }
}

module.exports = Food;
