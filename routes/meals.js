const express = require('express');
const path    = require('path');
const router  = express.Router();

const mealController = require('../controllers/mealController');

router.get('/', mealController.meals);

router.get('/:meal_id/foods', mealController.mealWithFoods);

router.post('/:meal_id/foods/:id', mealController.addFoodToMeal);

router.delete('/:meal_id/foods/:id', mealController.removeFoodFromMeal);

module.exports = router;
