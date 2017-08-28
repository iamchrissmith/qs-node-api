const foods = [
  ["Banana", 150],
  ["Bagel Bites - Four Cheese", 650],
  ["Chicken Burrito", 800],
  ["Grapes", 180],
  ["Blueberry Muffins", 450],
  ["Yogurt", 550],
  ["Macaroni and Cheese", 950],
  ["Granola Bar", 200],
  ["Gum", 50],
  ["Cheese", 400],
  ["Fruit Snacks", 120],
  ["Apple", 220]
]

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(() => {
      return Promise.all([
      knex('foods').insert({name: foods[0][0], calories: foods[0][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[1][0], calories: foods[1][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[2][0], calories: foods[2][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[3][0], calories: foods[3][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[4][0], calories: foods[4][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[5][0], calories: foods[5][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[6][0], calories: foods[6][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[7][0], calories: foods[7][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[8][0], calories: foods[8][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[9][0], calories: foods[9][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[10][0], calories: foods[10][1], created_at: new Date, updated_at: new Date}),
      knex('foods').insert({name: foods[11][0], calories: foods[11][1], created_at: new Date, updated_at: new Date})
    ])
  });
};