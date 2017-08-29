const Meal       = require('../models/meal')

const pry  = require('pryjs')

exports.meals = (request, response) => {
  Meal.all()
    .then((meals) => {
      // Promise.all([meals.forEach(meal => Meal.foodsForMeal(meal))])
      //   .then((foods) => {
      //     eval(pry.it)
      //   })

      response.json(meals);
    });
};

exports.meal_with_foods = (request, response) => {
  // const mealID = request.params.id;

  // Meal.withFoods(mealID)
  //   .then((foods) => {
  //     response.json(foods);
  //   })
};

exports.add_food_to_meal = (request, response) => {

};

exports.remove_food_from_meal = (request, response) => {

};