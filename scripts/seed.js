// seedDB.js
// Simple script to populate the test-time in-memory SQLite DB with fridge items.

const { initTestDB, closeDB } = require('../tests/setupTestDB');
const { sequelize, User, Fridge } = require('../backend/models/index');

const seedTestUser = {username: 'Test_User', email: 'testemail@gmail.com', password: 'test_password'};

const seedData = [
  { name: 'Milk', quantity: 1.5, unit: 'liters', expiryDate: '2025-08-15', UserId: 1 },
  { name: 'Eggs', quantity: 12, unit: 'pieces', expiryDate: '2025-09-01', UserId: 1 },
  { name: 'Bread', quantity: 1, unit: 'loaf', expiryDate: '2025-08-10', UserId: 1 },
  { name: 'Cheddar Cheese', quantity: 0.5, unit: 'kg', expiryDate: '2025-10-20', UserId: 1 },
  { name: 'Yogurt', quantity: 4, unit: 'cups', expiryDate: '2025-08-25', UserId: 1 },
  { name: 'Chicken Breast', quantity: 3, unit: 'pieces', expiryDate: '2025-08-12', UserId: 1 },
  { name: 'Broccoli', quantity: 1, unit: 'head', expiryDate: '2025-08-14', UserId: 1 },
  { name: 'Tomatoes', quantity: 500, unit: 'g', expiryDate: '2025-08-18', UserId: 1 },
  { name: 'Potatoes', quantity: 2, unit: 'kg', expiryDate: '2025-09-05', UserId: 1 },
  { name: 'Onions', quantity: 3, unit: 'pieces', expiryDate: '2025-10-01', UserId: 1 },
];

async function seed({ closeConnection = true } = {}) {
  try {
    await initTestDB({ force: true });
    await User.create(seedTestUser);
    await Fridge.bulkCreate(seedData);
    console.log('Seed data inserted successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    if (closeConnection) {
      await closeDB();
    }
  }
}

// If run directly, seed immediately
if (require.main === module) {
  seed();
}

module.exports = seed;