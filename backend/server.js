const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const winston = require("winston");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/router');
const employeesRoute = require("./routes/employeesRoute");

dotenv.config();

const app = express();

// CORS Configuration - Allow Image Loading
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: ['Content-Disposition']
}));

// Middleware to handle JSON body data
app.use(express.json({ limit: '10mb' }));

// Middleware to handle raw binary data for blobs
app.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));

// Helmet for security (disable strict CSP for images)
app.use(helmet({ contentSecurityPolicy: false }));

// Apply bodyParser middleware for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


// Define API routes
app.use('/api', apiRoutes);
app.use('/api', employeesRoute);

// Serve frontend files
const rootDir = path.resolve(__dirname, 'clients', 'dist');
app.use(express.static(rootDir));

// Serve static images & files from 'public/uploads'
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads'), {
  setHeaders: (res, filePath) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// Handle frontend routes
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api') && !req.url.startsWith('/uploads')) {
    res.sendFile(path.join(rootDir, 'index.html'));
  }
});

// Logger configuration
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({ message: err.message, stack: err.stack });
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server connected and runnig on ${PORT}`);
});
