// setupDB.js
// handles creation/update/deletion of test DB. (uses index/server files).

const sequelize = require('../backend/config/db');
const { ready, initModels } = require('../backend/models/index');

require('../backend/models/Fridge');

async function initTestDB({ force = true } = {}) {
  //sequelize.options.logging = console.log;
  const { models } = initModels(sequelize);
  await ready;
  if (force){
    await sequelize.sync({ force: true });
  }
  return { sequelize, models: sequelize.models };
}

async function resetDB() {
  if (process.env.NODE_ENV !== 'test') {  
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
};