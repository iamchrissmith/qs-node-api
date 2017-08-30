const Meal = require('../models/meal');
const Food = require('../models/food');

let answer = { "message":"" };

exports.meals = (request, response) => {
  Meal.all()
    .then((data) => {
      Promise.all(
        data.map(meal => Meal.withFoods(meal.id))
      )
      .then((allFoods) => {
        const meals = Meal.addFoodsToMeals(data, allFoods);
        response.json(meals);
      });
    });
};

exports.mealWithFoods = (request, response) => {
  const mealID = request.params.meal_id;

  Promise.all([
    Meal.find(mealID),
    Meal.withFoods(mealID)
  ])
  .then((data) => {
    if (data[0].length === 0) {
      answer["message"] = `Can't find meal with id of ${mealID}`
      response.json(answer)
    } else {
      let meal = new Meal(data[0][0]);
      meal.foods = data[1];
      response.json(meal);
    }
  });
};

exports.addFoodToMeal = (request, response) => {
  const mealID = request.params.meal_id;
  const foodID = request.params.id;

  Promise.all([
    Meal.find(mealID),
    Food.find(foodID)
  ])
  .then((allData) => {
    const meal = allData[0];
    const food = allData[1];

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

exports.removeFoodFromMeal = (request, response) => {
  const mealID = request.params.meal_id;
  const foodID = request.params.id;

  Promise.all([
    Meal.find(mealID),
    Food.find(foodID)
  ])
  .then((data) => {
    const meal = data[0];
    const food = data[1];

    if (meal.length === 0 || food.length === 0) {
      answer["message"] = 'Cannot find request meal ' +
        'and/or food to remove food from specified meal'
    } else {
      answer["message"] = `Successfully removed ${food[0].name} from ${meal[0].name}`
      Meal.removeFood(mealID, foodID);
    }
    response.json(answer)
  })
};