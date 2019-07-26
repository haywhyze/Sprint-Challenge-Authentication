const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
});

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
});
