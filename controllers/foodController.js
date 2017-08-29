// const Food = require('../models/Food');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

exports.foodList = (req, res) => {
  database.raw('SELECT id, name, calories FROM foods ORDER BY id ASC')
  .then( (foods) => {
    res.json(foods.rows);
  })
};

exports.foodDetail = (req, res) => {
  const { id } = req.params;
  database.raw('SELECT id, name, calories FROM foods WHERE id = ?', id)
    .then( (data) => {
      if (data.rowCount < 1) { return res.sendStatus(404); }

      res.json(data.rows[0]);
    });
};

exports.foodCreatePost = (req, res) => {
  const { food } = req.body;
  if(food.name == '') { return res.sendStatus(400); }
  if(food.calories == '') { return res.sendStatus(400); }
  const nowDate = new Date;

  database.raw(
    'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id',
    [food.name, food.calories, nowDate, nowDate]
  )
  .then( id => {
    food.id = id;
    res.status(201).json(food);
  })

};

exports.foodUpdatePost = (req, res) => {
  const { id } = req.params;
  const newFood = req.body.food;
  if(newFood.name == '' || newFood.calories == '') {
      res.sendStatus(400);
  }
  database.raw(
    'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING id, name, calories',
    [newFood.name, newFood.calories, id]
  )
  .then( (data) => {
    if (!data) { return res.sendStatus(404); }

    res.json(data.rows[0]);
  });
};

exports.foodDelete = (req, res) => {
  const { id } = req.params;
  database.raw('DELETE FROM foods WHERE id = ?', id)
    .then( () => {
      res.json({id})
    });
};
