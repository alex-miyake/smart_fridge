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

const dotenv = require('dotenv');
dotenv.config();

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});

// Call createApp with the models - GOT CIRCULAR DEPENDENCY HERE!
const createApp = require('./app');
const sequelize = require('./config/db');
const { Fridge, User } = require('./models');

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
  
    // create app instance with models
    const app = createApp({ Fridge, User });

    // Start server
    if (require.main === module) {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);  
    });
  }
  } 
  catch (err) {
    console.error('Error during database sync or server startup:', err);
    process.exit(1);
  }
}

startServer();