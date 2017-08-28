const express = require('express');
const path    = require('path');
const router  = express.Router();

const foods = require('./data/foods');

router.get('/', (req, res) => {
  res.json(foods);
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  const food = foods.find((food) => food.id == id);

  if (!food) { return res.sendStatus(404); }
  
  res.json(food);
})

module.exports = router;
