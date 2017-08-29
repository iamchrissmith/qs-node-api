const assert = require('chai').assert;
const app = require('../../server');
const request = require('request');

describe('Foods Endpoints', () => {
  before( done => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if(err) { done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/api/v1'
    });
  });

  after( () => {
    this.server.close();
  });

  describe('GET /api/v1/foods/', () => {
    it('should return a 200', done => {
      this.request.get('/foods', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should return all foods', done => {
      this.request.get('/foods', (error, response) => {
        const data = JSON.parse(response.body);
        assert.isArray(data);
        assert.isObject(data[0]);
        done();
      });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return a 200', done => {
      this.request.get('/foods/1', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should return food by id', done => {
      this.request.get('/foods/1', (error, response) => {
        const data = JSON.parse(response.body);

        assert.isObject(data);
        assert.hasAllKeys(data, ["id", "name", "calories"]);
        done();
      });
    });

    it('should return 404 when food is not found', done => {
      this.request.get('/foods/0', (error, response) => {
        assert.equal(response.statusCode, 404);
        done();
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should return a 201', done => {
      const newFood = {food: {name:'MyNewTest', calories:10}};
      this.request.post('/foods', {form: newFood}, (error, response) => {
        assert.equal(response.statusCode, 201);
        done();
      });
    });

    it('should return a 400 if name is missing', done => {
      const newFood = {food: {name:'', calories:10}};
      this.request.post('/foods', {form: newFood}, (error, response) => {
        assert.equal(response.statusCode, 400);
        done();
      });
    });

    it('should return a 400 if calories is missing', done => {
      const newFood = {food: {name:'A', calories:''}};
      this.request.post('/foods', {form: newFood}, (error, response) => {
        assert.equal(response.statusCode, 400);
        done();
      });
    });

    it('should return data about the new food', done => {
      const newFood = {food: {name:'MyNewTest', calories:10}};
      this.request.post('/foods', {form: newFood}, (error, response) => {
        const data = JSON.parse(response.body);

        assert.isObject(data);
        assert.hasAllKeys(data, ["id", "name", "calories"]);
        assert.equal(data.name, newFood.food.name, "Names do not match");
        assert.equal(data.calories, newFood.food.calories, "Calories do not match");
        done();
      });
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {
    it('should return a 201', done => {
      const newFood = {food: {name:'MyNewTest', calories:10}};
      this.request.put('/foods/1', {form: newFood}, (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should return data about the updated food', done => {
      const newFood = {food: {name:'MyNewTest', calories:10}};
      this.request.put('/foods/1', {form: newFood}, (error, response) => {
        const data = JSON.parse(response.body);

        assert.isObject(data);
        assert.hasAllKeys(data, ["id", "name", "calories"]);
        assert.equal(data.name, newFood.food.name, "Names do not match");
        assert.equal(data.calories, newFood.food.calories, "Calories do not match");
        done();
      });
    });
  });
});
