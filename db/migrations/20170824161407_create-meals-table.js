exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE meals(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meals`;
  return knex.raw(dropQuery);
};
