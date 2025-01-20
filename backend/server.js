const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); 
const cors = require('cors');
const authRoutes = require('./routes/router'); // Import auth routes

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Use CLIENT_URL from .env if available
  credentials: true,
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const rootDir = path.resolve(__dirname, 'clients', 'dist');
  app.use(express.static(rootDir));

  // Serve index.html for unknown routes (non-API)
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      res.sendFile(path.join(rootDir, 'index.html'));
    }
  });
}

// Define routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
