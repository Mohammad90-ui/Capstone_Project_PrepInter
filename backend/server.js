const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler, notFound, validationErrorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS Configuration - Environment aware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Get allowed origins from environment variable or use default
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [
          'http://localhost:3000',
          'http://localhost:5173',
          'http://localhost:5174',
          'https://capstone-project-prepinter.vercel.app',
          'https://*.vercel.app'
        ];
    
    // In development, allow all origins for easier testing
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      // Support wildcard subdomains for Vercel
      if (allowedOrigin.includes('*')) {
        const pattern = allowedOrigin.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return origin === allowedOrigin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/interviews', require('./routes/interviewRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/interview', require('./routes/interviewSessionRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PrepInter API' });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Error handler middleware (must be last)
app.use(notFound);
app.use(validationErrorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  console.error(err.stack);
  // Close server & exit process
  // server.close(() => process.exit(1));
});