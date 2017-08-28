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
})


module.exports = router;
