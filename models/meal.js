const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database      = require('knex')(configuration);

class Meal {

  constructor(attrs) {
    this.id    = attrs.id;
    this.name  = attrs.name;
    this.foods = [];
  }

  static all() {
    return database.raw(
      'SELECT id, name FROM meals'
    )
    .then(data => data.rows);
  };

  static find(meal_id) {
    return database.raw(
      'SELECT id, name FROM meals' +
      ' WHERE meals.id = ?', meal_id
    ).then(data => data.rows);
  }

  static withFoods(mealID) {
    return database.raw(
      'SELECT id, name, calories FROM foods' +
      ' INNER JOIN meal_foods ON foods.id = meal_foods.food_id' +
      ' WHERE meal_foods.meal_id = ?', mealID
    ).then(data => data.rows);
  }

  static addFood(mealID, foodID) {
    return database.raw(
      'INSERT INTO meal_foods (meal_id, food_id, created_at, updated_at)' +
      ' VALUES (?, ?, ?, ?)', [mealID, foodID, new Date, new Date]
    ).then(data => data);
  }

  static removeFood(mealID, foodID) {
    return database.raw(
      'DELETE FROM meal_foods WHERE meal_foods.meal_id = ? ' +
      'AND meal_foods.food_id = ?', [mealID, foodID]
    ).then(data => data);
  }

  static addFoodsToMeals(meals, foods) {
    let index = 0;
    return meals.map(meal => {
      let mealObj = new Meal(meal);
      mealObj.foods = foods[index];
      index++;
      return mealObj;
    });
  };
}

module.exports = Meal;