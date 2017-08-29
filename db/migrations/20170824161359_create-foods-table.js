exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE foods(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE foods`;
  return knex.raw(dropQuery);
};