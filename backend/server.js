const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db');
const fridgeRoutes = require('./routes/fridgeRoutes');
const userRoutes = require('./routes/userRoutes');
const mealPostRoutes = require('./routes/mealPostRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// HTTP request logging to file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Logging HTTP requests to console (might remove)
// app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/fridge', fridgeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meals', mealPostRoutes);
app.use('/api/recipes', recipeRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('test route successful! bumba');
});

// Optional test API
app.post('/test', (req, res) => {
  res.json({
    message: 'POST received!',
    data: req.body
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// sync to postgreSQL
sequelize.sync({ alter: true })
  .then(() => console.log('PostgreSQL synced all models'))
  .catch(err => console.error('Sync failed:', err));