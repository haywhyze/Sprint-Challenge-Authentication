const request = require('supertest');
const server = require('../api/server');

describe('server', () => {
  it('[POST] /api/register WORKS!', () => request(server)
    .post('/api/register')
    .send({
      username: 'admin',
      password: '1234',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.token).toBeDefined();
    }));
  it('[POST] /api/login WORKS!', () => request(server)
    .post('/api/login')
    .send({
      username: 'admin',
      password: '1234',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.token).toBeDefined();
    }));
});
