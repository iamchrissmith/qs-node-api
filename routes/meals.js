const express = require('express');
const path    = require('path');
const router  = express.Router();

const meal_controller = require('../controllers/mealController');

router.get('/', meal_controller.meals);

router.get('/:meal_id/foods', meal_controller.meal_with_foods);

router.post('/:meal_id/foods/:id', meal_controller.add_food_to_meal);

router.delete('/:meal_id/foods/:id', meal_controller.remove_food_from_meal);

module.exports = router;