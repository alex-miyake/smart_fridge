/**
 * @file server.js
 * @description Main application file. Sets up middleware, routes, logging, and starts the server.
 */
/**
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const mealPostRoutes = require('./routes/mealPostRoutes');
const recipeRoutes = require('./routes/recipeRoutes');*/

// HTTP request logging to file
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
//app.use(morgan('combined', { stream: accessLogStream }));
//app.use(morgan('dev'));
//app.use('/api/auth', authRoutes);
//app.use('/api/meals', mealPostRoutes);
//app.use('/api/recipes', recipeRoutes);

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});

const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = require('../app');

const PORT = process.env.PORT;
const HOST = '0.0.0.0';

async function startServer() {
  try {
    // Check database connection
    await sequelize.authenticate()
    .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  
    // Sync models - sync also defined in index file (not using it here tho)
    await sequelize.sync({ force: false });
    console.log('Database synchronized. Tables created or updated.');
  
    // Start server
    if (require.main === module) {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);  
    });
  }
  } 
  catch (err) {
    console.error('Error during database sync or server startup:', err);
  }
}

startServer();