const express = require('express');
const path    = require('path');
const router  = express.Router();

const food_controller = require('../controllers/foodController.js');

router.get('/', food_controller.food_list);

router.post('/', food_controller.food_create_post);

router.get('/:id', food_controller.food_detail);

router.put('/:id', food_controller.food_update_post);

router.delete('/:id', food_controller.food_delete);

module.exports = router;
