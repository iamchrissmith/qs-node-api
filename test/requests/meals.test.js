const assert = require('chai').assert;
const app = require('../../server');
const request = require('request');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

describe('Meal Endpoints', () => {
  before( done => {
    this.port = 9876;
    this.server = app.listen(this.port, (error, results) => {
      if (error) { done(error); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/api/v1'
    });
  });

  after( () => { this.server.close();})

  const foodName = 'Turkey';
  const mealName = 'Lunch';

  beforeEach( done => {
    Promise.all([
      database('foods').insert(
        { name: foodName, calories: 188, created_at: new Date, updated_at: new Date }
      ),
      database('meals').insert(
        { name: mealName, created_at: new Date, updated_at: new Date }
      )
    ]).then( () => done() );
  })
  
  afterEach( done => {
    Promise.all([
      database.raw('TRUNCATE meals RESTART IDENTITY'),
      database.raw('TRUNCATE foods RESTART IDENTITY'),
      database.raw('TRUNCATE meal_foods RESTART IDENTITY')
    ]).then(() => done())
  })

  context('Successful Requests', () => {
    it('adds food to a meal', done => {
      this.request.post('meals/1/foods/1', (error, response) => {
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, `{"message":"Successfully added ${foodName} to ${mealName}"}`);
        done();
      });
    });
    
    it('removes food from a meal', done => {
      database('meal_foods').insert(
        { meal_id: 1, food_id: 1, created_at: new Date, updated_at: new Date }
      ).then( () => {
        this.request.delete('meals/1/foods/1', (error, response) => {
          assert.equal(response.statusCode, 200);
          assert.equal(response.body, `{"message":"Successfully removed ${foodName} from ${mealName}"}`)
          done();
        });
      });
    });
    
    it('returns a meal with its foods', done => {
      const expected = '{"id":"1","name":"Breakfast","foods":[{"id":"1","name":"Turkey","calories":188}]}'
      database('meal_foods').insert(
        { meal_id: 1, food_id: 1, created_at: new Date, updated_at: new Date }
      ).then( () => {
        this.request.get('meals/1/foods', (error, response) => {
          assert.equal(response.statusCode, 200);
          assert.equal(response.body, expected);
          done();
        });
      });
    });
  });

  context('Unsuccessful Requests', () => {
    it('Unsucessful message when deleting food from meal', done => {
      const expected = '{"message":"Cannot find request meal ' +
      'and/or food to remove food from specified meal"}'

      this.request.delete('meals/2/foods/4', (error, response) => {
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, expected);
        done();
      });
    });

    it('Unsuccessful message when adding food to meal', done => {
      const expected = '{"message":"Cannot find request meal ' +
      'and/or food to add food to specified meal"}'

      this.request.post('meals/1/foods/5', (error, response) => {
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, expected);
        done();
      });
    });

    it('returns empty foods', done => {
      const expected = '{"id":"5","foods":[]}'

      this.request.get('meals/5/foods', (error, response) => {
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, expected);
        done();
      });
    });
  });
});