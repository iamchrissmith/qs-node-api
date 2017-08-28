const assert = require('chai').assert;
const app = require('../../../server');
const request = require('request');

describe('GET /api/v1/foods/', () => {
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
    this.request.get('/foods', (error, response) => {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('should return all foods', done => {
    this.request.get('/foods', (error, response) => {
      const data = JSON.parse(response.body);
      assert.instanceOf(data, Array);
      assert.instanceOf(data[0], Object);
      done();
    });
  });
});
