const express = require('express');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
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
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

//Body Parser
app.use(express.json());

//set ejs view engine
app.set('view engine', 'ejs');

//// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//app.use(errorHandler);
app.use(errorHandler);

// Cookie parser
app.use(cookieParser());

//Mount Routes
app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server is runnig on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
