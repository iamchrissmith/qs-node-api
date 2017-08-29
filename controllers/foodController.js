// const Food = require('../models/Food');

const foods = require('./data/foods');

exports.food_list = (req, res) => {
  res.json(foods);
};

exports.food_detail = (req, res) => {
  const { id } = req.params;
  const food = foods.find((food) => food.id == id);

  if (!food) { return res.sendStatus(404); }

  res.json(food);
};

exports.food_create_post = (req, res) => {
  const { food } = req.body;
  if(food.name == '') { return res.sendStatus(400); }
  if(food.calories == '') { return res.sendStatus(400); }

  food.id = foods.length + 1;

  res.status(201).json(food);
};

exports.food_update_post = (req, res) => {
  const { id } = req.params;
  const newFood = req.body.food;
  const food = foods.find((food) => food.id == id);

  if (!food) { return res.sendStatus(404); }

  if(food.name != '') { food.name = newFood.name; }
  if(food.calories != '') { food.calories = newFood.calories; }

  res.json(food);
};

exports.food_delete = (req, res) => {
  const { id } = req.params;
  const food = foods.find((food) => food.id == id);

  if (!food) { return res.sendStatus(404); }

  foods.splice(foods.indexOf(food), 1);

  res.json(req.params);
};
