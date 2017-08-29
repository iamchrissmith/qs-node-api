const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database      = require('knex')(configuration);
const pry  = require('pryjs')

class Meal {
  static all() {
    return database.raw(
      'SELECT id, name FROM meals'
    )
    .then((data) => {
      return data.rows;
    });
  };

  // static withFoods(mealID) {
  //   return database.raw(
  //     'SELECT id, name, calories FROM foods' +
  //     ' INNER JOIN meal_foods ON foods.id = meal_foods.food_id' +
  //     ' WHERE meal_foods.meal_id = ?', mealID
  //   ).then((data) => {
  //     return data.rows;
  //   });
  // }

  // static foodsForMeal(mealID) {
  //   return database.raw(
  //     'SELECT * FROM foods INNER JOIN meal_foods' +
  //     ' ON foods.id = meal_foods.food_id WHERE meal_foods.meal_id = ?',
  //     mealID
  //   ).then((data) => {
  //     return data.rows;
  //   });
  // }
}


module.exports = Meal