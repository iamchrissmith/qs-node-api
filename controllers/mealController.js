const Meal = require('../models/meal')
const Food = require('../models/food')
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
  const mealID = request.params.meal_id;
  const foodID = request.params.id;

  Promise.all([
    Meal.find(mealID),
    Food.find(foodID)
  ])
  .then((allData) => {
    const meal = allData[0];
    const food = allData[1];
    let answer = { "message": "" };

    if (meal.length === 0 || food.length === 0) {
      answer["message"] = 'Cannot find request meal ' +
        'and/or food to add food to specified meal'
    } else {
      answer["message"] = `Successfully added ${food[0].name} to ${meal[0].name}`
      Meal.addFood(mealID, foodID);
    }
    response.json(answer)
  })
};

exports.remove_food_from_meal = (request, response) => {
  const mealID = request.params.meal_id;
  const foodID = request.params.id;
  let answer = { "message": "" };

  Promise.all([
    Meal.find(mealID),
    Food.find(foodID)
  ])
  .then((allData) => {
    const meal = allData[0];
    const food = allData[1];

    if (meal.length === 0 || food.length === 0) {
      answer["message"] = 'Cannot find request meal ' +
        'and/or food to remove food to specified meal'
    } else {
      answer["message"] = `Successfully removed ${food[0].name} to ${meal[0].name}`
      Meal.removeFood(mealID, foodID);
    }
    response.json(answer)
  })
};