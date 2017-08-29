// const Food = require('../models/Food');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const foods = require('./data/foods');

exports.food_list = (req, res) => {
  database.raw('SELECT id, name, calories FROM foods ORDER BY id ASC')
  .then( (foods) => {
    res.json(foods.rows);
  })
};

exports.food_detail = (req, res) => {
  const { id } = req.params;
  database.raw('SELECT id, name, calories FROM foods WHERE id = ?', id)
    .then( (data) => {
      if (data.rowCount < 1) { return res.sendStatus(404); }

      res.json(data.rows[0]);
    });
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
