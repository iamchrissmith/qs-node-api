exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE meal_foods(
    id BIGSERIAL NOT NULL,
    meal_id BIGINT NOT NULL,
    food_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meal_foods`;
  return knex.raw(dropQuery);
};
