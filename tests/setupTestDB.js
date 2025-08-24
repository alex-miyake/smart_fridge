// setupDB.js
// handles creation/update/deletion of test DB. (uses index/server files).

const { sequelize, ready, User, Fridge } = require('../backend/models/index');
const fridgeController = require('../backend/controllers/fridgeController');

require('../backend/models/Fridge');

async function initTestDB({ force = true } = {}) {
  //sequelize.options.logging = console.log;
  await ready;
  const models = sequelize.models;
  if (force){
    await sequelize.sync({ force: true });
  }
  // Inject models into controllers for test DB
  await fridgeController.setModels(models);
  console.log('Is models.sequelize defined?', models.sequelize !== undefined);
  return { sequelize, models };
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


