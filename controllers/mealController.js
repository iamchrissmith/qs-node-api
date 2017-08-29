const Meal = require('../models/meal')
const pry  = require('pryjs')

const meals = { 1:"Breakfast", 2:"Snack", 3:"Lunch", 4:"Dinner" }

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
  const mealID = request.params.meal_id;

  Meal.withFoods(mealID)
    .then((foods) => {
      const meal = {
        id: mealID,
        name: meals[mealID],
        foods: foods
      }
      response.json(meal);
    })
};

exports.add_food_to_meal = (request, response) => {

};

exports.remove_food_from_meal = (request, response) => {

};