const Food = require('../models/Food');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

exports.foodList = (req, res) => {
  Food.all()
    .then( (foods) => {
      res.json(foods.rows);
    })
};

exports.foodDetail = (req, res) => {
  const { id } = req.params;
  Food.find(id)
    .then( (food) => {
      if (food.length < 1) { return res.sendStatus(404); }

      res.json(food[0]);
    });
};

exports.foodCreatePost = (req, res) => {
  const { food } = req.body;

  if (food.name == '' || food.calories == '') {
    return res.sendStatus(400);
  }

  Food.create(food)
    .then( data => {
      food.id = data.rows[0].id;
      res.status(201).json(food);
    });

};

exports.foodUpdatePost = (req, res) => {
  const { id } = req.params;
  const food = req.body.food;
  if(food.name == '' || food.calories == '') {
      res.sendStatus(400);
  }

  Food.update(food, id)
    .then( (data) => {
      if (!data) { return res.sendStatus(404); }

      res.json(data.rows[0]);
    });
};

exports.foodDelete = (req, res) => {
  const { id } = req.params;
  Food.delete(id)
    .then( () => {
      res.json({id})
    });
};
