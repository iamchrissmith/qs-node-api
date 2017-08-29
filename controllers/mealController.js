const Meal = require('../models/meal')
const pry  = require('pryjs')

exports.meals = (request, response) => {
  Meal.all()
    .then((meals) => {
      eval(pry.it)
      response.json(meals);
    });
};

exports.meal_with_foods = (request, response) => {

};

exports.add_food_to_meal = (request, response) => {

};

exports.remove_food_from_meal = (request, response) => {

};