const meals = [ "Breakfast", "Snack", "Lunch", "Dinner" ]

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
    .then(function () {
      return Promise.all([
                knex('meals').insert({name: meals[0], created_at: new Date, updated_at: new Date}),
                knex('meals').insert({name: meals[1], created_at: new Date, updated_at: new Date}),
                knex('meals').insert({name: meals[2], created_at: new Date, updated_at: new Date}),
                knex('meals').insert({name: meals[3], created_at: new Date, updated_at: new Date})
              ])
    });
};