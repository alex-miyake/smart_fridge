/**
 * @file Single interaction smoke test. (Will create full CRUD endpoint testing later)
 */

const request = require('supertest');
const app = require('../../backend/server');
const setupTestDB = require('../setupTestDB');

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  // close sequelize connection
  const { sequelize } = require('../models');
  await sequelize.close();
});

describe('Fridge app smoke test', () => {
  test('GET /fridge returns 200 and an array', async () => {
    const res = await request(app).get('/fridge');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});