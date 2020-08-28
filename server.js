const express = require('express');
const errorHandler = require('./middleware/error');
const dotenv = require('dotenv');
const colors = require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

//Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

///Load routes from routes directory
const usersRoute = require('./routes/usersRoute');

const app = express();

//Body Parser
app.use(express.json());

//app.use(errorHandler);

//Mount Routes
app.use('/api/users', usersRoute);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server is runnig on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
