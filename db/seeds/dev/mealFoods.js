exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex('meal_foods').insert({food_id: 1, meal_id: 1, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 2, meal_id: 1, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 3, meal_id: 1, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 4, meal_id: 2, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 5, meal_id: 2, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 6, meal_id: 2, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 7, meal_id: 3, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 8, meal_id: 3, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 9, meal_id: 3, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 10, meal_id: 4, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 11, meal_id: 4, created_at: new Date, updated_at: new Date}),
        knex('meal_foods').insert({food_id: 12, meal_id: 4, created_at: new Date, updated_at: new Date})
      ])
    });
};
