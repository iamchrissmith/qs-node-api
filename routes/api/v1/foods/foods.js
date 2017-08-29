const express = require('express');
const path    = require('path');
const router  = express.Router();

const foods = require('./data/foods');

router.get('/', (req, res) => {
  res.json(foods);
});

router.post('/', (req, res) => {
  const { food } = req.body;
  if(food.name == '') { return res.sendStatus(400); }
  if(food.calories == '') { return res.sendStatus(400); }

  food.id = foods.length + 1;

  res.status(201).json(food);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const food = foods.find((food) => food.id == id);

  if (!food) { return res.sendStatus(404); }

  res.json(food);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const newFood = req.body.food;
  const food = foods.find((food) => food.id == id);

  if (!food) { return res.sendStatus(404); }

  if(food.name != '') { food.name = newFood.name; }
  if(food.calories != '') { food.calories = newFood.calories; }

  res.json(food);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const food = foods.find((food) => food.id == id);

  if (!food) { return res.sendStatus(404); }

  foods.splice(foods.indexOf(food), 1);

  res.json(req.params);
})


module.exports = router;
