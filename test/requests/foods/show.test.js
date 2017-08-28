const assert = require('chai').assert;
const app = require('../../../server');
const request = require('request');

describe('GET /api/v1/foods/:id', () => {
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
});
