const db = require('../database/dbConfig');

const users = require('./usersModel');

beforeEach(async () => {
  await db('users').truncate();
});

describe('users model', () => {
  describe('add()', () => {
    it('should add the provided users into the db', async () => {
      await users.add({ username: 'gaffer', password: '1234' });
      await users.add({ username: 'yusuf', password: '1234' });
      const usersDb = await db('users');
      expect(usersDb).toHaveLength(2);
    });
  });
  describe('find()', () => {
    it('should get all users from the db', async () => {
      await users.add({ username: 'gaffer', password: '1234' });
      const usersFromDb = await users.find();
      expect(usersFromDb).toHaveLength(1);
      expect(usersFromDb[0].id).toEqual(1);
    });
  });
  describe('findById()', () => {
    it('should get a user from the db using the provided id', async () => {
      await users.add({ username: 'gaffer', password: '1234' });
      const userFromDb = await users.findById(1);
      expect(userFromDb.id).toEqual(1);
    });
  });
  describe('findBy()', () => {
    it('should get a user from the db using the provided property', async () => {
      await users.add({ username: 'gaffer', password: '1234' });
      const userFromDb = await users.findBy({ username: 'gaffer' });
      expect(userFromDb.id).toEqual(1);
    });
  });
});
