const request = require('supertest');
const app = require('../../app');

const buildLogin = function(user){
	return request(app)
      .post('/login')
      .send({username: user.username, password: user.password})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
}

module.exports = {
	login: buildLogin
}