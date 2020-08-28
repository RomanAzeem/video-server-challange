const express = require('express');
const errorHandler = require('./middleware/error');

//Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.json());
app.use(errorHandler);
// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

///import routes from routes directory
const usersRoute = require('./routes/usersRoute');

//Mount Routes
app.use('/api/users', usersRoute);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server is runnig on port ${PORT}`)
);
