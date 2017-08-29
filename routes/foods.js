const express = require('express');
const path    = require('path');
const router  = express.Router();

const foodController = require('../controllers/foodController.js');

router.get('/', foodController.foodList);

router.post('/', foodController.foodCreatePost);

router.get('/:id', foodController.foodDetail);

router.put('/:id', foodController.foodUpdatePost);

router.delete('/:id', foodController.foodDelete);

module.exports = router;
