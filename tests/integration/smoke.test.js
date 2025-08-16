/**
 * @file Single interaction smoke test. (Will create full CRUD endpoint testing later)
 */

const request = require('supertest');
const { app, sequelize, models } = require('../setupTestApp');
const { initTestDB, resetDB, closeDB} = require('../setupTestDB');
const seed = require('../../scripts/seed');

beforeAll(async () => {
  // populate the in-memory DB (syncs initTestDB within seed function)
  await seed({ closeConnection: false }); 
});

afterAll(async () => {
  await closeDB();
});

describe('Fridge app smoke test', () => {
  test('GET /fridge returns 200 and an array', async () => {
    let res;
    try {
    res = await request(app).get('/api/fridge');
    console.log('HTTP Response:', res.status, res.body);
    } catch (err) {
      console.error('Error while introspecting DB before request:', err && err.stack ? err.stack : err);
    }

    expect(res).toBeDefined();

    // handling error messages
    if (res.status === 500) {
      if (res.body && res.body.stack) {
        console.error('Error stack returned by server:\n', res.body.stack);
      } else {
        console.error('No stack returned by server (inspect res.text).');
      }
    }

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});