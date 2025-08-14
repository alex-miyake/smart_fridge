// setupDB.js
// Utilities to initialise / reset / teardown the DB for tests.
// Works with the index/server files that import ./config/db and ./models/Fridge.

const sequelize = require('./config/db');

// ensure models are registered on the sequelize instance
// adjust the path if your Fridge model lives elsewhere
require('../backend/models/Fridge');

async function initTestDB({ force = true } = {}) {
  // For a smoke test we want a clean schema. Default `force: true`.
  // Returns the registered models so test code can inspect/use them if needed.
  await sequelize.sync({ force });
  return { sequelize, models: sequelize.models };
}

async function resetDB() {
  // Convenience to wipe & recreate schema during tests
  if (process.env.NODE_ENV !== 'test') {
    // safety: don't accidentally drop production/dev DB
    throw new Error('resetDB may only be used when NODE_ENV=test');
  }
  await sequelize.sync({ force: true });
  return { sequelize, models: sequelize.models };
}

async function closeDB() {
  // Close the connection (important for Jest to exit cleanly)
  await sequelize.close();
}

module.exports = {
  initTestDB,
  resetDB,
  closeDB,
  sequelize,
};